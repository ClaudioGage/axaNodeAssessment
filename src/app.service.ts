import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Client, Policy } from './interfaces';
import { updatePolicy } from './helperFunctions';
import clientsJson from '../clientsData.json';
import policiesJson from '../policyData.json';
@Injectable()
export class AppService {
  getHello(): string {
    updatePolicy('7b624ed3-00d5-4c1b-9ab8-c265067ef58b', '12TEST');
    // obtainClientJson(clientsJson);
    // console.log('TEST');
    // const allClients = obtainClientJson(clientsJson);
    // const finalClient = findByIdOrName(false, 'Britney', allClients);
    // console.log('FINAL: ', finalClient);
    return 'Hello World!';
  }
  getClient(id: boolean, searchParam: string): Client | NotFoundException {
    try {
      const allClients = obtainClientJson(clientsJson);
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
  getPolicy(policyId: string): Policy | HttpException {
    try {
      const policies = obtainPolicyJson(policiesJson);
      const finalPolicy = findByIdOrName(true, policyId, policies);
      return finalPolicy;
    } catch (error) {
      throw new NotFoundException(`Policy with Id: ${policyId} not found`);
    }
  }
  linkPolicyAndClient(): any {
    return 'something';
  }
}
function obtainClientJson(clientJson): Client[] {
  const clients: JSON = clientJson;
  const parsedClients = JSON.parse(JSON.stringify(clients)).clients;
  return parsedClients;
}

function obtainPolicyJson(policyJson): Policy[] {
  const policies: JSON = policyJson;
  const parsedPolicies = JSON.parse(JSON.stringify(policies)).policies;
  return parsedPolicies;
}

function findByIdOrName(id: boolean, param: string, searchArray: Array<any>) {
  const searchParam = id ? 'id' : 'name';
  const result = searchArray.find(
    (x) => x[searchParam].toLowerCase() === param,
  );
  if (result) {
    return result;
  } else {
    throw Error;
  }
}
