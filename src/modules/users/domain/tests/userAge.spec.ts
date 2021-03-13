import { InvalidParam } from '@core/logic/GenericErrors';
import { StatusCodes } from 'http-status-codes';
import UserAge from '../userAge';

describe('UserAge domain', () => {
    it(`Should return error when age is lesser than ${UserAge.minAge}`, () => {
        const ageOrError = UserAge.create(UserAge.minAge - 1);

        expect(ageOrError.isLeft()).toBeTruthy();

        if (!ageOrError.isLeft()) return;

        const error = ageOrError.value;

        expect(error).toBeInstanceOf(InvalidParam);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error.message).toBe(`Idade deve ser no mínimo ${UserAge.minAge} anos`);
    });
});
