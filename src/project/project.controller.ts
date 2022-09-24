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
import { ProjectService } from './project.service';
import { Project } from '@prisma/client';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProjectDto } from './dto/project.dto';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @ApiOperation({
    summary: 'Get all projects',
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
  public async getAllProjects(): Promise<ProjectDto[]> {
    return this.projectService.getProjects();
  }

  @ApiOperation({
    summary: 'Get Project by id',
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
  @Get(':id')
  public async getProjectById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProjectDto> {
    const project = await this.projectService.getProject(id);
    if (project == null)
      throw new HttpException('Project not found', HttpStatus.BAD_REQUEST);
    return project;
  }

  @ApiOperation({
    summary: 'Add a new project',
  })
  @ApiResponse({
    status: 200,
    description: 'Project successfully created',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
  })
  @Post('new')
  @ApiBody({ type: ProjectDto })
  public async createProject(
    @Body() projectData: ProjectDto,
  ): Promise<Project> {
    const data = {
      name: projectData.name,
      description: projectData.description,
      github: projectData.github,
    };
    return this.projectService.createProject(data);
  }

  @ApiOperation({
    summary: 'delete project',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @ApiResponse({
    status: 200,
    description: 'Fact successfully created',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
  })
  @Delete(':id')
  public async deleteProject(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Project> {
    const project = await this.projectService.getProject(id);
    if (project == null)
      throw new HttpException('Project not found', HttpStatus.BAD_REQUEST);
    return this.projectService.deleteProject(id);
  }
}
