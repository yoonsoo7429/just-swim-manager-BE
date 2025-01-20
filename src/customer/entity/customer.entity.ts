import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerGender } from '../enum/customer-gender.enum';
import { Member } from 'src/member/entity/member.entity';

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  customerId: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'enum', enum: CustomerGender, nullable: true })
  gender: CustomerGender;

  @Column({ type: 'varchar' })
  phoneNumber: string;

  @Column({ type: 'varchar' })
  birthDate: string;

  @Column({ type: 'varchar' })
  address: string;

  @CreateDateColumn({ type: 'timestamp' })
  customerCreatedAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  customerUpdatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  customerDeletedAt: Date;

  @OneToMany(() => Member, (member) => member.customer)
  member: Member[];
}
