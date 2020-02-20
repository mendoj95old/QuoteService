import { Controller, Get, Param, Post, Body, Logger, Delete, UseInterceptors } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote-dto';
import { Quote } from './interface/quote.interface';
import { QuotesService } from './quotes.service';
import { LoggerInterceptor } from 'src/libs/logger.interceptor';

@Controller('api/quotes')
@UseInterceptors(LoggerInterceptor)
export class QuotesController {

  constructor(
    private readonly quoteService: QuotesService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async findAll(): Promise<Quote[]> {
    this.logger.log(`Getting all quotes.`);
    return this.quoteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Quote> {
    this.logger.log(`Found one quote.`);
    return this.quoteService.findOne(id);
  }

  @Post()
  async create(@Body() createQuoteDto: CreateQuoteDto): Promise<Quote> {
    this.logger.log(`Adding quote, ${JSON.stringify(createQuoteDto)}`);
    return this.quoteService.create(createQuoteDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.logger.log(`Deleting quote, id=${id}`);
    this.quoteService.deleteOne(id);
  }

}
