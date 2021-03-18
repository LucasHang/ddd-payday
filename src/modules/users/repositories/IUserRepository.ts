import { InvalidParam } from '@core/logic/GenericErrors';
import { Result } from '@core/logic/Result';
import User from '../domain/user';

export default interface IUserRepository {
    insert(t: User): Promise<User>;
    findByIdOrError(id: string): Promise<Result<InvalidParam, User>>;
}
