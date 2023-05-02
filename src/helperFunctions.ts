import { Client, Policy } from './interfaces';
import policiesJson from '../policyData.json';
import clientsJson from '../clientsData.json';
import fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';

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
// need to work on another implementation too throw diferent erros in case of that but the service.app has that logic/responsibility at the time.
function obtainListPolicies(clientName: string): Policy[] | boolean | Error {
  try {
    const clientList = obtainClientJson(clientsJson);
    const clientSearch = findByIdOrName(false, clientName, clientList);
    if (clientSearch === false) {
      return false;
    }
    const listPolicies = obtainPolicyJson(policiesJson);
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
  console.log('findName: ', param);
  if (result) {
    return result;
  } else {
    return false;
  }
}

export { updatePolicy, obtainListPolicies, findByIdOrName };
