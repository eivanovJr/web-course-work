import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FactsDto {
  @ApiProperty({
    description: 'basic fact',
    example: 'born in Moldova',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
