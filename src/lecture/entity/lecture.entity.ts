import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LectureLevel } from '../enum/lecture-level.enum';
import { Member } from 'src/member/entity/member.entity';
import { Payment } from 'src/payment/entity/payment.entity';

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
  lectureFee: string;

  @Column({ type: 'bigint' })
  lectureCapacity: number;

  @CreateDateColumn({ type: 'timestamp' })
  lectureCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  lectureUpdatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  lectureDeletedAt: Date;

  @OneToMany(() => Member, (member) => member.lecture)
  member: Member[];

  @OneToMany(() => Payment, (payment) => payment.lecture)
  payment: Payment[];
}
