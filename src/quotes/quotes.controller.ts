import { Controller, Get, Param, Post, Body, Logger } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote-dto';
import { Quote } from './interface/quote.interface';
import { QuotesService } from './quotes.service';

@Controller('quotes')
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
  create(@Body() createQuoteDto: CreateQuoteDto) {
    this.logger.log(`Adding quote, ${JSON.stringify(createQuoteDto)}`);
    this.quoteService.create(createQuoteDto);
  }

}
