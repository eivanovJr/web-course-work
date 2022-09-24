import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectModule } from './project/project.module';
import { SkillModule } from './skill/skill.module';
import { FactsModule } from './facts/facts.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './htttp-exception-filter';

@Module({
  imports: [ProjectModule, SkillModule, FactsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
