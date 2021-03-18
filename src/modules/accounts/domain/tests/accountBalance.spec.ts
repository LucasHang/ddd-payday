import { InvalidParam } from '@core/logic/GenericErrors';
import { StatusCodes } from 'http-status-codes';
import AccountBalance from '../accountBalance';

describe('AccountBalance domain', () => {
    it('Should return InvalidParam if an less than 0 balance was provided', () => {
        const toCreateBalance = -1;
        const balanceOrError = AccountBalance.create(toCreateBalance);

        expect(balanceOrError.isLeft()).toBeTruthy();

        if (!balanceOrError.isLeft()) return;

        const error = balanceOrError.value;

        expect(error).toBeInstanceOf(InvalidParam);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error.message).toBe("'Balance' should be equal or greater than 0");
    });

    it('Should return a instance of AccountBalance if a valid balance was provided', () => {
        const toCreateBalance = 10;

        const balanceOrError = AccountBalance.create(toCreateBalance);

        expect(balanceOrError.isRight()).toBeTruthy();

        if (!balanceOrError.isRight()) return;

        const balance = balanceOrError.value;

        expect(balance).toBeInstanceOf(AccountBalance);
        expect(balance.value).toBe(toCreateBalance);
    });
});
