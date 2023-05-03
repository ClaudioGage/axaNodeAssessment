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
import { Role } from './auth/role.enum';
import { Roles } from './auth/roles.decorator';
import { Client, Policy, LinkPolicyPostDTO } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('client')
  @Roles(Role.Admin, Role.User)
  getClientByIdAndName(
    @Query('id') id?: string,
    @Query('name') name?: string,
  ): Client | HttpException {
    const searchParam = id ? id : name.toLowerCase();
    const containsId = id ? true : false;
    return this.appService.getClient(containsId, searchParam);
  }

  @Get('policies/:name')
  @Roles(Role.Admin)
  getPolicies(@Param('name') name): Policy[] | HttpException {
    console.log('policyId: ', name);
    return this.appService.getPolicies(name);
  }

  @Post('linkPolicy')
  @Roles(Role.Admin)
  linkPolicyByClient(
    @Body(new ValidationPipe()) linkPolicyDto: LinkPolicyPostDTO,
  ): Promise<Policy | HttpException> {
    return this.appService.linkPolicyAndClient(
      linkPolicyDto.clientId,
      linkPolicyDto.policyId,
    );
  }
}
