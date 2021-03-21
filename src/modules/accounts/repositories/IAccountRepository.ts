import { InvalidParam } from '@core/logic/GenericErrors';
import { Result } from '@core/logic/Result';
import Account from '../domain/account';

export default interface IAccountRepository {
    insert(t: Account): Promise<Account>;
    findByUserOrError(userId: string): Promise<Result<InvalidParam, Account>>;
}
