import { validate as classValidatorValidate } from 'class-validator';
import { left, Result, right } from '@core/logic/Result';
import IValidator from '../IValidator';

export default class ClassValidator implements IValidator {
    constructor(private DTOClass: any) {}

    public async validate(data: any): Promise<Result<string, null>> {
        const classToValidate = new this.DTOClass();
        Object.keys(data).forEach(key => {
            classToValidate[key] = data[key];
        });

        const errors = await classValidatorValidate(classToValidate);

        if (errors.length <= 0) return right(null);

        const firstError = errors[0];
        const constraints = firstError.constraints || {};
        const firstConstraintKey = Object.keys(constraints).pop();
        return left(constraints[firstConstraintKey as string]);
    }
}
