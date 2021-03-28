import { StatusCodes } from 'http-status-codes';
import { InvalidParam } from '@core/logic/GenericErrors';
import FakeUserRepository from '@modules/users/repositories/implementations/fake/fakeUserRepository';
import FakeAccountRepository from '@modules/accounts/repositories/implementations/fake/fakeAccountRepository';
import faker from 'faker';
import { User, UserAge, UserEmail, UserPassword } from '@modules/users/domain';
import CreateAccountUseCase from './CreateAccountUseCase';
import CreateAccountDTO from './CreateAccountDTO';

let useCase: CreateAccountUseCase;

let fakeUserRepository: FakeUserRepository;
let fakeAccountRepository: FakeAccountRepository;

let userId: string;

describe('CreateAccountUseCase', () => {
    beforeEach(async () => {
        fakeUserRepository = new FakeUserRepository();
        fakeAccountRepository = new FakeAccountRepository();

        const userPassword = await UserPassword.create(faker.internet.password());
        const userEmail = UserEmail.create(faker.internet.email());
        const userAge = UserAge.create(faker.random.number({ min: 16, max: 100 }));

        const user = User.create({
            name: faker.name.findName(),
            email: userEmail.value as UserEmail,
            age: userAge.value as UserAge,
            password: userPassword.value as UserPassword,
        }).value as User;

        const createdUser = await fakeUserRepository.insert(user);
        userId = createdUser.id.toString();

        useCase = new CreateAccountUseCase(fakeAccountRepository, fakeUserRepository);
    });

    it('Should be able to create an account when valid params were provided', async () => {
        const toCreateAccount: CreateAccountDTO = {
            userId,
            balance: faker.random.float({ min: 0, precision: 2 }),
        };

        const createdAccountOrError = await useCase.execute(toCreateAccount);

        expect(createdAccountOrError.isRight()).toBeTruthy();

        if (!createdAccountOrError.isRight()) return;

        const account = createdAccountOrError.value;

        expect(account.id).toBeTruthy();
        expect(account.createdAt).toBeTruthy();
        expect(account.balance).toEqual(toCreateAccount.balance);
    });

    it('Should return InvalidParam if userId was not provided', async () => {
        const toCreateAccount: any = {
            balance: faker.random.float({ min: 0, precision: 2 }),
        };

        const createdAccountOrError = await useCase.execute(toCreateAccount);

        expect(createdAccountOrError.isLeft()).toBeTruthy();

        if (!createdAccountOrError.isLeft()) return;

        const error = createdAccountOrError.value;

        expect(error).toBeInstanceOf(InvalidParam);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error.message).toBe('Invalid User');
    });

    it('Should return InvalidParam if balance lesser than 0', async () => {
        const toCreateAccount: CreateAccountDTO = {
            userId,
            balance: -1,
        };

        const createdAccountOrError = await useCase.execute(toCreateAccount);

        expect(createdAccountOrError.isLeft()).toBeTruthy();

        if (!createdAccountOrError.isLeft()) return;

        const error = createdAccountOrError.value;

        expect(error).toBeInstanceOf(InvalidParam);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error.message).toBe("'Balance' should be equal to or greater than 0");
    });
});
