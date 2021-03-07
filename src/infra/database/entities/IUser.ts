import { DefaultIndicador } from '@shared/infra/database/enums';

export default interface IUser {
    id: string;
    name: string;
    email: string;
    age: number;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: DefaultIndicador;
}
