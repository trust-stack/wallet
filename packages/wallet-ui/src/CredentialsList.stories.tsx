import type {Meta, StoryObj} from "@storybook/react";
import {CredentialsList} from "./CredentialsList";

const meta = {
  component: CredentialsList,
  tags: ["autodocs"],
} satisfies Meta<typeof CredentialsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Populated: Story = {};
