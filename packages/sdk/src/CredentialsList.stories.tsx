import type {Meta, StoryObj} from "@storybook/react";
import {YStack} from "@truststack/ui";
import {delay, http, HttpResponse} from "msw";
import {CredentialsList} from "./CredentialsList";
import {ngr} from "./__mocks__/render";

const meta = {
  component: CredentialsList,
  decorators: [
    (Story) => (
      <YStack marginTop={20} margin={"auto"} maxWidth={400} width={"100%"}>
        <Story />
      </YStack>
    ),
  ],
} as Meta<typeof CredentialsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Populated: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/wallet/credentials", () => {
          return HttpResponse.json({
            credentials: [
              {
                id: "ngr",
                name: "NGR Registration",
                issuerName: "National Grower Register",
                verified: true,
                issuedAt: new Date("2024-06-23"),
                expiresAt: new Date("2026-06-23"),
                render: ngr,
              },
              {
                id: "gurantee-of-origin",
                name: "Gurantee of Origin",
                issuerName: "Land Titles",
                verified: true,
                issuedAt: new Date("2024-06-30"),
                expiresAt: new Date("2029-06-30"),
              },
              {
                id: "us-epa",
                name: "US EPA Assessment",
                issuerName: "CIBO Labs",
                verified: true,
                issuedAt: new Date("2024-06-30"),
                expiresAt: new Date("2029-06-30"),
              },
              {
                id: "emissions-profile",
                name: "Emissions Profile",
                issuerName: "AIA Carbon Calculator",
                verified: true,
                issuedAt: new Date("2024-06-30"),
                expiresAt: new Date("2029-06-30"),
              },
            ],
          });
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/wallet/credentials", async () => {
          await delay("infinite");
        }),
      ],
    },
  },
};

export const NoResults: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("/wallet/credentials", () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },
};
