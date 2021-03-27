import { InvalidParam } from '@core/logic/GenericErrors';
import { Result } from '@core/logic/Result';

export default interface IValidator {
    validate(data: any): Result<InvalidParam, null>;
}
