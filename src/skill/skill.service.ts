import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SkillDto } from './dto/skill.dto';
import { Prisma } from '@prisma/client';
import { SkillMapper } from './dto/skill.mapper';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}

  async getSkill(id: number): Promise<SkillDto | null> {
    const skill = await this.prisma.skill.findUnique({
      where: {
        id: Number(id),
      },
    });
    return skill == null ? null : SkillMapper.toDto(skill);
  }

  async getSkills(): Promise<SkillDto[]> {
    const skills = await this.prisma.skill.findMany();
    return skills.map((item) => SkillMapper.toDto(item));
  }

  async createSkill(data: Prisma.SkillCreateInput) {
    return this.prisma.skill.create({
      data,
    });
  }

  async deleteSkill(id: number) {
    return this.prisma.skill.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
