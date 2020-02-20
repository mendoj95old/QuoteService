import { Module, Logger } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  controllers: [QuotesController],
  providers: [QuotesService, Logger],
})
export class QuotesModule {}
