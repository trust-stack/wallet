import {yupResolver} from "@hookform/resolvers/yup";
import {FormInput, FormProvider, Grid, Title} from "@truststack/ui";
import {useForm} from "react-hook-form";
import {date, InferType, number, object, string} from "yup";
import {PassportBuilder, PassportSchema} from "./PassportBuilder";

export function GrainPassportBuilder() {
  const formMethods = useForm<FormValues>({
    resolver: yupResolver(PassportSchema),
  });

  return (
    <FormProvider formMethods={formMethods}>
      <PassportBuilder>
        <Grid>
          <Grid.Item exp={12}>
            <Title>Batch Information</Title>
          </Grid.Item>
          <Grid.Item exp={4}>
            <FormInput<FormValues> id="harvest" label="Harvest Date" />
          </Grid.Item>

          <Grid.Item exp={4}>
            <FormInput<FormValues> id="commodity" label="Commodity" />
          </Grid.Item>

          <Grid.Item exp={4}>
            <FormInput<FormValues> id="quantity" label="Quantity (T)" />
          </Grid.Item>

          <Grid.Item exp={6}>
            <FormInput<FormValues> id="paddock" label="Farm" />
          </Grid.Item>

          <Grid.Item exp={6}>
            <FormInput<FormValues> id="paddock" label="Paddock" />
          </Grid.Item>
        </Grid>
      </PassportBuilder>
    </FormProvider>
  );
}

const schema = object({
  harvest: date().required(),
  paddock: string().required(),
  quantity: number().positive().required().positive(),
  commodity: string().required(),
}).concat(PassportSchema);

type FormValues = InferType<typeof schema>;
