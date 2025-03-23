import {Body, Spinner, YStack} from "@truststack/ui";
import {useCredentials} from "@truststack/wallet-core";
import {Credential} from "./Credential";

export function CredentialsList(): JSX.Element {
  const {credentials, loading, noResults} = useCredentials();

  return (
    <YStack gap={12}>
      {loading && <Spinner />}

      {noResults && <Body>No credentials found.</Body>}

      {credentials?.map((credential) => (
        <Credential key={credential.id} credential={credential} />
      ))}
    </YStack>
  );
}
