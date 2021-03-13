/* eslint-disable no-use-before-define */
import { InvalidParam, Unexpected } from '@core/logic/GenericErrors';
import { StatusCodes } from 'http-status-codes';
import UserPassword from '../userPassword';

describe('UserPassword domain', () => {
    it(`Should return InvalidParam when password length is lesser than ${UserPassword.minLength}`, async () => {
        const passwordOrError = await UserPassword.create('12345');

        expect(passwordOrError.isLeft()).toBeTruthy();

        if (!passwordOrError.isLeft()) return;

        const error = passwordOrError.value;

        expect(error).toBeInstanceOf(InvalidParam);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error.message).toBe(`'Senha' deve conter no mínimo ${UserPassword.minLength} caracteres`);
    });

    it('Should return Unexpected when password hash throws', async () => {
        jest.spyOn(UserPassword, 'hashPassword').mockImplementationOnce(() => {
            return new Promise((_resolve, reject) => reject(new Error()));
        });

        const passwordOrError = await UserPassword.create('123456');

        expect(passwordOrError.isLeft()).toBeTruthy();

        if (!passwordOrError.isLeft()) return;

        const error = passwordOrError.value;

        expect(error).toBeInstanceOf(Unexpected);
        expect(error.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(error.message).toBe('Falha ao tentar encriptar senha');
    });
});
