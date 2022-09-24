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
} from '@nestjs/common';
import { SkillService } from './skill.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SkillDto } from './dto/skill.dto';

@ApiTags('skill')
@Controller('skill')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @ApiOperation({
    summary: 'Get all skills',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
  })
  @Get('all')
  public async getAllSkills(): Promise<SkillDto[]> {
    return this.skillService.getSkills();
  }

  @ApiOperation({
    summary: 'Add a new skill',
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
  @ApiBody({ type: SkillDto })
  public async addSkill(@Body() skillData: SkillDto) {
    const data = {
      name: skillData.name,
      description: skillData.description,
    };
    return this.skillService.createSkill(data);
  }

  @ApiOperation({
    summary: 'Delete skill',
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
  public async deleteSkill(@Param('id', ParseIntPipe) id: number) {
    const skill = this.skillService.getSkill(id);
    if (skill == null)
      throw new HttpException('Project not found', HttpStatus.BAD_REQUEST);
    return this.skillService.deleteSkill(id);
  }
}
