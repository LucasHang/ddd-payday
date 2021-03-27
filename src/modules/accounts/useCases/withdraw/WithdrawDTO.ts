import { Min, Required } from '@core/logic/GuardDecorators';

export default class WithdrawDTO {
    @Required({ argumentName: 'Account' })
    accountId: string;

    @Min(0, { argumentName: 'Value' })
    value: number;
}
