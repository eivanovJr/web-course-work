import { Project } from '@prisma/client';
import { ProjectDto } from './project.dto';

export class ProjectMapper {
  static toDto(project: Project) {
    const projectDto = new ProjectDto();
    projectDto.name = project.name;
    projectDto.id = project.id;
    projectDto.description = project.description;
    projectDto.github = project.github;
    return projectDto;
  }
}
