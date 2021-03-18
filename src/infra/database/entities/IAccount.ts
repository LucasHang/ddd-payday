import { DefaultIndicador } from '@shared/infra/database/enums';

export default interface IAccount {
    id: string;
    user_id: string;
    balance: number;
    created_at: Date;
    updated_at: Date;
    deleted: DefaultIndicador;
}
