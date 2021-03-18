import Account from '../domain/account';

export default interface IAccountRepository {
    insert(t: Account): Promise<Account>;
}
