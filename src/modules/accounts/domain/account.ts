import Entity from '@core/domain/Entity';
import UniqueEntityID from '@core/domain/UniqueEntityID';
import { InvalidParam } from '@core/logic/GenericErrors';
import Guard, { IGuardResult } from '@core/logic/Guard';
import { left, Result, right } from '@core/logic/Result';
import AccountBalance from './accountBalance';

interface ToCreateAccountProps {
    userId: UniqueEntityID;
    balance: AccountBalance;
}

type AccountProps = ToCreateAccountProps & {
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
};

export default class Account extends Entity<AccountProps> {
    constructor(props: AccountProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: ToCreateAccountProps): Result<InvalidParam, Account> {
        const guardResult = this.guardValidation(props);
        if (!guardResult.succeeded) return left(new InvalidParam(guardResult.message as string));

        const accountProps: AccountProps = {
            ...props,
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
        };

        return right(new Account(accountProps));
    }

    public static build(props: AccountProps, id: UniqueEntityID): Result<InvalidParam, Account> {
        const guardResult = this.guardValidation(props);
        if (!guardResult.succeeded) return left(new InvalidParam(guardResult.message as string));

        return right(new Account(props, id));
    }

    private static guardValidation(props: AccountProps | ToCreateAccountProps): IGuardResult {
        const guardedProps = [
            { argument: props.userId, argumentName: 'User' },
            { argument: props.balance, argumentName: 'Balance' },
        ];

        return Guard.againstNullOrUndefinedBulk(guardedProps);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    get userId(): UniqueEntityID {
        return this.props.userId;
    }

    get balance(): AccountBalance {
        return this.props.balance;
    }

    set balance(newBalance: AccountBalance) {
        this.props.balance = newBalance;
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
