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
import { Member } from 'src/member/entity/member.entity';
import { Payment } from 'src/payment/entity/payment.entity';
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

  @OneToMany(() => Member, (member) => member.customer)
  member: Member[];

  @OneToMany(() => Payment, (payment) => payment.customer)
  payment: Payment[];
}
