import * as Joi from 'joi';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { ExcelModule } from './excel/excel.module';
import { AuthModule } from './auth/auth.module';
import { ReponseModule } from './common/reponse/reponse.module';
import { JwtService } from '@nestjs/jwt';
import { AuthMiddleWare } from './auth/middleware/auth.middleware';
import { LectureModule } from './lecture/lecture.module';
import { MemberModule } from './member/member.module';
import { PaymentModule } from './payment/payment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ENV: Joi.string().valid('dev', 'prod').required(),
        DB_TYPE: Joi.string().valid('mysql').required(),
        DB_HOST: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
      }),
    }),
    // db 설정
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        // synchronize: false,
      }),
      inject: [ConfigService],
    }),
    CustomerModule,
    ExcelModule,
    AuthModule,
    ReponseModule,
    LectureModule,
    MemberModule,
    PaymentModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule implements NestModule {
  // middleware 전역으로 사용
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleWare)
      .exclude(
        { path: 'signin', method: RequestMethod.POST },
        { path: 'signup', method: RequestMethod.POST },
      )
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
