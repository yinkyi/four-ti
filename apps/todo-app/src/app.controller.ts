import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly todoAppService: AppService) {}

  @Get()
  getHello(): string {
    return this.todoAppService.getHello();
  }
}
