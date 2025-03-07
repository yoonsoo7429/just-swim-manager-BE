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
import { UserType } from '../enum/user-type.enum';
import { Customer } from 'src/customer/entity/customer.entity';
import { Instructor } from 'src/instructor/entity/instructor.entity';
import { UserGender } from '../enum/user-gender.enum';
import { Member } from 'src/member/entity/member.entity';
import { Payment } from 'src/payment/entity/payment.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  userId: number;

  @Column({ type: 'varchar', nullable: true })
  provider: string;

  @Column({ type: 'enum', enum: UserType, nullable: true })
  userType: UserType;

  @Column({ type: 'enum', enum: UserGender, nullable: true })
  gender: UserGender;

  @Column('varchar')
  email: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  birth: string;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @CreateDateColumn({ type: 'timestamp' })
  userCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  userUpdatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  userDeletedAt: Date;

  @OneToMany(() => Customer, (customer) => customer.user)
  customer: Customer[];

  @OneToMany(() => Instructor, (instructor) => instructor.user)
  instructor: Instructor[];

  @OneToMany(() => Lecture, (lecture) => lecture.user)
  lecture: Lecture[];

  @OneToMany(() => Member, (member) => member.user)
  member: Member[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payment: Payment[];
}
