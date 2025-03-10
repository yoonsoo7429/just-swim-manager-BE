import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { BaseTable } from 'src/common/entity/base-table.entity';

@Entity('customer')
export class Customer extends BaseTable {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  customerId: number;

  @ManyToOne(() => User, (user) => user.customer)
  @JoinColumn({ name: 'userId' })
  user: User;
}
