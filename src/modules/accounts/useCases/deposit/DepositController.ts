import BaseController from '@core/infra/BaseController';
import DepositDTO from './DepositDTO';
import DepositUseCase from './DepositUseCase';

export default class DepositController extends BaseController {
    constructor(private useCase: DepositUseCase) {
        super();
    }

    public async executeImplementation(): Promise<void | any> {
        const dto: DepositDTO = {
            ...this.req.body,
            ...this.req.params,
        };

        const result = await this.useCase.execute(dto);

        if (result.isLeft()) {
            return BaseController.jsonResponse(this.res, result.value.statusCode, result.value.message);
        }

        return this.ok(this.res, result.value);
    }
}
