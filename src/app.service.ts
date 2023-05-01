import { Injectable } from '@nestjs/common';
import { Client, Policy } from './interfaces';
import clientsJson from '../clientsData.json';
import policiesJson from '../policyData.json';
@Injectable()
export class AppService {
  getHello(): string {
    obtainClientJson(clientsJson);
    console.log('TEST');
    const allClients = obtainClientJson(clientsJson);
    const finalClient = findByIdOrName(false, 'Britney', allClients);
    console.log('FINAL: ', finalClient);
    return 'Hello World!';
  }
  getClient(): any {
    const allClients = obtainClientJson(clientsJson);
    const finalClient = findByIdOrName(true, 'Britney', allClients);
    return 'something';
  }
  getPolicy(): any {
    obtainPolicyJson(policiesJson);
    return 'something';
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
  const result = searchArray.find((x) => x[searchParam] === param);
  if (result) {
    return result;
  } else {
    return Error;
  }
}
