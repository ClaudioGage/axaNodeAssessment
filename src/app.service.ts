import { Injectable } from '@nestjs/common';
import { Client, Policy } from './interfaces';
import clientsJson from '../clientsData.json';
import policiesJson from '../policyData.json';
@Injectable()
export class AppService {
  getHello(): string {
    obtainClientJson(clientsJson);
    console.log('TEST');
    return 'Hello World!';
  }
  getClient(): any {
    obtainClientJson(clientsJson);
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
