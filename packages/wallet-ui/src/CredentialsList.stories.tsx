import type {Meta, StoryObj} from "@storybook/react";
import {YStack} from "@truststack/ui";
import {delay, http, HttpResponse} from "msw";
import {CredentialsList} from "./CredentialsList";

const meta = {
  component: CredentialsList,
  decorators: [
    (Story) => (
      <YStack marginTop={20} margin={"auto"} maxWidth={240} width={"100%"}>
        <Story />
      </YStack>
    ),
  ],
} as Meta<typeof CredentialsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Populated: Story = {
  parameters: {
    msw: [
      http.get("/api/wallet/credentials", () => {
        const credentials = new Array(5).fill(null).map((_, index) => ({
          id: index.toString(),
          name: `Credential ${index + 1}`,
        }));

        return HttpResponse.json(credentials);
      }),
    ],
  },
};

export const Loading: Story = {
  parameters: {
    msw: [
      http.get("/api/wallet/credentials", async () => {
        await delay("infinite");
      }),
    ],
  },
};

export const NoResults: Story = {
  parameters: {
    msw: [
      http.get("/api/wallet/credentials", () => {
        return HttpResponse.json([]);
      }),
    ],
  },
};
