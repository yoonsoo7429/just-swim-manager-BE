import { BaseTable } from 'src/common/entity/base-table.entity';
import { Lecture } from 'src/lecture/entity/lecture.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('member')
export class Member extends BaseTable {
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
}
