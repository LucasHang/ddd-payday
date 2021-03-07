import User from '../domain/user';

export default interface IUserRepository {
    insert(t: User): Promise<User>;
}
