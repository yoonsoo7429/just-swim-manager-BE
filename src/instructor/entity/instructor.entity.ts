import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entity/user.entity';

@Entity('instructor')
export class Instructor {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  instructorId: number;

  @ManyToOne(() => User, (user) => user.instructor)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar', nullable: true })
  workingLocation: string;

  @Column({ type: 'varchar', nullable: true })
  career: string;

  @Column({ type: 'varchar', nullable: true })
  history: string;

  @Column({ type: 'varchar', nullable: true })
  introduction: string;

  @Column({ type: 'mediumtext', nullable: true })
  curriculum: string;

  @Column({ type: 'varchar', nullable: true })
  youtubeLink: string;

  @Column({ type: 'varchar', nullable: true })
  instagramLink: string;

  @Column({ type: 'varchar', nullable: true })
  facebookLink: string;

  @CreateDateColumn({ type: 'timestamp' })
  instructorCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  instructorUpdatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  instructorDeletedAt: Date;
}
