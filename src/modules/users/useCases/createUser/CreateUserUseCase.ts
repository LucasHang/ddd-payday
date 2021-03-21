import UseCase from '@core/domain/UseCase';
import { InvalidParam } from '@core/logic/GenericErrors';
import { Result, combine, right, left } from '@core/logic/Result';
import CreateAccountUseCase from '@modules/accounts/useCases/createAccount/CreateAccountUseCase';
import { User, UserAge, UserEmail, UserPassword } from '@modules/users/domain';
import UserDTO from '@modules/users/dtos/userDTO';
import { UserMap } from '@modules/users/mappers/userMap';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import CreateUserDTO from './CreateUserDTO';

type Response = Result<InvalidParam, UserDTO>;

export default class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<Response>> {
    constructor(private userRepository: IUserRepository, private createAccountUseCase: CreateAccountUseCase) {}

    public async execute(dto: CreateUserDTO): Promise<Response> {
        const passwordOrError = await UserPassword.create(dto.password);
        const emailOrError = UserEmail.create(dto.email);
        const ageOrError = UserAge.create(dto.age);

        const dtoResult = combine([emailOrError, passwordOrError, ageOrError]);

        if (dtoResult.isLeft()) return left(dtoResult.value);

        const password = passwordOrError.value as UserPassword;
        const email = emailOrError.value as UserEmail;
        const age = ageOrError.value as UserAge;

        const userOrError = User.create({
            ...dto,
            password,
            email,
            age,
        });

        if (userOrError.isLeft()) return left(userOrError.value);

        const createdUser = await this.userRepository.insert(userOrError.value);

        const accountOrError = await this.createAccountUseCase.execute({
            userId: createdUser.id.toString(),
            balance: 0,
        });

        if (accountOrError.isLeft()) return left(accountOrError.value);

        return right(UserMap.toDTO(userOrError.value));
    }
}
