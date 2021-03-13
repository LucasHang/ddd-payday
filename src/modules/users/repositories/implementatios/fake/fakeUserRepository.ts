import BaseFakeRepo from '@core/tests/BaseFakeRepository';
import User from '@modules/users/domain/user';
import { UserMap } from '@modules/users/mappers/userMap';
import IUser from '@infra/database/entities/IUser';
import IUserRepository from '../../IUserRepository';

export default class FakeUserRepository extends BaseFakeRepo<IUser> implements IUserRepository {
    public async insert(user: User): Promise<User> {
        const toInsertUser = UserMap.toPersistence(user);

        const insertedUser = this.addFakeItem(toInsertUser);

        return UserMap.toDomain(insertedUser);
    }

    public compareFakeItems(a: IUser, b: IUser): boolean {
        if (!a.id || !b.id) {
            return false;
        }
        return a.id === b.id;
    }
}
