import { Module, Logger } from '@nestjs/common';
import { QuotesModule } from './quotes/quotes.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from 'src/libs/interceptors/logger.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    QuotesModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    Logger,
  ],
  exports: [
    UserModule,
  ],
})
export class ApiModule {}
