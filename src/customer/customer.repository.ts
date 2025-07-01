import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EditCustomerDto } from './dto/edit-customer.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(User)
    private customerRepository: Repository<User>,
  ) {}
}
