import { Global, Module } from '@nestjs/common';
import { ResponseService } from './reponse.service';

@Global()
@Module({
  providers: [ResponseService],
  exports: [ResponseService],
})
export class ReponseModule {}
