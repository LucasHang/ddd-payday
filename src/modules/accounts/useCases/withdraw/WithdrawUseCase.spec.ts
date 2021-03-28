import faker from 'faker';
import FakeAccountRepository from '@modules/accounts/repositories/implementations/fake/fakeAccountRepository';
import FakeUserRepository from '@modules/users/repositories/implementations/fake/fakeUserRepository';
import { User, UserAge, UserEmail, UserPassword } from '@modules/users/domain';
import { Account, AccountBalance } from '@modules/accounts/domain';
import MyDtoValidator from '@shared/validators/implementations/MyDtoValidator';
import IValidator from '@shared/validators/IValidator';
import { InvalidParam } from '@core/logic/GenericErrors';
import { StatusCodes } from 'http-status-codes';
import WithdrawUseCase from './WithdrawUseCase';
import WithdrawDTOValidation from './WithdrawDTOValidation';

let useCase: WithdrawUseCase;

let fakeUserRepository: FakeUserRepository;
let fakeAccountRepository: FakeAccountRepository;
let myDtoValidator: IValidator;

let accountId: string;
const balance = 100;

describe('WithdrawUseCase', () => {
    beforeEach(async () => {
        fakeUserRepository = new FakeUserRepository();
        fakeAccountRepository = new FakeAccountRepository();
        myDtoValidator = new MyDtoValidator(WithdrawDTOValidation);

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

        const account = Account.create({
            userId: createdUser.id,
            balance: AccountBalance.create(balance).value as AccountBalance,
        }).value as Account;

        const createdAccount = await fakeAccountRepository.insert(account);

        accountId = createdAccount.id.toString();

        useCase = new WithdrawUseCase(fakeAccountRepository, myDtoValidator);
    });

    it('Should return InvalidParam if accountId was not provided', async () => {
        const withdrawOrError = await useCase.execute({
            // accountId,
            value: -1,
        } as any);

        expect(withdrawOrError.isLeft()).toBeTruthy();

        if (!withdrawOrError.isLeft()) return;

        const error = withdrawOrError.value;

        expect(error).toBeInstanceOf(InvalidParam);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error.message).toBe('Account should be informed');
    });

    it('Should return InvalidParam if invalid value was provided', async () => {
        const withdrawOrError = await useCase.execute({
            accountId,
            value: -1,
        } as any);

        expect(withdrawOrError.isLeft()).toBeTruthy();

        if (!withdrawOrError.isLeft()) return;

        const error = withdrawOrError.value;

        expect(error).toBeInstanceOf(InvalidParam);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error.message).toBe('Value should be equal to or greater than 0');
    });

    it('Should be able to withdraw if valid params were provided', async () => {
        const value = 10;

        const withdrawOrError = await useCase.execute({
            accountId,
            value,
        });

        expect(withdrawOrError.isRight()).toBeTruthy();

        if (!withdrawOrError.isRight()) return;

        const account = withdrawOrError.value;

        expect(account).toBeTruthy();
        expect(account.id).toBe(accountId);
        expect(account.balance).toBe(balance - value);
    });
});
