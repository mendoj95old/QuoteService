import { Injectable, Scope, Inject, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './quote.entity';
import { Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote-dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'supertest';

@Injectable({ scope: Scope.REQUEST })
export class QuotesService {

  constructor(
    @InjectRepository(Quote)
    private readonly quotesRepository: Repository<Quote>,
    @Inject(REQUEST) private readonly request: Request,
    private readonly logger: Logger,
  ) {}

  findAll(): Promise<Quote[]> {
    // console.log(this.request);
    return this.quotesRepository.find();
  }

  create(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    return this.quotesRepository.save(createQuoteDto);
  }

  findOne(id: string): Promise<Quote> {
    // console.log(this.request);
    return this.quotesRepository.findOne(id);
  }

  deleteOne(id: string) {
    this.quotesRepository.delete(id);
  }

}
