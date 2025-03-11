import { forwardRef, Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entity/member.entity';
import { MemberRepository } from './member.repository';
import { PaymentModule } from 'src/payment/payment.module';
import { LectureModule } from 'src/lecture/lecture.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    forwardRef(() => LectureModule),
    forwardRef(() => PaymentModule),
  ],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
  exports: [MemberService, MemberRepository],
})
export class MemberModule {}
