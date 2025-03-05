import type {Meta, StoryObj} from "@storybook/react";
import {View} from "@truststack/ui";
import {CredentialsList} from "./CredentialsList";
import {Populated as PopulatedList} from "./CredentialsList.stories";
import {CredentialsScreen} from "./CredentialsScreen";

const meta = {
  component: CredentialsScreen,
  decorators: [
    (Story) => (
      <View style={{maxHeight: "100vh", maxWidth: "100vw"}}>
        <Story />
      </View>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile2",
    },
  },
} as Meta<typeof CredentialsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Populated: Story = {
  parameters: {
    msw: {
      handlers: [...PopulatedList.parameters?.msw?.handlers],
    },
  },
};
