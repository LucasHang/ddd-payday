import BaseFakeRepo from '@core/infra/BaseFakeRepository';
import { InvalidParam } from '@core/logic/GenericErrors';
import { left, Result, right } from '@core/logic/Result';
import IAccount from '@infra/database/entities/IAccount';
import Account from '@modules/accounts/domain/account';
import { AccountMap } from '@modules/accounts/mappers/accountMap';
import { UpdatePartial } from '@shared/utils/types';
import IAccountRepository from '../../IAccountRepository';

export default class FakeAccountRepository extends BaseFakeRepo<IAccount> implements IAccountRepository {
    public async insert(account: Account): Promise<Account> {
        const toInsertAccount = AccountMap.toPersistence(account);

        const insertedAccount = this.addFakeItem(toInsertAccount as IAccount);

        return AccountMap.toDomain(insertedAccount);
    }

    public async update(account: UpdatePartial<Account>): Promise<Account> {
        const toUpdateAccount = AccountMap.toPersistence(account);

        const updatedAccount = this.updateFakeItem(toUpdateAccount);

        return AccountMap.toDomain(updatedAccount);
    }

    public async findByIdOrError(id: string): Promise<Result<InvalidParam, Account>> {
        const foundedAccount = this._items.find(account => account.id === id);

        if (!foundedAccount) return left(new InvalidParam('Invalid Account'));

        return right(AccountMap.toDomain(foundedAccount));
    }

    public async findByUserOrError(userId: string): Promise<Result<InvalidParam, Account>> {
        const foundedAccount = this._items.find(account => account.user_id === userId);

        if (!foundedAccount) return left(new InvalidParam('Invalid User'));

        return right(AccountMap.toDomain(foundedAccount));
    }

    public compareFakeItems(a: IAccount, b: IAccount): boolean {
        if (!a.id || !b.id) {
            return false;
        }
        return a.id === b.id;
    }
}
