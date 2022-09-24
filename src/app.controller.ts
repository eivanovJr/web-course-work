import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { TimeInterceptor } from './TimeInterceptor';

@UseInterceptors(TimeInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getIndexPage() {
    return { user: '' };
  }

  @Get('/authorized')
  @Render('index')
  getIndexPageAuthorized() {
    return { user: 'username' };
  }

  @Get('/project')
  @Render('project')
  getProjects() {
    return {};
  }

  @Get('/todo')
  @Render('todo')
  getTodoList() {
    return;
  }

  @Get('/users')
  @Render('users')
  getUsers() {
    return;
  }
}
