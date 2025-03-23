import {yupResolver} from "@hookform/resolvers/yup";
import {Plus} from "@tamagui/lucide-icons";
import {
  BarcodeScanner,
  Body,
  Button,
  FormInput,
  FormProvider,
  XStack,
  YStack,
} from "@truststack/ui";
import {useAddCredential} from "@truststack/wallet-core";
import {useForm} from "react-hook-form";
import {InferType, object, string} from "yup";

export function CredentialForm() {
  const {addCredential, loading, error} = useAddCredential();

  const formMethods = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmit = (data: FormValues) => {
    addCredential({
      body: {
        name: data.name,
        raw: data.raw,
      },
    }).then(() => {
      console.log("success");
    });
  };

  const handleScan = (data: string) => {
    // Verify is a URL
    if (!data.startsWith("http")) {
      return;
    }

    fetch(data)
      .then((res) => res.json())
      .then((data) => {
        formMethods.setValue("raw", data);
      });
  };

  return (
    <FormProvider formMethods={formMethods}>
      <YStack gap={"$spacing.form_gap"}>
        <Body size="large">Scan QR Code</Body>

        {open && <BarcodeScanner width={"100%"} onScan={handleScan} />}

        <FormInput<FormValues> id="name" label="Credential Name" />

        <XStack justifyContent={"flex-end"}>
          <Button
            variant="tonal-success"
            disabled={!formMethods.formState.isValid}
            onPress={formMethods.handleSubmit(handleSubmit)}
          >
            <Button.Icon Icon={Plus} />
            <Button.Text>Add</Button.Text>
            <Button.Spinner />
          </Button>
        </XStack>
      </YStack>
    </FormProvider>
  );
}

const schema = object({
  name: string().required(),
  raw: object().required(),
});

type FormValues = InferType<typeof schema>;
