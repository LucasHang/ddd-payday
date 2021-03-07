import ValueObject from '@core/domain/ValueObject';
import { left, Result, right } from '@core/logic/Result';
import Guard from '@core/logic/Guard';

interface UserEmailProps {
    value: string;
}

export default class UserEmail extends ValueObject<UserEmailProps> {
    private constructor(props: UserEmailProps) {
        super(props);
    }

    public static create(email: string): Result<string, UserEmail> {
        const guardResult = Guard.againstNullOrUndefined(email, 'E-mail');

        if (!guardResult.succeeded) return left(guardResult.message as string);

        return right(new UserEmail({ value: email }));
    }

    public static build(email: string): Result<string, UserEmail> {
        return this.create(email);
    }

    get value(): string {
        return this.props.value;
    }
}
