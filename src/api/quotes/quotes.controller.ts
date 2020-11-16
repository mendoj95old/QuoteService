import { Controller, Get, Param, Post, Body, Logger, Delete, Put } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote-dto';
import { Quote } from './interface/quote.interface';
import { QuotesService } from './quotes.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('quotes')
@Controller('api/quotes')
export class QuotesController {

  constructor(
    private readonly quoteService: QuotesService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(QuotesController.name);
  }

  @Get()
  @ApiResponse({ status: 200, description: ''})
  async findAll() {
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
  async delete(@Param('id') id: string) {
    this.logger.log(`Deleting quote, id=${id}`);
    this.quoteService.deleteOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() quote: CreateQuoteDto): Promise<Quote> {
    this.logger.log(`Updating quote, id=${id}, newQuote="${JSON.stringify(quote)}`);
    return this.quoteService.update(id, quote);
  }

}
