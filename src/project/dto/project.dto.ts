import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class ProjectDto {
  @ApiProperty({
    description: 'Project id',
    example: '1',
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Project name',
    example: 'Spring LMS System',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Project description',
    example: 'Online course app using the Spring framework',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'source code link',
    example: 'https://github.com/eivanovJr/project_repo',
  })
  @IsUrl()
  github: string;
}
