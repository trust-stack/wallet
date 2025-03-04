import {Plus} from "@tamagui/lucide-icons";
import {Fab, TopAppBar, View, YStack} from "@truststack/ui";
import {CredentialsList} from "./CredentialsList";

export function CredentialsScreen(): JSX.Element {
  return (
    <YStack position="relative" width="100%" height="100%">
      <TopAppBar size="small">
        <TopAppBar.TopRail>
          <TopAppBar.SmallHeadline size="large">
            Credentials
          </TopAppBar.SmallHeadline>
        </TopAppBar.TopRail>
      </TopAppBar>

      <CredentialsList />
      <View
        position="absolute"
        bottom={"$spacing.compact_margin"}
        right={"$spacing.compact_margin"}
        zIndex={99999}
      >
        <Fab size="medium" variant="primary">
          <Fab.Icon Icon={Plus} />
        </Fab>
      </View>
    </YStack>
  );
}
