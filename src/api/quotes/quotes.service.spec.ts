import { Test, TestingModule } from '@nestjs/testing';
import { QuotesService } from './quotes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quote } from './quote.entity';
import { ObjectId } from 'mongodb';
import { CreateQuoteDto } from './dto/create-quote-dto';

const createQuoteDto: CreateQuoteDto = {
  quote: 'test1',
  author: 'test1',
};

const testQuote: Quote = {
  id: new ObjectId(),
  quote: 'test1',
  author: 'test1',
};

const arrayQuotes: Quote[] = [
  { id: new ObjectId(), quote: 'test1', author: 'test1' },
  { id: new ObjectId(), quote: 'test2', author: 'test2' },
];

describe('QuotesService', () => {
  let quotesService: QuotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuotesService,
        {
          provide: getRepositoryToken(Quote),
          useFactory: () => ({
            find: jest.fn(() => arrayQuotes),
            findOne: jest.fn(() => testQuote),
            save: jest.fn(() => testQuote),
            delete: jest.fn(() => undefined),
          }),
        },
      ],
    }).compile();

    quotesService = module.get<QuotesService>(QuotesService);
  });

  it('should be defined', () => {
    expect(quotesService).toBeDefined();
  });

  describe('findAll', () => {
    it('should find array of quotes from database', async () => {
      expect(await quotesService.findAll()).toBe(arrayQuotes);
    });
  });

  describe('create', () => {
    it('should save a quote to the database', async () => {
      expect(await quotesService.create(createQuoteDto)).toBe(testQuote);
    });
  });

  describe('findOne', () => {
    it('should findOne quote from the database by id', async () => {
      expect(await quotesService.findOne(testQuote.id.toHexString())).toBe(testQuote);
    });
  });

  describe('deleteOne', () => {
    it('should delete one quote from the database by id', async () => {
      expect(await quotesService.deleteOne(testQuote.id.toHexString())).toBe(undefined);
    });
  });

});
