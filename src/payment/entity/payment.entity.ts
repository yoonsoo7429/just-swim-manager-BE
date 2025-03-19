import { BaseTable } from 'src/common/entity/base-table.entity';
import { Lecture } from 'src/lecture/entity/lecture.entity';
import { Registration } from 'src/registration/entity/registration.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payment')
export class Payment extends BaseTable {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  paymentId: number;

  @ManyToOne(() => User, (user) => user.payment)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Lecture, (lecture) => lecture.payment)
  @JoinColumn({ name: 'lectureId' })
  lecture: Lecture;

  @ManyToOne(() => Registration, (registration) => registration.payment)
  @JoinColumn({ name: 'registrationId' })
  registration: Registration;

  @Column('varchar')
  paymentFee: string;

  @Column('varchar', { nullable: true })
  paymentDate: string;
}
