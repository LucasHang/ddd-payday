import { DefaultIndicator } from '@shared/infra/database/enums';

export default interface IUser {
    id: string;
    name: string;
    email: string;
    age: number;
    password: string;
    created_at: Date;
    updated_at: Date;
    deleted: DefaultIndicator;
}
