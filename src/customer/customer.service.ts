import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { EditCustomerDto } from './dto/edit-customer.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}
}
