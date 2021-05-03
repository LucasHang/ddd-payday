import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultIndicator } from '@shared/infra/database/enums';
import IAccount from '../../entities/IAccount';
import { User } from './user';

@Entity()
export class Account implements IAccount {
    @PrimaryColumn()
    id: string;

    @Column()
    user_id: string;

    @Column()
    email: string;

    @Column()
    balance: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @Column('varchar', { length: 1, default: DefaultIndicator })
    deleted: DefaultIndicator;

    @ManyToOne(() => User, user => user.accounts)
    @JoinColumn({ name: 'user_id' })
    user: User;
}
