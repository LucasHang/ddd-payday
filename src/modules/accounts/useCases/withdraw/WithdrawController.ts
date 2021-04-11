import BaseController from '@core/infra/BaseController';
import WithdrawDTO from './WithdrawDTO';
import WithdrawUseCase from './WithdrawUseCase';

export default class WithdrawController extends BaseController {
    constructor(private useCase: WithdrawUseCase) {
        super();
    }

    public async executeImplementation(): Promise<void | any> {
        const dto: WithdrawDTO = {
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
