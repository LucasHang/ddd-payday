import { IGuardResult } from './Guard';

type GuardValidator = (val: any, argumentName: string) => IGuardResult;

export function isDefined(): GuardValidator {
    return (val: any, argumentName: string) => {
        if (
            (typeof val !== 'object' && !!val) ||
            (typeof val === 'object' && !!val && Object.keys(val).length > 0)
        ) {
            return {
                succeeded: true,
            };
        }

        return {
            succeeded: false,
            message: `${argumentName} should be informed`,
        };
    };
}

export function isNumber(): GuardValidator {
    return (val: any, argumentName: string) => {
        if (typeof val === 'number') {
            return {
                succeeded: true,
            };
        }

        return {
            succeeded: false,
            message: `${argumentName} should be a number`,
        };
    };
}

export function min(minVal: number): GuardValidator {
    return (val: number, argumentName: string) => {
        if (val >= minVal) {
            return {
                succeeded: true,
            };
        }

        return {
            succeeded: false,
            message: `${argumentName} should be equal to or greater than ${minVal}`,
        };
    };
}
