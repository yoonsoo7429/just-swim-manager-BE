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

@Entity('member')
export class Member {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  memberId: number;

  @ManyToOne(() => User, (user) => user.member)
  @JoinColumn({ name: 'userId' })
  user: User;

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
