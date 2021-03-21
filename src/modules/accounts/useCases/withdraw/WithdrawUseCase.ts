import UseCase from '@core/domain/UseCase';
import { InvalidParam } from '@core/logic/GenericErrors';
import { Result, right } from '@core/logic/Result';
import AccountDTO from '@modules/accounts/dtos/accountDTO';
import IAccountRepository from '@modules/accounts/repositories/IAccountRepository';
import IValidator from '@shared/validators/IValidator';
import WithdrawDTO from './WithdrawDTO';

type Response = Result<InvalidParam, AccountDTO>;

export default class WithdrawUseCase implements UseCase<WithdrawDTO, Response> {
    constructor(private accountRepository: IAccountRepository, private validator: IValidator) {}

    public async execute(dto: WithdrawDTO): Promise<Response> {
        const validateOrError = await this.validator.validate(dto);

        console.log(validateOrError);

        return right({
            id: 'asafasf',
            userId: 'asfafs',
            balance: 10,
            createdAt: '123asfasf',
        });
    }
}
