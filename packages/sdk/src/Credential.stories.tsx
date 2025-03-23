import {Meta, StoryObj} from "@storybook/react";
import {Credential} from "./Credential";

export default {
  title: "Credential",
  component: Credential,
} as Meta<typeof Credential>;

type Story = StoryObj<typeof Credential>;

export const Default: Story = {
  args: {
    credential: {
      id: "1",
      name: "Verifiable Credential",
      context: [],
      issuanceDate: new Date().toISOString(),
      expirationDate: new Date().toISOString(),
      raw: {},
      render: "",
    },
  },
};
