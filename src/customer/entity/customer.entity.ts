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

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  customerId: number;

  @ManyToOne(() => User, (user) => user.customer)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  customerCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  customerUpdatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  customerDeletedAt: Date;
}
