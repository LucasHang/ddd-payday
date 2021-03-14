import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { InvalidParam } from '@core/logic/GenericErrors';
import FakeUserRepository from '@modules/users/repositories/implementatios/fake/fakeUserRepository';
import faker from 'faker';
import UserAge from '@modules/users/domain/userAge';
import UserPassword from '@modules/users/domain/userPassword';
import CreateUserDTO from './CreateUserDTO';
import CreateUserUseCase from './CreateUserUseCase';
import { createUserController } from '.';

let useCase: CreateUserUseCase;

let fakeUserRepository: FakeUserRepository;

describe('CreateUserUseCase', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        useCase = new CreateUserUseCase(fakeUserRepository);
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
        expect(error.message).toBe("'Nome' deve ser informado(a)");
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
        expect(error.message).toBe("'Idade' deve ser no mínimo 16 anos");
    });
});

describe('CreateUserController', () => {
    it('Should return Internal server error if implementation throws', async () => {
        jest.spyOn(UserPassword, 'hashPassword').mockImplementationOnce(() => {
            return new Promise((_resolve, reject) => reject(new Error()));
        });

        const mockedRequest = {
            body: {
                name: faker.name.findName(),
                email: faker.internet.email(),
                age: 19,
                password: faker.internet.password(),
            },
        } as Request;

        const mockedResponse = {
            json(data: any) {
                mockedResponse.data = data;
                return mockedResponse;
            },
            status(code: number) {
                mockedResponse.status = code;
                return mockedResponse;
            },
        } as any;

        const response = await createUserController.execute(mockedRequest, mockedResponse);

        expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.data.message).toBe('Não foi possível realizar a requisição');
    });
});
