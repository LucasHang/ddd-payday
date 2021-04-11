// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';
import FakeAccountRepository from '@modules/accounts/repositories/implementations/fake/fakeAccountRepository';
import MyDtoValidator from '@shared/validators/implementations/MyDtoValidator';
import IValidator from '@shared/validators/IValidator';
import { InvalidParam } from '@core/logic/GenericErrors';
import { StatusCodes } from 'http-status-codes';
import CreateUserUseCase from '@modules/users/useCases/createUser/CreateUserUseCase';
import FakeUserRepository from '@modules/users/repositories/implementations/fake/fakeUserRepository';
import DepositUseCase from './DepositUseCase';
import DepositDTOValidation from './DepositDTOValidation';
import CreateAccountUseCase from '../createAccount/CreateAccountUseCase';

let useCase: DepositUseCase;
let createAccountUseCase: CreateAccountUseCase;
let createUserUseCase: CreateUserUseCase;

let fakeAccountRepository: FakeAccountRepository;
let fakeUserRepository: FakeUserRepository;

let myDtoValidator: IValidator;

let accountId: string;

describe('DepositUseCase', () => {
    beforeEach(async () => {
        fakeAccountRepository = new FakeAccountRepository();
        fakeUserRepository = new FakeUserRepository();
        myDtoValidator = new MyDtoValidator(DepositDTOValidation);

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

        accountId = createdAccount.id.toString();

        useCase = new DepositUseCase(fakeAccountRepository, myDtoValidator);
    });

    it('Should return InvalidParam if accountId was not provided', async () => {
        const depositOrError = await useCase.execute({
            // accountId,
            value: -1,
        } as any);

        expect(depositOrError.isLeft()).toBeTruthy();

        if (!depositOrError.isLeft()) return;

        const error = depositOrError.value;

        expect(error).toBeInstanceOf(InvalidParam);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error.message).toBe('Account should be informed');
    });

    it('Should return InvalidParam if invalid value was provided', async () => {
        const depositOrError = await useCase.execute({
            accountId,
            value: -1,
        } as any);

        expect(depositOrError.isLeft()).toBeTruthy();

        if (!depositOrError.isLeft()) return;

        const error = depositOrError.value;

        expect(error).toBeInstanceOf(InvalidParam);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error.message).toBe('Value should be equal to or greater than 0');
    });

    it('Should be able to deposit if valid params were provided', async () => {
        const value = 10;

        const depositOrError = await useCase.execute({
            accountId,
            value,
        });

        expect(depositOrError.isRight()).toBeTruthy();

        if (!depositOrError.isRight()) return;

        const account = depositOrError.value;

        expect(account).toBeTruthy();
        expect(account.id).toBe(accountId);
        expect(account.balance).toBe(value);
    });
});
