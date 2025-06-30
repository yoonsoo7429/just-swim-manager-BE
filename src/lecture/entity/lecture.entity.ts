import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LectureType } from '../enum/lecture-type.enum';
import { User } from 'src/user/entity/user.entity';
import { BaseTable } from 'src/common/entity/base-table.entity';
import { LectureDay } from './lecture-day.entity';

@Entity('lecture')
export class Lecture extends BaseTable {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  lectureId: number;

  @Column({ type: 'enum', enum: LectureType })
  lectureType: LectureType;

  @Column({ type: 'varchar' })
  lectureTitle: string;

  @Column({ type: 'varchar' })
  lectureContent: string;

  @Column({ type: 'varchar' })
  lectureLocation: string;

  @Column({ type: 'date', nullable: true })
  lectureStartDate: Date;

  @Column({ type: 'date', nullable: true })
  lectureEndDate: Date;

  @Column({ type: 'varchar' })
  lectureStartTime: string;

  @Column({ type: 'varchar' })
  lectureEndTime: string;

  @Column({ type: 'int' })
  lecturePrice: number;

  @Column({ type: 'int' })
  lectureCapacity: number;

  @ManyToOne(() => User, (user) => user.lecture)
  @JoinColumn({ name: 'instructorId' })
  instructor: User;

  @OneToMany(() => LectureDay, (day) => day.lecture, {
    cascade: true,
    eager: true,
  })
  days: LectureDay[];
}
