import BaseFakeRepo from '@core/tests/BaseFakeRepository';
import User from '@modules/users/domain/user';
import IUser from 'src/infra/database/entities/IUser';
import IUserRepository from '../../IUserRepository';

export default class FakeUserRepository extends BaseFakeRepo<IUser> implements IUserRepository {
    public async insert(user: User): Promise<User> {
        const insertedUser = this.insert(user);

        return insertedUser;
    }

    public compareFakeItems(a: IUser, b: IUser): boolean {
        if (!a.id || !b.id) {
            return false;
        }
        return a.id === b.id;
    }
}
