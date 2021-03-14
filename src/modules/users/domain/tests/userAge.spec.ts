import { InvalidParam } from '@core/logic/GenericErrors';
import { StatusCodes } from 'http-status-codes';
import UserAge from '../userAge';

describe('UserAge domain', () => {
    it(`Should return InvalidParam when age is lesser than ${UserAge.minAge}`, () => {
        const ageOrError = UserAge.create(15);

        expect(ageOrError.isLeft()).toBeTruthy();

        if (!ageOrError.isLeft()) return;

        const error = ageOrError.value;

        expect(error).toBeInstanceOf(InvalidParam);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error.message).toBe(`'Idade' deve ser no mínimo ${UserAge.minAge} anos`);
    });

    it('Should return a instance of UserAge if a valid age was provided', () => {
        const toCreateAge = 16;

        const ageOrError = UserAge.create(toCreateAge);

        expect(ageOrError.isRight()).toBeTruthy();

        if (!ageOrError.isRight()) return;

        const age = ageOrError.value;

        expect(age).toBeInstanceOf(UserAge);
        expect(age.value).toBe(toCreateAge);
    });
});
