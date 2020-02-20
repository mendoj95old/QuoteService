import { Module } from '@nestjs/common';
import { QuotesModule } from './quotes/quotes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    QuotesModule,
    UsersModule,
  ],
})
export class ApiModule {}
