import { InvalidParam } from '@core/logic/GenericErrors';
import { Result } from '@core/logic/Result';
import { UpdatePartial } from '@shared/utils/types';
import Account from '../domain/account';

export default interface IAccountRepository {
    insert(t: Account): Promise<Account>;
    update(t: UpdatePartial<Account>): Promise<Account>;
    findByIdOrError(id: string): Promise<Result<InvalidParam, Account>>;
    findByUserOrError(userId: string): Promise<Result<InvalidParam, Account>>;
}
