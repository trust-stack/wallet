import {Body, Divider, ListItem, Spinner, YStack} from "@truststack/ui";
import {Fragment} from "react";
import {useCredentials} from "./hooks";

export function CredentialsList(): JSX.Element {
  const {credentials, loading, noResults} = useCredentials();

  return (
    <YStack>
      {loading && <Spinner />}

      {noResults && <Body>No credentials found.</Body>}

      {credentials?.map((credential) => (
        <Fragment key={credential.id}>
          <ListItem>
            <ListItem.Container>
              <ListItem.Headline>{credential.name}</ListItem.Headline>
            </ListItem.Container>
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </YStack>
  );
}
