import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { InstructorModule } from 'src/instructor/instructor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CustomerModule),
    forwardRef(() => InstructorModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
