import {View, ViewProps} from "@truststack/ui";

export type CredentialRenderProps = {
  readonly render: string;
} & ViewProps;

export function CredentialRender({render, ...props}: CredentialRenderProps) {
  return (
    <View borderRadius={"$shape.corner_m"} overflow={"hidden"} {...props}>
      <View dangerouslySetInnerHTML={{__html: render}} />
    </View>
  );
}
