import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { FactsService } from './facts.service';
import { Facts } from '@prisma/client';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FactsDto } from './dto/facts.dto';

@ApiTags('facts')
@Controller('facts')
export class FactsController {
  constructor(private factsService: FactsService) {}

  @ApiOperation({
    summary: 'Get all facts',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @Get('all')
  public async getFacts(): Promise<FactsDto[]> {
    return this.factsService.getFacts();
  }

  @ApiOperation({
    summary: 'Add a new fact',
  })
  @ApiResponse({
    status: 200,
    description: 'Fact successfully created',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
  })
  @Post('new')
  @ApiBody({ type: FactsDto })
  public async createFact(
    @Body(new ValidationPipe()) factData: FactsDto,
  ): Promise<Facts> {
    console.log('does it work?');
    const data = {
      description: factData.description,
    };
    return this.factsService.createFact(data);
  }

  @ApiOperation({
    summary: 'Delete fact',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Fact successfully deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
  })
  @Delete(':id')
  public async deleteFact(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Facts> {
    const fact = this.factsService.getFact(id);
    if (fact == null) {
      throw new HttpException('Fact not found', HttpStatus.BAD_REQUEST);
    }
    return this.factsService.deleteFact(id);
  }
}
