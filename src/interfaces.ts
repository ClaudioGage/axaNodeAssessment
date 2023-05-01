import { IsNotEmpty, IsString } from 'class-validator';
interface Client {
  id: string;
  name: string;
  email: string;
  role: string;
}
interface Policy {
  id: string;
  amountInsured: number;
  email: string;
  inceptionDate: Date;
  installmentPayment: boolean;
  clientId: string;
}
class LinkPolicyPostDTO {
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  policyId: string;
}

export { Client, Policy, LinkPolicyPostDTO };
