import { BaseTable } from 'src/common/entity/base-table.entity';
import { Lecture } from 'src/lecture/entity/lecture.entity';
import { Payment } from 'src/payment/entity/payment.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('registration')
export class Registration extends BaseTable {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  registrationId: number;

  @ManyToOne(() => User, (user) => user.registration)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Lecture, (lecture) => lecture.registration)
  @JoinColumn({ name: 'lectureId' })
  lecture: Lecture;

  @Column({ type: 'boolean', default: false })
  approve: boolean;

  @OneToMany(() => Payment, (payment) => payment.registration)
  payment: Payment[];
}
