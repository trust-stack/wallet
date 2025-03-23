import type {Meta, StoryObj} from "@storybook/react";
import {YStack} from "@truststack/ui";
import {CredentialForm} from "./CredentialForm";

const meta = {
  component: CredentialForm,
  decorators: [
    (Story) => (
      <YStack marginTop={20} margin={"auto"} maxWidth={400} width={"100%"}>
        <Story />
      </YStack>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewport: "mobile2",
      defaultViewport: "mobile2",
    },
  },
} as Meta<typeof CredentialForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  parameters: {
    msw: {
      handlers: [],
    },
  },
};
