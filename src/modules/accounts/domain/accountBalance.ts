import ValueObject from '@core/domain/ValueObject';
import { left, Result, right } from '@core/logic/Result';
import Guard from '@core/logic/Guard';
import { InvalidParam } from '@core/logic/GenericErrors';

interface AccountBalanceProps {
    value: number;
}

export default class AccountBalance extends ValueObject<AccountBalanceProps> {
    private constructor(props: AccountBalanceProps) {
        super(props);
    }

    public static create(balance: number): Result<InvalidParam, AccountBalance> {
        const guardResult = Guard.againstNullOrUndefined(balance, 'Balance');

        if (!guardResult.succeeded) return left(new InvalidParam(guardResult.message as string));

        const appropriateOrError = this.validateAppropriateBalance(balance);
        if (appropriateOrError.isLeft()) return left(appropriateOrError.value);

        return right(new AccountBalance({ value: balance }));
    }

    public static build(balance: number): Result<InvalidParam, AccountBalance> {
        const guardResult = Guard.againstNullOrUndefined(balance, 'Balance');

        if (!guardResult.succeeded) return left(new InvalidParam(guardResult.message as string));

        return this.create(balance);
    }

    private static validateAppropriateBalance(balance: number): Result<InvalidParam, null> {
        return balance >= 0
            ? right(null)
            : left(new InvalidParam("'Balance' should be equal to or greater than 0"));
    }

    get value(): number {
        return this.props.value;
    }
}
