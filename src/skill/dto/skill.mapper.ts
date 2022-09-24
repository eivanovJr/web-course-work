import { Skill } from '@prisma/client';
import { SkillDto } from './skill.dto';

export class SkillMapper {
  static toDto(skill: Skill) {
    const skillDto = new SkillDto();
    skillDto.name = skill.name;
    skillDto.description = skill.description;
    return skillDto;
  }
}
