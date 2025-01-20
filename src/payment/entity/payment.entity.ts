import { Customer } from 'src/customer/entity/customer.entity';
import { Lecture } from 'src/lecture/entity/lecture.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  paymentId: number;

  @ManyToOne(() => Customer, (customer) => customer.payment)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => Lecture, (lecture) => lecture.payment)
  @JoinColumn({ name: 'lectureId' })
  lecture: Lecture;

  @CreateDateColumn({ type: 'timestamp' })
  paymentCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  paymentUpdatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  paymentDeletedAt: Date;
}
