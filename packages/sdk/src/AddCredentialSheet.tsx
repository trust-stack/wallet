import {Plus} from "@tamagui/lucide-icons";
import {
  BarcodeScanner,
  Fab,
  FabProps,
  Headline,
  Sheet,
  View,
  YStack,
} from "@truststack/ui";
import {useAddCredential} from "@truststack/wallet-core";
import {Fragment, useState} from "react";

export type AddCredentialSheetProps = Partial<FabProps>;

export function AddCredentialSheet({...props}: AddCredentialSheetProps) {
  const [open, setOpen] = useState(false);
  const {addCredential, loading, error} = useAddCredential();

  const handleScan = (data: string) => {
    // Verify is a URL
    if (!data.startsWith("http")) {
      return;
    }

    fetch(data)
      .then((res) => res.json())
      .then((data) => {
        addCredential({
          body: {
            name: "test",
            raw: data,
          },
        });
      });
  };
  return (
    <Fragment>
      <Fab
        onPress={() => setOpen(true)}
        size="medium"
        variant="primary"
        {...props}
      >
        <Fab.Icon Icon={Plus} />
      </Fab>
      <Sheet
        open={open}
        onOpenChange={setOpen}
        modal
        dismissOnOverlayPress
        snapPoints={[80]}
      >
        <Sheet.Overlay />
        <Sheet.Frame>
          <YStack padding={"$spacing.compact_margin"} gap={20}>
            <Headline size="small">Add Credential</Headline>

            <View margin={"auto"}>
              {open && (
                <BarcodeScanner
                  onScan={(data) => {
                    console.log("scan", data);
                  }}
                  onError={() => {}}
                />
              )}
            </View>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </Fragment>
  );
}
