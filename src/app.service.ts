import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Client, Policy } from './interfaces';
import { updatePolicy, obtainListPolicies } from './helperFunctions';
import clientsJson from '../clientsData.json';
import policiesJson from '../policyData.json';
@Injectable()
export class AppService {
  getHello(): string {
    updatePolicy('12TEST', '7b624ed3-00d5-4c1b-9ab8-c265067ef58b');
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

  getPolicies(clientName: string): Policy[] | HttpException {
    const listPolicies = obtainListPolicies(clientName);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (listPolicies === true) {
      throw new NotFoundException(`Client with name: ${clientName} not found`);
    } else if (listPolicies === false) {
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
      const policies = obtainPolicyJson(policiesJson);
      findByIdOrName(true, policyId, policies);
      return await updatePolicy(clientId, policyId);
    } catch (error) {
      throw new NotFoundException(`Policy with Id: ${policyId} not found`);
    }
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
