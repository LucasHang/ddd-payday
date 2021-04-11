import UniqueEntityID from '@core/domain/UniqueEntityID';
import { booleanAsDefaultIndicator, defaultIndicatorAsBoolean } from '@shared/infra/database/enums';
import IAccount from '@infra/database/entities/IAccount';
import { UpdatePartial } from '@shared/utils/types';
import Account from '../domain/account';
import AccountBalance from '../domain/accountBalance';
import AccountDTO from '../dtos/accountDTO';

export class AccountMap {
    public static toPersistence(account: UpdatePartial<Account>): UpdatePartial<IAccount> {
        return {
            id: account.id.toString(),
            user_id: account.userId?.toString(),
            balance: account.balance?.value,
            created_at: account.createdAt,
            updated_at: account.updatedAt,
            deleted:
                account.isDeleted === undefined ? undefined : booleanAsDefaultIndicator(!!account.isDeleted),
        };
    }

    public static toDomain(raw: IAccount): Account {
        const balanceOrError = AccountBalance.build(raw.balance);

        const userOrError = Account.build(
            {
                balance: balanceOrError.value as AccountBalance,
                userId: new UniqueEntityID(raw.user_id),
                createdAt: raw.created_at,
                updatedAt: raw.updated_at,
                isDeleted: defaultIndicatorAsBoolean(raw.deleted),
            },
            new UniqueEntityID(raw.id),
        );

        if (userOrError.isLeft()) console.log(userOrError.value);

        return userOrError.value as Account;
    }

    public static toDTO(account: Account): AccountDTO {
        return {
            id: account.id.toString(),
            userId: account.userId.toString(),
            balance: account.balance.value,
            createdAt: account.createdAt.toISOString(),
        };
    }
}
