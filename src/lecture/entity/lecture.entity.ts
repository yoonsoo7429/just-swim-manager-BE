import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LectureLevel } from '../enum/lecture-level.enum';
import { User } from 'src/user/entity/user.entity';
import { BaseTable } from 'src/common/entity/base-table.entity';

@Entity('lecture')
export class Lecture extends BaseTable {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  lectureId: number;

  @ManyToOne(() => User, (user) => user.lecture)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar' })
  lectureTitle: string;

  @Column({ type: 'enum', enum: LectureLevel, nullable: true })
  lectureLevel: LectureLevel;

  @Column({ type: 'varchar' })
  lectureDays: string;

  @Column({ type: 'varchar' })
  lectureTime: string;

  @Column({ type: 'varchar' })
  lectureFee: string;

  @Column({ type: 'bigint' })
  lectureCapacity: number;

  @Column({ type: 'varchar', nullable: true })
  lectureDate: string;
}
