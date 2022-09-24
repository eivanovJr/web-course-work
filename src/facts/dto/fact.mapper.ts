import { Facts } from '@prisma/client';
import { FactsDto } from './facts.dto';

export class FactMapper {
  static toDto(fact: Facts) {
    const factDto = new FactsDto();
    factDto.description = fact.description;
    return factDto;
  }
}
