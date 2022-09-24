import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectDto } from './dto/project.dto';
import { Prisma, Project } from '@prisma/client';
import { ProjectMapper } from './dto/project.mapper';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getProject(id: number): Promise<ProjectDto | null> {
    const project = await this.prisma.project.findUnique({
      where: {
        id: Number(id),
      },
    });
    return project == null ? null : ProjectMapper.toDto(project);
  }

  async getProjects(): Promise<ProjectDto[]> {
    const projects = await this.prisma.project.findMany();
    return projects.map((item) => ProjectMapper.toDto(item));
  }

  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({
      data,
    });
  }

  async deleteProject(id: number): Promise<Project> {
    return this.prisma.project.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
