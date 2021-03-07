import * as bcrypt from 'bcrypt';
import ValueObject from '@core/domain/ValueObject';
import Guard from '@core/logic/Guard';
import { left, Result, right } from '@core/logic/Result';

interface UserPasswordProps {
    value: string;
}

export default class UserPassword extends ValueObject<UserPasswordProps> {
    public static minLength = 6;

    private constructor(props: UserPasswordProps) {
        super(props);
    }

    public static async create(password: string): Promise<Result<string, UserPassword>> {
        const propsResult = Guard.againstNullOrUndefined(password, 'Senha');

        if (!propsResult.succeeded) return left(propsResult.message as string);

        if (!this.isAppropriateLength(password))
            return left(`Senha deve conter no mínimo ${this.minLength} caracteres`);

        try {
            const passwordHash = await this.hashPassword(password);
            return right(new UserPassword({ value: passwordHash }));
        } catch (_err) {
            return left('Falha ao tentar encriptar senha');
        }
    }

    public static build(password: string): Result<string, UserPassword> {
        const propsResult = Guard.againstNullOrUndefined(password, 'Senha');

        if (!propsResult.succeeded) return left(propsResult.message as string);

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

    private static hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    private static isAppropriateLength(password: string): boolean {
        return password.length >= this.minLength;
    }

    get value(): string {
        return this.props.value;
    }
}
