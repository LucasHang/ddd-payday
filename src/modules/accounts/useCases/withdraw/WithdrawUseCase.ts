import UseCase from '@core/domain/UseCase';
import { InvalidParam } from '@core/logic/GenericErrors';
import { left, Result, right } from '@core/logic/Result';
import { AccountBalance } from '@modules/accounts/domain';
import AccountDTO from '@modules/accounts/dtos/accountDTO';
import { AccountMap } from '@modules/accounts/mappers/accountMap';
import IAccountRepository from '@modules/accounts/repositories/IAccountRepository';
import IValidator from '@shared/validators/IValidator';
import WithdrawDTO from './WithdrawDTO';

type Response = Result<InvalidParam, AccountDTO>;

export default class WithdrawUseCase implements UseCase<WithdrawDTO, Response> {
    constructor(private accountRepository: IAccountRepository, private validator: IValidator) {}

    public async execute(dto: WithdrawDTO): Promise<Response> {
        const validateOrError = this.validator.validate(dto);

        if (validateOrError.isLeft()) return left(validateOrError.value);

        const accountOrError = await this.accountRepository.findByIdOrError(dto.accountId);

        if (accountOrError.isLeft()) return left(accountOrError.value);

        const toUpdateAccount = accountOrError.value;

        const newBalance = toUpdateAccount.balance.value - dto.value;

        const balanceOrError = AccountBalance.create(newBalance);

        if (balanceOrError.isLeft()) return left(balanceOrError.value);

        toUpdateAccount.balance = balanceOrError.value;

        const updatedAccount = await this.accountRepository.update(toUpdateAccount);

        return right(AccountMap.toDTO(updatedAccount));
    }
}
