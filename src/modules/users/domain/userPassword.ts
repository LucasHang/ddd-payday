import * as bcrypt from 'bcrypt';
import ValueObject from '@core/domain/ValueObject';
import Guard from '@core/logic/Guard';
import { left, Result, right } from '@core/logic/Result';
import { InvalidParam, Unexpected } from '@core/logic/GenericErrors';

interface UserPasswordProps {
    value: string;
}

export default class UserPassword extends ValueObject<UserPasswordProps> {
    public static minLength = 6;

    private constructor(props: UserPasswordProps) {
        super(props);
    }

    public static async create(password: string): Promise<Result<InvalidParam | Unexpected, UserPassword>> {
        const propsResult = Guard.againstNullOrUndefined(password, 'Senha');

        if (!propsResult.succeeded) return left(new InvalidParam(propsResult.message as string));

        const appropriateOrError = this.validateAppropriateLength(password);
        if (appropriateOrError.isLeft()) return left(appropriateOrError.value);

        const passwordHash = await this.hashPassword(password);
        return right(new UserPassword({ value: passwordHash }));
    }

    public static build(password: string): Result<InvalidParam, UserPassword> {
        const propsResult = Guard.againstNullOrUndefined(password, 'Senha');

        if (!propsResult.succeeded) return left(new InvalidParam(propsResult.message as string));

        return right(new UserPassword({ value: password }));
    }

    /**
     * @method comparePassword
     * @desc Compares as plain-text and hashed password.
     */

    public async comparePassword(plainTextPassword: string): Promise<boolean> {
        return this.bcryptCompare(plainTextPassword, this.props.value);
    }

    private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
        return new Promise((resolve, _reject) => {
            bcrypt.compare(plainText, hashed, (err, compareResult) => {
                if (err) return resolve(false);
                return resolve(compareResult);
            });
        });
    }

    public static hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    private static validateAppropriateLength(password: string): Result<InvalidParam, null> {
        return password.length >= this.minLength
            ? right(null)
            : left(new InvalidParam(`'Password' length should be at least ${this.minLength} chars`));
    }

    get value(): string {
        return this.props.value;
    }
}
