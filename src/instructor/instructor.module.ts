import { Module } from '@nestjs/common';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorRepository } from './instructor.repository';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [InstructorController],
  providers: [InstructorService, InstructorRepository],
  exports: [InstructorService, InstructorRepository],
})
export class InstructorModule {}
