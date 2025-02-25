import {Body, ListItem, Spinner, YStack} from "@truststack/ui";
import {useCredentials} from "./hooks";

export function CredentialsList() {
  const {credentials, loading, noResults} = useCredentials();

  return (
    <YStack>
      {loading && <Spinner />}

      {noResults && <Body>No credentials found.</Body>}

      {credentials?.map((credential) => (
        <ListItem key={credential.id}>
          <ListItem.Container>
            <ListItem.Headline>{credential.name}</ListItem.Headline>
          </ListItem.Container>
        </ListItem>
      ))}
    </YStack>
  );
}
