/* eslint-disable import/no-extraneous-dependencies */
import { StatusCodes } from 'http-status-codes';
import { InvalidParam } from '@core/logic/GenericErrors';
import FakeUserRepository from '@modules/users/repositories/implementations/fake/fakeUserRepository';
import FakeAccountRepository from '@modules/accounts/repositories/implementations/fake/fakeAccountRepository';
import faker from 'faker';
import UserAge from '@modules/users/domain/userAge';
import CreateAccountUseCase from '@modules/accounts/useCases/createAccount/CreateAccountUseCase';
import CreateUserDTO from './CreateUserDTO';
import CreateUserUseCase from './CreateUserUseCase';

let useCase: CreateUserUseCase;
let createAccountUseCase: CreateAccountUseCase;

let fakeUserRepository: FakeUserRepository;
let fakeAccountRepository: FakeAccountRepository;

describe('CreateUserUseCase', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeAccountRepository = new FakeAccountRepository();

        createAccountUseCase = new CreateAccountUseCase(fakeAccountRepository, fakeUserRepository);
        useCase = new CreateUserUseCase(fakeUserRepository, createAccountUseCase);
    });

    it('Should be able to create an user when valid params were provided', async () => {
        const toCreateUser: CreateUserDTO = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            age: 19,
            password: faker.internet.password(),
        };

        const createdUserOrError = await useCase.execute(toCreateUser);

        expect(createdUserOrError.isRight()).toBeTruthy();

        if (!createdUserOrError.isRight()) return;

        const user = createdUserOrError.value;

        expect(user.id).toBeTruthy();
        expect(user.createdAt).toBeTruthy();
        expect(user.email).toEqual(toCreateUser.email);

        const accountOrError = await fakeAccountRepository.findByUserOrError(user.id);

        expect(accountOrError.isRight()).toBeTruthy();

        if (!accountOrError.isRight()) return;

        const account = accountOrError.value;

        expect(account.balance.value).toBe(0);
    });

    it('Should return InvalidParam if name was not provided', async () => {
        const toCreateUser: any = {
            email: faker.internet.email(),
            age: 19,
            password: faker.internet.password(),
        };

        const createdUserOrError = await useCase.execute(toCreateUser);

        expect(createdUserOrError.isLeft()).toBeTruthy();

        if (!createdUserOrError.isLeft()) return;

        const error = createdUserOrError.value;

        expect(error).toBeInstanceOf(InvalidParam);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error.message).toBe("'Name' should be informed");
    });

    it(`Should return InvalidParam if age is under ${UserAge.minAge}`, async () => {
        const toCreateUser: CreateUserDTO = {
            name: faker.name.findName(),
            email: faker.internet.email(),
            age: 15,
            password: faker.internet.password(),
        };

        const createdUserOrError = await useCase.execute(toCreateUser);

        expect(createdUserOrError.isLeft()).toBeTruthy();

        if (!createdUserOrError.isLeft()) return;

        const error = createdUserOrError.value;

        expect(error).toBeInstanceOf(InvalidParam);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error.message).toBe("'Age' should be greater than or equal 16 years");
    });
});
