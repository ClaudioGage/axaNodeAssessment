import { Policy } from './interfaces';
import policiesJson from '../policyData.json';
import fs from 'fs';

async function updatePolicy(clientId: string, policyId: string) {
  try {
    const filepath = '../policyData.json';
    const data = await JSON.parse(fs.readFileSync(filepath, 'utf8'));
    //find index and modify policy if not return 404
    //data[someKey] = 'newValue';
    await fs.writeFileSync(filepath, JSON.stringify(data, null, 4));
  } catch (error) {}
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
