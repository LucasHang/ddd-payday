import ValueObject from '@core/domain/ValueObject';
import { InvalidParam } from '@core/logic/GenericErrors';
import Guard from '@core/logic/Guard';
import { left, Result, right } from '@core/logic/Result';

interface UserAgeProps {
    value: number;
}

export default class UserAge extends ValueObject<UserAgeProps> {
    public static minAge = 16;

    private constructor(props: UserAgeProps) {
        super(props);
    }

    public static create(age: number): Result<InvalidParam, UserAge> {
        const guardResult = Guard.againstNullOrUndefined(age, 'Idade');

        if (!guardResult.succeeded) return left(new InvalidParam(guardResult.message as string));

        const appropriateOrError = this.validateAppropriateAge(age);
        if (appropriateOrError.isLeft()) return left(appropriateOrError.value);

        return right(new UserAge({ value: age }));
    }

    public static build(age: number): Result<InvalidParam, UserAge> {
        return this.create(age);
    }

    private static validateAppropriateAge(age: number): Result<InvalidParam, null> {
        return age >= this.minAge
            ? right(null)
            : left(new InvalidParam(`'Age' should be greater than or equal ${this.minAge} years`));
    }

    get value(): number {
        return this.props.value;
    }
}
