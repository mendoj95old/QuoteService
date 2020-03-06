import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './quote.entity';
import { Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote-dto';

@Injectable()
export class QuotesService {

  constructor(
    @InjectRepository(Quote)
    private readonly quotesRepository: Repository<Quote>,
  ) {}

  async findAll() {
    return this.quotesRepository.find();
  }

  async create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const quote = new Quote();
    quote.author = createQuoteDto.author;
    quote.quote = createQuoteDto.quote;

    return this.quotesRepository.save(quote);
  }

  async findOne(id: string): Promise<Quote> {
    return this.quotesRepository.findOne(id);
  }

  async deleteOne(id: string) {
    this.quotesRepository.delete(id);
  }

  async update(id: string, quoteData: CreateQuoteDto): Promise<Quote> {
    const toUpdate = await this.quotesRepository.findOne(id);
    const updated = Object.assign(toUpdate, quoteData);
    return this.quotesRepository.save(updated);
  }

}
