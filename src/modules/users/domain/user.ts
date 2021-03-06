import Entity from '@core/domain/Entity';
import UniqueEntityID from '@core/domain/UniqueEntityID';

interface UserProps {
    name: string;
    email: string;
    age: number;
    passwordHash: string;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
}

class User extends Entity<UserProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    get age(): number {
        return this.props.age;
    }

    get passwordHash(): string {
        return this.props.passwordHash;
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

    constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: UserProps, id?: UniqueEntityID): User {
        return new User(props, id);
    }
}

export default User;
