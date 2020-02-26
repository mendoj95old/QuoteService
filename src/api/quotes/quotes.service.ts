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

  create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    return this.quotesRepository.save(createQuoteDto);
  }

  findOne(id: string): Promise<Quote> {
    return this.quotesRepository.findOne(id);
  }

  deleteOne(id: string) {
    this.quotesRepository.delete(id);
  }

}
