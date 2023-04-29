import { Injectable } from '@nestjs/common';
import { Client, Policy } from './interfaces';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
async function obtainClientJson(clientJson: JSON) {
  const clients: JSON = clientJson;
}

async function obtainPolicyJson(policyJson: JSON) {
  const clients: JSON = policyJson;
}
