import { Lecture } from 'src/lecture/entity/lecture.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  userId: number;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  userCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  userUpdatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  userDeletedAt: Date;

  @OneToMany(() => Lecture, (lecture) => lecture.user)
  lecture: Lecture[];
}
