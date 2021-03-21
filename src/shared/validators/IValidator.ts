import { Result } from '@core/logic/Result';

export default interface IValidator {
    validate(data: any): Promise<Result<string, null>>;
}
