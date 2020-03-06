import { Test, TestingModule } from '@nestjs/testing';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { Quote } from './quote.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
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

describe('Quotes Controller', () => {
  let quotesController: QuotesController;
  let quotesService: QuotesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [QuotesController],
      providers: [
        QuotesService,
        { provide: getRepositoryToken(Quote), useValue: {} },
        Logger,
      ],
    }).compile();

    quotesService = moduleRef.get<QuotesService>(QuotesService);
    quotesController = moduleRef.get<QuotesController>(QuotesController);
  });

  describe('getAll', () => {
    it('should return an array of quotes', async () => {
      const result: Quote[] = [
        { id: new ObjectId(), quote: 'test1', author: 'test1' },
      ];

      jest.spyOn(quotesService, 'findAll').mockResolvedValue(result);

      expect(await quotesController.findAll()).toBe(result);
    });
  });

  describe('get', () => {
    it('should return a quote', async () => {
      const result = testQuote;

      jest.spyOn(quotesService, 'findOne').mockResolvedValue(result);

      expect(await quotesController.findOne(result.id.toHexString())).toBe(result);
    });
  });

  describe('post', () => {
    it('should post a new quote and return it', async () => {
      const result = testQuote;

      jest.spyOn(quotesService, 'create').mockResolvedValue(result);

      expect(await quotesController.create(createQuoteDto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete a quote', async () => {
      const result = testQuote;

      jest.spyOn(quotesService, 'deleteOne').mockImplementationOnce(() => null);

      expect(await quotesController.delete(result.id.toHexString())).toBe(undefined);
    });
  });

});
