import {Body, Card, dateToHumanReadable, YStack} from "@truststack/ui";
import {WalletCredential} from "@truststack/wallet-core";
import {VerificationStatus} from "./VerificationStatus";

type CredentialProps = {
  readonly credential: WalletCredential;
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
        <Card.Subheader>{"ACME"}</Card.Subheader>
      </Card.Header>

      <Card.Actions justifyContent="space-between" alignItems="flex-end">
        <VerificationStatus verified={true}>
          <VerificationStatus.Icon />
          <VerificationStatus.Text />
        </VerificationStatus>

        <YStack>
          <Body color="$onSurfaceVariant" size="small" textAlign="right">
            Expires: {dateToHumanReadable(new Date())}
          </Body>

          <Body color="$onSurfaceVariant" size="small" textAlign="right">
            Issued: {dateToHumanReadable(new Date())}
          </Body>
        </YStack>
      </Card.Actions>
    </Card>
  );
}
