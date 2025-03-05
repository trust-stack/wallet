import {Body, Card, dateToHumanReadable, YStack} from "@truststack/ui";
import {Credential as TCredential} from "@truststack/wallet-core";
import {VerificationStatus} from "./VerificationStatus";

type CredentialProps = {
  readonly credential: TCredential;
};

export function Credential({credential}: CredentialProps) {
  return (
    <Card
      maxWidth={400}
      minHeight={180}
      borderWidth={0}
      backgroundColor="$surface"
      density="-1"
    >
      <Card.Header>
        <Card.Headline>{credential.name}</Card.Headline>
        <Card.Subheader>{credential.issuerName}</Card.Subheader>
      </Card.Header>

      <Card.Actions justifyContent="space-between" alignItems="flex-end">
        <VerificationStatus verified={credential.verified}>
          <VerificationStatus.Icon />
          <VerificationStatus.Text />
        </VerificationStatus>

        <YStack>
          <Body color="$onSurfaceVariant" size="small" textAlign="right">
            Expires: {dateToHumanReadable(credential.expiresAt)}
          </Body>

          <Body color="$onSurfaceVariant" size="small" textAlign="right">
            Issued: {dateToHumanReadable(credential.issuedAt)}
          </Body>
        </YStack>
      </Card.Actions>
    </Card>
  );
}
