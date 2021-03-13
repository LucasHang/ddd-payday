/* eslint-disable no-use-before-define */
import { InvalidParam } from '@core/logic/GenericErrors';
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
});
