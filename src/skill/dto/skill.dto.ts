import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SkillDto {
  @ApiProperty({
    description: 'skill name',
    example: 'PC enjoyer',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'brief description or used stack',
    example: 'CLI, bash',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
