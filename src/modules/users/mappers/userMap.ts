import UniqueEntityID from '@core/domain/UniqueEntityID';
import { booleanAsDefaultIndicator, defaultIndicatorAsBoolean } from '@shared/infra/database/enums';
import IUser from '@infra/database/entities/IUser';
import { UpdatePartial } from '@shared/utils/types';
import User from '../domain/user';
import UserAge from '../domain/userAge';
import UserEmail from '../domain/userEmail';
import UserPassword from '../domain/userPassword';
import UserDTO from '../dtos/userDTO';

export class UserMap {
    public static toPersistence(user: UpdatePartial<User>): UpdatePartial<IUser> {
        return {
            id: user.id.toString(),
            name: user.name,
            email: user.email?.value,
            age: user.age?.value,
            password: user.password?.value,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
            deleted: user.isDeleted === undefined ? undefined : booleanAsDefaultIndicator(!!user.isDeleted),
        };
    }

    public static toDomain(raw: IUser): User {
        const passwordOrError = UserPassword.build(raw.password);
        const emailOrError = UserEmail.build(raw.email);
        const ageOrError = UserAge.build(raw.age);

        const userOrError = User.build(
            {
                name: raw.name,
                email: emailOrError.value as UserEmail,
                age: ageOrError.value as UserAge,
                password: passwordOrError.value as UserPassword,
                createdAt: raw.created_at,
                updatedAt: raw.updated_at,
                isDeleted: defaultIndicatorAsBoolean(raw.deleted),
            },
            new UniqueEntityID(raw.id),
        );

        if (userOrError.isLeft()) console.log(userOrError.value);

        return userOrError.value as User;
    }

    public static toDTO(user: User): UserDTO {
        return {
            id: user.id.toString(),
            name: user.name,
            email: user.email.value,
            age: user.age.value,
            createdAt: user.createdAt.toISOString(),
        };
    }
}
