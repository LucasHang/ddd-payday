export interface IGuardResult {
    succeeded: boolean;
    message?: string;
}

export interface IGuardArgument {
    argument: unknown;
    argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export default class Guard {
    public static combine(guardResults: IGuardResult[]): IGuardResult {
        for (const result of guardResults) {
            if (result.succeeded === false) return result;
        }

        return { succeeded: true };
    }

    public static againstNullOrUndefined(argument: unknown, argumentName: string): IGuardResult {
        if (argument === null || argument === undefined) {
            return { succeeded: false, message: `'${argumentName}' deve ser informado(a)` };
        }
        return { succeeded: true };
    }

    public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): IGuardResult {
        for (const arg of args) {
            const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
            if (!result.succeeded) return result;
        }

        return { succeeded: true };
    }

    public static isOneOf<T>(value: T, validValues: T[], argumentName: string): IGuardResult {
        let isValid = false;
        for (const validValue of validValues) {
            if (value === validValue) {
                isValid = true;
            }
        }

        if (isValid) {
            return { succeeded: true };
        }
        return {
            succeeded: false,
            message: `'${argumentName}' não está dentro dos valores permitidos em ${validValues.join(
                ', ',
            )}. Recebido "${value}".`,
        };
    }

    public static inRange(num: number, min: number, max: number, argumentName: string): IGuardResult {
        const isInRange = num >= min && num <= max;
        if (!isInRange) {
            return { succeeded: false, message: `${argumentName} não está entre ${min} e ${max}.` };
        }
        return { succeeded: true };
    }

    public static allInRange(numbers: number[], min: number, max: number, argumentName: string): IGuardResult {
        let failingResult = false;
        for (const num of numbers) {
            const numIsInRangeResult = this.inRange(num, min, max, argumentName);
            failingResult = !numIsInRangeResult.succeeded;
        }

        if (failingResult) {
            return { succeeded: false, message: `${argumentName} não está dentro do permitido.` };
        }
        return { succeeded: true };
    }
}
