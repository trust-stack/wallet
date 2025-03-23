import {Checkbox, Divider, ListItem, Spinner, YStack} from "@truststack/ui";
import {useCredentials} from "@truststack/wallet-core";
import {Fragment} from "react";

export type CredentialsListSelectProps = {
  readonly value: string[];
  readonly onChange: (v: string[]) => void;
};

export function CredentialsListSelect({
  value = [],
  onChange,
}: CredentialsListSelectProps) {
  const {credentials, loading} = useCredentials();

  console.log(value);

  const handleSelect = (credential: string) => {
    if (value.includes(credential)) {
      onChange(value.filter((id) => id !== credential));
    } else {
      onChange([...value, credential]);
    }
  };

  if (loading) return <Spinner margin="auto" />;

  return (
    <YStack
      borderRadius={"$shape.corner_m"}
      overflow="hidden"
      borderWidth={0.5}
      borderColor="$outline"
    >
      {credentials?.map((credential, index) => (
        <Fragment>
          <ListItem key={credential.id}>
            <ListItem.Container>
              <ListItem.Headline>{credential.name}</ListItem.Headline>
            </ListItem.Container>
            <ListItem.TrailingItem>
              <Checkbox
                checked={value?.includes(credential.id)}
                onChange={() => handleSelect(credential.id)}
              />
            </ListItem.TrailingItem>
          </ListItem>
          {index !== credentials.length - 1 && <Divider />}
        </Fragment>
      ))}
    </YStack>
  );
}
