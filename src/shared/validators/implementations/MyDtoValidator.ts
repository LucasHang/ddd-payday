import { left, Result, right } from '@core/logic/Result';
import { InvalidParam } from '@core/logic/GenericErrors';
import { IGuardResult } from '@core/logic/Guard';
import IValidator from '../IValidator';

type ValidationValidator = (val: any, argumentName: string) => IGuardResult;

export interface ValidationProps {
    property: string;
    propertyName: string;
    validators: Array<ValidationValidator>;
}

export default class MyDtoValidator implements IValidator {
    constructor(private validations: Array<ValidationProps>) {}

    public validate(data: any): Result<InvalidParam, null> {
        for (const validation of this.validations) {
            const { property, propertyName, validators } = validation;
            for (const validator of validators) {
                const result = validator(data[property], propertyName);

                if (!result.succeeded) return left(new InvalidParam(result.message as string));
            }
        }

        return right(null);
    }
}
