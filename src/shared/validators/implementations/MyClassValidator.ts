import { left, Result, right } from '@core/logic/Result';
import { InvalidParam } from '@core/logic/GenericErrors';
import { IGuardResult } from '@core/logic/Guard';
import IValidator from '../IValidator';

type AssignedDTOInstance<T> = T & {
    result?: {
        [key: string]: IGuardResult;
    };
};

export default class MyClassValidator<T> implements IValidator {
    constructor(private getDtoInstance: () => T) {}

    public validate(data: T): Result<InvalidParam, null> {
        const { result } = this.assignToValidate(this.getDtoInstance(), data);

        if (result) {
            let firstFailingGuardResult: IGuardResult | undefined;

            Object.keys(result).forEach(key => {
                if (!firstFailingGuardResult && result[key] && !result[key].succeeded)
                    firstFailingGuardResult = result[key];
            });

            if (firstFailingGuardResult)
                return left(new InvalidParam(firstFailingGuardResult.message as string));
        }

        return right(null);
    }

    private assignToValidate(target: T, source: T): AssignedDTOInstance<T> {
        return Object.assign(target, source) as any;
    }
}
