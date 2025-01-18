import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LectureLevel } from '../enum/lecture-level.enum';

@Entity('lecture')
export class Lecture {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  lectureId: number;

  @Column({ type: 'varchar' })
  lectureTitle: string;

  @Column({ type: 'enum', enum: LectureLevel, nullable: true })
  lectureLevel: LectureLevel;

  @Column({ type: 'varchar' })
  lectureDays: string;

  @Column({ type: 'varchar' })
  lectureTime: string;

  @Column({ type: 'varchar' })
  lectureAmount: string;

  @CreateDateColumn({ type: 'timestamp' })
  lectureCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  lectureUpdatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  lectureDeletedAt: Date;
}
