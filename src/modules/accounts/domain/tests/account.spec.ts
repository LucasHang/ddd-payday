/* eslint-disable no-use-before-define */
import UniqueEntityID from '@core/domain/UniqueEntityID';
import faker from 'faker';
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
});

function generateAccountMocks() {
    return {
        accountToCreate: {
            userId: new UniqueEntityID(),
            balance: faker.random.float(),
        },
        accountDefaultProps: {
            isDeleted: false,
        },
    };
}
