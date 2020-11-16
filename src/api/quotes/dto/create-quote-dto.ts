import { ApiProperty } from '@nestjs/swagger';
import { SourceType } from '../quote.enum';

export class CreateQuoteDto {

  @ApiProperty()
  readonly quote: string;

  @ApiProperty()
  readonly author?: string;

  @ApiProperty()
  readonly source?: string;

  @ApiProperty()
  readonly sourceType?: SourceType;
}
