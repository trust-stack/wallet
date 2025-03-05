export type Credential = {
  readonly id: string;
  readonly name: string;
  readonly issuerName: string;
  readonly render?: string;
  readonly verified?: boolean;
  readonly issuedAt: Date;
  readonly expiresAt: Date;
};
