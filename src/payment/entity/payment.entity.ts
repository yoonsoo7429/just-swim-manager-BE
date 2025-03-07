import { Customer } from 'src/customer/entity/customer.entity';
import { Lecture } from 'src/lecture/entity/lecture.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
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

  @ManyToOne(() => User, (user) => user.payment)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Lecture, (lecture) => lecture.payment)
  @JoinColumn({ name: 'lectureId' })
  lecture: Lecture;

  @Column('varchar')
  paymentFee: string;

  @Column('varchar', { nullable: true })
  paymentDate: string;

  @CreateDateColumn({ type: 'timestamp' })
  paymentCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  paymentUpdatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  paymentDeletedAt: Date;
}
