import { Policy } from './interfaces';
import policiesJson from '../policyData.json';
import fs from 'fs';
import { NotFoundException } from '@nestjs/common';

async function updatePolicy(clientId: string, policyId: string) {
  try {
    const filepath = 'policyData.json';
    const data = await JSON.parse(fs.readFileSync(filepath, 'utf8'));
    const policyIndex = data.policies.findIndex((x) => x.id === policyId);
    if (policyIndex === -1) {
      throw new NotFoundException(`Policy with Id: ${policyId} not found`);
    }
    data.policies[policyIndex].clientId = clientId;
    await fs.writeFileSync(filepath, JSON.stringify(data, null, 4));
    return data.policies[policyIndex];
  } catch (error) {
    throw new Error();
  }
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

export { updatePolicy };
