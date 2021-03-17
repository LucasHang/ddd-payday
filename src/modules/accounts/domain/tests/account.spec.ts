/* eslint-disable no-use-before-define */
import UniqueEntityID from '@core/domain/UniqueEntityID';
import { InvalidParam } from '@core/logic/GenericErrors';
import faker from 'faker';
import { StatusCodes } from 'http-status-codes';
import Account from '../account';

describe('Account domain', () => {
    it('Should create an account with the given props plus the default setted ones', () => {
        const { accountToCreate, accountDefaultProps } = generateAccountMocks();

        const accountOrError = Account.create(accountToCreate);

        expect(accountOrError.isRight()).toBeTruthy();

        if (!accountOrError.isRight()) return;

        const accountDomain = accountOrError.value;

        expect(accountDomain).toMatchObject({ ...accountToCreate, ...accountDefaultProps });
        expect(accountDomain.id).toBeInstanceOf(UniqueEntityID);
        expect(accountDomain.balance).toBeTruthy();
        expect(accountDomain.createdAt).toBeInstanceOf(Date);
        expect(accountDomain.updatedAt).toBeInstanceOf(Date);
    });

    it('Should return InvalidParam when required props were not present', () => {
        const { accountToCreate } = generateAccountMocks({ overwriteProps: { balance: null } });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const accountOrError = Account.create(accountToCreate as any);

        expect(accountOrError.isLeft()).toBeTruthy();

        if (!accountOrError.isLeft()) return;

        const error = accountOrError.value;

        expect(error).toBeInstanceOf(InvalidParam);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error.message).toBe("'Balance' should be informed");
    });
});

function generateAccountMocks(params?: { overwriteProps?: any }) {
    return {
        accountToCreate: {
            userId: new UniqueEntityID(),
            balance: faker.random.float(),
            ...params?.overwriteProps,
        },
        accountDefaultProps: {
            isDeleted: false,
        },
    };
}
