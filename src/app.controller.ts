import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Client, Policy, LinkPolicyPostDTO } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('client')
  getClientByIdAndName(
    @Query('id') id?: string,
    @Query('name') name?: string,
  ): Client | HttpException {
    const searchParam = id ? id : name.toLowerCase();
    const containsId = id ? true : false;
    return this.appService.getClient(containsId, searchParam);
  }

  @Get('policies/:name')
  getPolicies(@Param('name') name): Policy[] | HttpException {
    console.log('policyId: ', name);
    return this.appService.getPolicies(name);
  }

  @Post('linkPolicy')
  linkPolicyByClient(
    @Body(new ValidationPipe()) linkPolicyDto: LinkPolicyPostDTO,
  ): Promise<Policy | HttpException> {
    return this.appService.linkPolicyAndClient(
      linkPolicyDto.clientId,
      linkPolicyDto.policyId,
    );
  }
}
