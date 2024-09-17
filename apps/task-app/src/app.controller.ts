import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly taskAppService: AppService) {}

  @Get()
  getHello(): string {
    return this.taskAppService.getHello();
  }
}
