import {Plus} from "@tamagui/lucide-icons";
import {
  Body,
  Button,
  Divider,
  Headline,
  Title,
  useFormContext,
  View,
  XStack,
  YStack,
} from "@truststack/ui";
import {WalletProvider} from "@truststack/wallet-core";
import {Controller} from "react-hook-form";
import {CredentialsListSelect} from "src/CredentialsListSelect";
import {array, InferType, object, string} from "yup";

export type PassportBuilderProps = {
  readonly children?: React.ReactNode;
};

export function PassportBuilder({children}: PassportBuilderProps) {
  const formMethods = useFormContext();

  return (
    <WalletProvider>
      <YStack
        padding="$spacing.exp_margin"
        borderRadius="$shape.corner_m"
        overflow="hidden"
        borderWidth={1}
        borderColor="$outline"
        gap={20}
      >
        <Headline size="small">Passport Builder</Headline>

        {children}

        <Divider />

        <View>
          <Title>Credentials</Title>
          <Body>What credentials do you want displayed in this passport?</Body>
        </View>

        <Controller<FormValues>
          control={formMethods.control}
          name="credentials"
          render={({field}) => (
            <CredentialsListSelect
              value={field.value as string[]}
              onChange={(v) => field.onChange(v)}
            />
          )}
        />

        <Divider />

        <XStack justifyContent="flex-end">
          <Button disabled={!formMethods.formState.isValid}>
            <Button.Icon Icon={Plus} />
            <Button.Text>Create</Button.Text>
          </Button>
        </XStack>
      </YStack>
    </WalletProvider>
  );
}

export const PassportSchema = object({
  credentials: array().of(string().required()).nullable().default([]),
});

type FormValues = InferType<typeof PassportSchema>;
