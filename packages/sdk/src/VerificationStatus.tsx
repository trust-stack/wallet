import {Check, XCircle} from "@tamagui/lucide-icons";
import {
  Body,
  createStyledContext,
  GetProps,
  Icon,
  styled,
  View,
  withStaticProperties,
  XStack,
} from "@truststack/ui";
import {useContext} from "react";

const VerificationStatusContext = createStyledContext({
  verified: true,
});

const Frame = styled(XStack, {
  context: VerificationStatusContext,
  gap: 12,
  alignItems: "center",
  variants: {
    verified: {
      true: {},
      false: {},
    },
  } as const,
});

const Text = styled(Body, {
  size: "large",
  context: VerificationStatusContext,
});

const TextHOC = Text.styleable((props, ref) => {
  const context = useContext(VerificationStatusContext.context);

  return (
    <Text ref={ref} {...props}>
      {context.verified ? "Verified" : "Unverified"}
    </Text>
  );
});

const VerificationIcon = () => {
  const context = useContext(VerificationStatusContext.context);

  if (context.verified) {
    return (
      <View borderRadius={100} backgroundColor={"$success"} padding={2}>
        <Icon Icon={Check} size={20} color={"$onSuccess"} />
      </View>
    );
  }
  return (
    <View borderRadius={100} backgroundColor={"$error"} padding={2}>
      <Icon Icon={XCircle} size={20} color={"$onError"} />
    </View>
  );
};

export const VerificationStatus = withStaticProperties(Frame, {
  Props: VerificationStatusContext.Provider,
  Text: TextHOC,
  Icon: VerificationIcon,
});

export type VerificationStatusProps = GetProps<typeof VerificationStatus>;
