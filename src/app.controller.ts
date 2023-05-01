import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  test(): string {
    return this.appService.getHello();
  }

  @Get('client')
  getClientByIdAndName(
    @Query('id') id?: string,
    @Query('name') name?: string,
  ): string {
    console.log('id: ', id, ' name:', name);
    const searchParam = id ? id : name.toLowerCase();
    const containsId = id ? true : false;
    return this.appService.getClient(containsId, searchParam);
  }

  @Get('policy/:id')
  getPolicies(@Param('id') id): string {
    return this.appService.getHello();
  }

  @Post('linkPolicy')
  linkPolicyByClient(): string {
    return this.appService.getHello();
  }
}
