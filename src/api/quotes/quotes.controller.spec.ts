import { Test, TestingModule } from '@nestjs/testing';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { Quote } from './quote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { ObjectId } from 'mongodb';

describe('Quotes Controller', () => {
  let quotesController: QuotesController;
  let quotesService: QuotesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Quote])],
      controllers: [QuotesController],
      providers: [QuotesService, Logger],
    }).compile();

    quotesService = moduleRef.get<QuotesService>(QuotesService);
    quotesController = moduleRef.get<QuotesController>(QuotesController);
  });

  describe('getAll', () => {
    it('should return an array of quotes', async () => {
      const result: Quote[] = [
        {
          id: new ObjectId(),
          quote: 'test1',
          author: 'test1',
        },
        {
          id: new ObjectId(),
          quote: 'test2',
          author: 'test2',
        },
      ];

      await jest.spyOn(quotesService, 'findAll').mockResolvedValue(result);

      expect(await quotesController.findAll()).toBe(result);
    });
  });
});
