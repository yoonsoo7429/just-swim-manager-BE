import { BaseTable } from 'src/common/entity/base-table.entity';
import { Lecture } from 'src/lecture/entity/lecture.entity';
import { User } from 'src/user/entity/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
