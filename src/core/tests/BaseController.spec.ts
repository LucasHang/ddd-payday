/* eslint-disable import/no-extraneous-dependencies */
import faker from 'faker';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserPassword from '@modules/users/domain/userPassword';
import { createUserController } from '@modules/users/useCases/createUser';

describe('BaseController', () => {
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
