import {ScrollView, TopAppBar, View, YStack} from "@truststack/ui";
import {AddCredentialSheet} from "./AddCredentialSheet";
import {CredentialsList} from "./CredentialsList";

export function CredentialsScreen(): JSX.Element {
  return (
    <YStack
      position="relative"
      maxHeight="100%"
      maxWidth="100%"
      height={"100%"}
      width={"100%"}
      flex={0}
    >
      <TopAppBar size="small" backgroundColor="transparent">
        <TopAppBar.TopRail>
          <TopAppBar.SmallHeadline size="large">
            Credentials
          </TopAppBar.SmallHeadline>
        </TopAppBar.TopRail>
      </TopAppBar>

      <ScrollView
        showsVerticalScrollIndicator={false}
        px={"$spacing.compact_margin"}
      >
        <CredentialsList />
        <View height={100} />
      </ScrollView>

      <View
        position="absolute"
        bottom={"$spacing.compact_margin"}
        right={"$spacing.compact_margin"}
        zIndex={99999}
      >
        <AddCredentialSheet />
      </View>
    </YStack>
  );
}
