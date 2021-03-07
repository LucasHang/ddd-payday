/* eslint-disable no-use-before-define */
import UserPassword from '../userPassword';

describe('UserPassword domain', () => {
    it(`Should return error when password length is lesser than ${UserPassword.minLength}`, async () => {
        const passwordOrError = await UserPassword.create(generateWrongLengthPassword());

        expect(passwordOrError.isLeft()).toBeTruthy();

        if (!passwordOrError.isLeft()) return;

        expect(passwordOrError.value).toEqual(
            `Senha deve conter no mínimo ${UserPassword.minLength} caracteres`,
        );
    });
});

function generateWrongLengthPassword(): string {
    let wrongPassword = '';
    for (let i = 0; i < UserPassword.minLength - 1; i += 1) {
        wrongPassword += `${i}`;
    }
    return wrongPassword;
}
