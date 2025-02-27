import type {Meta, StoryObj} from "@storybook/react";
import {YStack} from "@truststack/ui";
import {CredentialsList} from "./CredentialsList";
import {Populated as PopulatedList} from "./CredentialsList.stories";
import {CredentialsScreen} from "./CredentialsScreen";

const meta = {
  component: CredentialsScreen,
  decorators: [
    (Story) => (
      <YStack marginTop={20} margin={"auto"} width={400} height={400}>
        <Story />
      </YStack>
    ),
  ],
} as Meta<typeof CredentialsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Populated: Story = {
  parameters: {
    msw: [...PopulatedList.parameters?.msw],
  },
};
