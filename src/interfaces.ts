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

export { Client, Policy };
