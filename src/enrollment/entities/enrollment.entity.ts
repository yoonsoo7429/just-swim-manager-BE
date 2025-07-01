import { BaseTable } from 'src/common/entity/base-table.entity';
import { Status } from 'src/common/enum/status.enum';
import { Lecture } from 'src/lecture/entities/lecture.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('enrollment')
export class Enrollment {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  enrollmentId: number;

  @ManyToOne(() => User, (user) => user.enrollment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customerId' })
  customer: User;

  @ManyToOne(() => Lecture, (lecture) => lecture.enrollment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'lectureId' })
  lecture: Lecture;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  enrollmentStatus: Status;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;
}
