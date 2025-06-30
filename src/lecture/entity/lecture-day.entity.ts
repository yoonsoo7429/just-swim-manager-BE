import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lecture } from './lecture.entity';
import { DayOfWeek } from 'src/common/enum/day-of-week.enum';

@Entity()
export class LectureDay {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  lectureDayId: number;

  @ManyToOne(() => Lecture, (lecture) => lecture.days, { onDelete: 'CASCADE' })
  lecture: Lecture;

  @Column({ type: 'enum', enum: DayOfWeek })
  dayOfWeek: DayOfWeek;
}
