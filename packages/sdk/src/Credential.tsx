import {Body, Card, dateToHumanReadable, Sheet, YStack} from "@truststack/ui";
import {WalletCredential} from "@truststack/wallet-core";
import {Fragment, useState} from "react";
import {CredentialRender} from "./CredentialRender";
import {VerificationStatus} from "./VerificationStatus";

export type CredentialProps = {
  readonly credential: WalletCredential;
};

export function Credential({credential}: CredentialProps) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Card
        maxWidth={400}
        minHeight={180}
        borderWidth={0}
        backgroundColor="$surface"
        density="-1"
        onPress={() => setOpen(true)}
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
      <Sheet open={open} onOpenChange={setOpen} modal>
        <Sheet.Overlay />
        <Sheet.Frame>
          <YStack padding="$spacing.compact_margin">
            <CredentialRender render={credential.render} />
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </Fragment>
  );
}
