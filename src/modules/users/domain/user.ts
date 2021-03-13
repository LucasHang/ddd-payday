import Entity from '@core/domain/Entity';
import UniqueEntityID from '@core/domain/UniqueEntityID';
import { InvalidParam } from '@core/logic/GenericErrors';
import Guard, { IGuardResult } from '@core/logic/Guard';
import { left, Result, right } from '@core/logic/Result';
import UserAge from './userAge';
import UserEmail from './userEmail';
import UserPassword from './userPassword';

interface ToCreateUserProps {
    name: string;
    email: UserEmail;
    age: UserAge;
    password: UserPassword;
}

type UserProps = ToCreateUserProps & {
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
};

export default class User extends Entity<UserProps> {
    constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: ToCreateUserProps): Result<InvalidParam, User> {
        const guardResult = this.guardValidation(props);

        if (!guardResult.succeeded) return left(new InvalidParam(guardResult.message as string));

        const userProps: UserProps = {
            ...props,
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
        };

        return right(new User(userProps));
    }

    public static build(props: UserProps, id: UniqueEntityID): Result<InvalidParam, User> {
        const guardResult = this.guardValidation(props);

        if (!guardResult.succeeded) return left(new InvalidParam(guardResult.message as string));

        return right(new User(props, id));
    }

    private static guardValidation(props: UserProps | ToCreateUserProps): IGuardResult {
        const guardedProps = [
            { argument: props.name, argumentName: 'Nome' },
            { argument: props.email, argumentName: 'E-mail' },
            { argument: props.age, argumentName: 'Idade' },
            { argument: props.password, argumentName: 'Senha' },
        ];

        return Guard.againstNullOrUndefinedBulk(guardedProps);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get email(): UserEmail {
        return this.props.email;
    }

    get age(): UserAge {
        return this.props.age;
    }

    get password(): UserPassword {
        return this.props.password;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    get isDeleted(): boolean {
        return this.props.isDeleted;
    }
}
