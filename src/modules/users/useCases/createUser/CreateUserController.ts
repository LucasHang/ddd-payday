import BaseController from '@core/infra/BaseController';
import CreateUserDTO from './CreateUserDTO';
import CreateUserUseCase from './CreateUserUseCase';

export default class CreateUserController extends BaseController {
    constructor(private useCase: CreateUserUseCase) {
        super();
    }

    public async executeImplementation(): Promise<void> {
        const dto: CreateUserDTO = this.req.body as CreateUserDTO;
        const result = await this.useCase.execute(dto);

        if (result.isLeft()) {
            BaseController.jsonResponse(this.res, result.value.statusCode, result.value.message);
            return;
        }

        this.ok(this.res, result.value);
    }
}
