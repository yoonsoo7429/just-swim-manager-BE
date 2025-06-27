import { Lecture } from 'src/lecture/entity/lecture.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTable } from 'src/common/entity/base-table.entity';
import { UserType } from '../enum/user-type.enum';
import { Provider } from 'src/auth/enum/provider.enum';
import { Status } from 'src/common/enum/status.enum';

@Entity('user')
export class User extends BaseTable {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  userId: number;

  @Column({ type: 'enum', enum: UserType, nullable: true })
  userType: UserType;

  @Column({ type: 'enum', enum: Provider, nullable: true })
  provider: Provider;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  birth: string;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: Status, nullable: true })
  instructorStatus: Status;

  @OneToMany(() => Lecture, (lecture) => lecture.user)
  lecture: Lecture[];
}
