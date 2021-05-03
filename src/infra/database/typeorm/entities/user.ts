import { DefaultIndicator } from '@shared/infra/database/enums';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Account } from './account';
import IUser from '../../entities/IUser';

@Entity()
export class User implements IUser {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    age: number;

    @Column()
    password: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column('varchar', { length: 1, default: DefaultIndicator })
    deleted: DefaultIndicator;

    @OneToMany(() => Account, account => account.user)
    accounts: Account[];
}
