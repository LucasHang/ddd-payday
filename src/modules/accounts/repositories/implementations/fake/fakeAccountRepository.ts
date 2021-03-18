import BaseFakeRepo from '@core/infra/BaseFakeRepository';
import IAccount from '@infra/database/entities/IAccount';
import Account from '@modules/accounts/domain/account';
import { AccountMap } from '@modules/accounts/mappers/accountMap';
import IAccountRepository from '../../IAccountRepository';

export default class FakeAccountRepository extends BaseFakeRepo<IAccount> implements IAccountRepository {
    public async insert(account: Account): Promise<Account> {
        const toInsertAccount = AccountMap.toPersistence(account);

        const insertedAccount = this.addFakeItem(toInsertAccount);

        return AccountMap.toDomain(insertedAccount);
    }

    public compareFakeItems(a: IAccount, b: IAccount): boolean {
        if (!a.id || !b.id) {
            return false;
        }
        return a.id === b.id;
    }
}
