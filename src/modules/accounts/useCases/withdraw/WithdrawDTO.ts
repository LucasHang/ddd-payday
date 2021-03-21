import { IsNumber, Min } from 'class-validator';

export default class WithdrawDTO {
    accountId!: string;

    @IsNumber(undefined, { message: "'Value' should be a number" })
    @Min(0, { message: "'Value' should be equal to or greater than 0" })
    value!: number;
}
