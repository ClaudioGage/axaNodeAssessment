import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Client, Policy } from './interfaces';
import {
  updatePolicy,
  obtainListPolicies,
  obtainClientJson,
  obtainPolicyJson,
  findByIdOrName,
} from './helperFunctions';
@Injectable()
export class AppService {
  getHello(): string {
    return 'TEST Hello World!';
  }

  getClient(id: boolean, searchParam: string): Client | NotFoundException {
    try {
      const allClients = obtainClientJson();
      const finalClient = findByIdOrName(id, searchParam, allClients);
      return finalClient;
    } catch (error) {
      throw new NotFoundException(
        `Client: ${
          searchParam[0].toUpperCase() + searchParam.slice(1)
        } not found`,
      );
    }
  }

  getPolicies(clientName: string): Policy[] | HttpException {
    const listPolicies = obtainListPolicies(clientName);
    if (listPolicies === true) {
      throw new NotFoundException(`Client with name: ${clientName} not found`);
    } else if (!listPolicies) {
      throw new NotFoundException(
        `Client with name: ${clientName} does not have any policies linked`,
      );
    }
    return listPolicies as Policy[];
  }

  async linkPolicyAndClient(
    clientId,
    policyId,
  ): Promise<Policy | HttpException> {
    try {
      const policies = obtainPolicyJson();
      findByIdOrName(true, policyId, policies);
      return await updatePolicy(clientId, policyId);
    } catch (error) {
      throw new NotFoundException(`Policy with Id: ${policyId} not found`);
    }
  }
}
