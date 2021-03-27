/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/ban-types */
import { IGuardResult } from './Guard';

interface GuardDecoratorOptions {
    argumentName?: string;
}

export function Required(options?: GuardDecoratorOptions) {
    return (target: any, propertyKey: string): void => {
        let value: any;

        const contextIdentifier = `required-${propertyKey}`;
        const argumentName = options?.argumentName || propertyKey;

        const result: IGuardResult = {
            succeeded: false,
            message: `${argumentName} should be informed`,
        };

        setGuardResult(target, contextIdentifier, result);

        const setter = (newVal: any) => {
            if (
                (typeof newVal !== 'object' && !!newVal) ||
                (typeof newVal === 'object' && !!newVal && Object.keys(newVal).length > 0)
            ) {
                result.succeeded = true;
                result.message = undefined;

                setGuardResult(target, contextIdentifier, result);
            }

            value = newVal;
        };

        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: setter,
        });
    };
}

export function Min(minVal: number, options?: GuardDecoratorOptions) {
    return (target: any, propertyKey: string): void => {
        let value: number;

        const contextIdentifier = `min-${propertyKey}`;

        const result: IGuardResult = {
            succeeded: true,
        };

        const setter = (newVal: number) => {
            if (newVal < minVal) {
                const argumentName = options?.argumentName || propertyKey;

                result.succeeded = false;
                result.message = `${argumentName} should be greater than or equal to ${minVal}`;

                setGuardResult(target, contextIdentifier, result);
            }

            value = newVal;
        };

        Object.defineProperty(target, propertyKey, {
            get: () => value,
            set: setter,
        });
    };
}

//--

function setGuardResult(target: any, contextIdentifier: string, result: IGuardResult) {
    if (Object.getOwnPropertyNames(target).includes('result')) {
        Object.assign(target.result, {
            [contextIdentifier]: result,
        });
    } else {
        Object.defineProperty(target, 'result', {
            value: {
                [contextIdentifier]: result,
            },
            writable: true,
        });
    }
}
