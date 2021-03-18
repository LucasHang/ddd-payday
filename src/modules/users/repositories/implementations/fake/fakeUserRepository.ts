import BaseFakeRepo from '@core/infra/BaseFakeRepository';
import User from '@modules/users/domain/user';
import { UserMap } from '@modules/users/mappers/userMap';
import IUser from '@infra/database/entities/IUser';
import { InvalidParam } from '@core/logic/GenericErrors';
import { left, Result, right } from '@core/logic/Result';
import IUserRepository from '../../IUserRepository';

export default class FakeUserRepository extends BaseFakeRepo<IUser> implements IUserRepository {
    public async insert(user: User): Promise<User> {
        const toInsertUser = UserMap.toPersistence(user);

        const insertedUser = this.addFakeItem(toInsertUser);

        return UserMap.toDomain(insertedUser);
    }

    public async findByIdOrError(id: string): Promise<Result<InvalidParam, User>> {
        const foundedUser = this._items.find(user => user.id === id);

        if (!foundedUser) return left(new InvalidParam('Invalid User'));

        return right(UserMap.toDomain(foundedUser));
    }

    public compareFakeItems(a: IUser, b: IUser): boolean {
        if (!a.id || !b.id) {
            return false;
        }
        return a.id === b.id;
    }
}
