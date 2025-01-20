import { Customer } from 'src/customer/entity/customer.entity';
import { Lecture } from 'src/lecture/entity/lecture.entity';
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

@Entity('member')
export class Member {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  memberId: number;

  @ManyToOne(() => Customer, (customer) => customer.member)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToOne(() => Lecture, (lecture) => lecture.member)
  @JoinColumn({ name: 'lectureId' })
  lecture: Lecture;

  @Column('varchar')
  memberRegistrationDate: string;

  @CreateDateColumn({ type: 'timestamp' })
  memberCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  memberUpdatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  memberDeletedAt: Date;
}
