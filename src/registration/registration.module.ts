import { Module } from '@nestjs/common';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './entity/registration.entity';
import { RegistrationRepository } from './registration.repository';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Registration]), PaymentModule],
  controllers: [RegistrationController],
  providers: [RegistrationService, RegistrationRepository],
  exports: [RegistrationService, RegistrationRepository],
})
export class RegistrationModule {}
