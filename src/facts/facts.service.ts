import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FactsDto } from './dto/facts.dto';
import { Prisma } from '@prisma/client';
import { FactMapper } from './dto/fact.mapper';

@Injectable()
export class FactsService {
  constructor(private prisma: PrismaService) {}

  async getFact(id: number): Promise<FactsDto | null> {
    const fact = await this.prisma.facts.findUnique({
      where: {
        id: Number(id),
      },
    });
    return fact == null ? null : FactMapper.toDto(fact);
  }

  async getFacts(): Promise<FactsDto[]> {
    const facts = await this.prisma.facts.findMany();
    return facts.map((item) => FactMapper.toDto(item));
  }

  async createFact(data: Prisma.FactsCreateInput) {
    return this.prisma.facts.create({
      data,
    });
  }

  async deleteFact(id: number) {
    return this.prisma.facts.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
