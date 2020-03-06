import { Test, TestingModule } from '@nestjs/testing';
import { QuotesService } from './quotes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quote } from './quote.entity';

describe('QuotesService', () => {
  let service: QuotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuotesService,
        {
          provide: getRepositoryToken(Quote),
          useValue: {},
        }
      ],
    }).compile();

    service = module.get<QuotesService>(QuotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
