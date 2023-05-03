import { Client, Policy } from './interfaces';
import policiesJson from '../policyData.json';
import clientsJson from '../clientsData.json';
import fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';

function findUserRole(userId: string): string | boolean {
  const clientList = obtainClientJson();
  //check if the user exists in the JsonDB if so returns their role
  const foundClient = clientList.find((x) => x.id === userId);
  if (foundClient) {
    return foundClient.role;
  }
  return false;
}

async function updatePolicy(clientId: string, policyId: string) {
  try {
    const filepath = 'policyData.json';
    const data = await JSON.parse(fs.readFileSync(filepath, 'utf8'));
    const policyIndex = data.policies.findIndex((x) => x.id === policyId);
    data.policies[policyIndex].clientId = clientId;
    await fs.writeFileSync(filepath, JSON.stringify(data, null, 4));
    return data.policies[policyIndex];
  } catch (error) {
    throw new HttpException(
      'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
// the function returns a list of Policies but in the case the name of the client does not exist then it returns true
// and returns false in the case that there are no policies linked to the client
function obtainListPolicies(clientName: string): Policy[] | boolean | Error {
  try {
    const clientList = obtainClientJson();
    const clientSearch = findByIdOrName(false, clientName, clientList);
    if (clientSearch === false) {
      return false;
    }
    const listPolicies = obtainPolicyJson();
    const clientId = clientSearch.id;
    const filteredPolicies = listPolicies.filter(
      (x) => x.clientId === clientId,
    );
    console.log('filteredPolcies: ', filteredPolicies);
    if (filteredPolicies.length < 1) {
      return true;
    }
    return filteredPolicies;
  } catch (error) {
    console.log('Obtain Error: ', error);
    return new Error();
  }
}

function obtainClientJson(): Client[] {
  const clients = clientsJson;
  const parsedClients = JSON.parse(JSON.stringify(clients)).clients;
  return parsedClients;
}

function obtainPolicyJson(): Policy[] {
  const policies = policiesJson;
  const parsedPolicies = JSON.parse(JSON.stringify(policies)).policies;
  return parsedPolicies;
}

function findByIdOrName(id: boolean, param: string, searchArray: Array<any>) {
  const searchParam = id ? 'id' : 'name';
  const result = searchArray.find(
    (x) => x[searchParam].toLowerCase() === param,
  );
  console.log('findName: ', param);
  if (result) {
    return result;
  } else {
    return false;
  }
}

export {
  updatePolicy,
  obtainListPolicies,
  findByIdOrName,
  findUserRole,
  obtainClientJson,
  obtainPolicyJson,
};
