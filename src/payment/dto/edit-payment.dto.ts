import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';

export class EditPaymentDto extends PartialType(CreatePaymentDto) {}
