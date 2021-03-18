import UseCase from '@core/domain/UseCase';
import { InvalidParam } from '@core/logic/GenericErrors';
import { Result, right, left } from '@core/logic/Result';
import Account from '@modules/accounts/domain/account';
import AccountBalance from '@modules/accounts/domain/accountBalance';
import AccountDTO from '@modules/accounts/dtos/accountDTO';
import { AccountMap } from '@modules/accounts/mappers/accountMap';
import IAccountRepository from '@modules/accounts/repositories/IAccountRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import CreateAccountDTO from './CreateAccountDTO';

type Response = Result<InvalidParam, AccountDTO>;

export default class CreateAccountUseCase implements UseCase<CreateAccountDTO, Promise<Response>> {
    constructor(private accountRepository: IAccountRepository, private userRepository: IUserRepository) {}

    public async execute(dto: CreateAccountDTO): Promise<Response> {
        const balanceOrError = AccountBalance.create(dto.balance);

        if (balanceOrError.isLeft()) return left(balanceOrError.value);

        const balance = balanceOrError.value;

        const userOrError = await this.userRepository.findByIdOrError(dto.userId);

        if (userOrError.isLeft()) return left(userOrError.value);

        const accountOrError = Account.create({
            userId: userOrError.value.id,
            balance,
        });

        if (accountOrError.isLeft()) return left(accountOrError.value);

        await this.accountRepository.insert(accountOrError.value);

        return right(AccountMap.toDTO(accountOrError.value));
    }
}
