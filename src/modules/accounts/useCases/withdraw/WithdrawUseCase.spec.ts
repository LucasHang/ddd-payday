// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import FakeAccountRepository from '@modules/accounts/repositories/implementations/fake/fakeAccountRepository';
import FakeUserRepository from '@modules/users/repositories/implementations/fake/fakeUserRepository';
import { AccountBalance } from '@modules/accounts/domain';
import MyDtoValidator from '@shared/validators/implementations/MyDtoValidator';
import IValidator from '@shared/validators/IValidator';
import { InvalidParam } from '@core/logic/GenericErrors';
import { StatusCodes } from 'http-status-codes';
import CreateUserUseCase from '@modules/users/useCases/createUser/CreateUserUseCase';
import WithdrawUseCase from './WithdrawUseCase';
import WithdrawDTOValidation from './WithdrawDTOValidation';
import CreateAccountUseCase from '../createAccount/CreateAccountUseCase';

let useCase: WithdrawUseCase;
let createAccountUseCase: CreateAccountUseCase;
let createUserUseCase: CreateUserUseCase;

let fakeUserRepository: FakeUserRepository;
let fakeAccountRepository: FakeAccountRepository;

let myDtoValidator: IValidator;

let accountId: string;
const initialBalance = 100;

describe('WithdrawUseCase', () => {
    beforeEach(async () => {
        fakeUserRepository = new FakeUserRepository();
        fakeAccountRepository = new FakeAccountRepository();
        myDtoValidator = new MyDtoValidator(WithdrawDTOValidation);

        createAccountUseCase = new CreateAccountUseCase(fakeAccountRepository, fakeUserRepository);
        createUserUseCase = new CreateUserUseCase(fakeUserRepository, createAccountUseCase);

        const userOrError = await createUserUseCase.execute({
            name: faker.name.findName(),
            email: faker.internet.email(),
            age: faker.datatype.number({ min: 16, max: 100 }),
            password: faker.internet.password(),
        });

        if (userOrError.isLeft()) throw userOrError.value;

        const createdUser = userOrError.value;

        const accountOrError = await fakeAccountRepository.findByUserOrError(createdUser.id);

        if (accountOrError.isLeft()) throw accountOrError.value;

        const createdAccount = accountOrError.value;

        const newBalance = AccountBalance.create(initialBalance);

        await fakeAccountRepository.update({
            id: createdAccount.id,
            balance: newBalance.value as AccountBalance,
        });

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
        expect(account.balance).toBe(initialBalance - value);
    });
});
