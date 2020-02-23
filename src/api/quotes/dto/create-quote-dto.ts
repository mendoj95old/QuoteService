import { ApiProperty } from '@nestjs/swagger';

export class CreateQuoteDto {

  @ApiProperty()
  readonly quote: string;

  @ApiProperty()
  readonly author?: string;
}
