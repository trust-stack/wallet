import {Meta, StoryObj} from "@storybook/react";
import {http, HttpResponse} from "msw";
import {ngr} from "../__mocks__/render";
import {GrainPassportBuilder} from "./GrainPassportBuilder";

export default {
  component: GrainPassportBuilder,
  title: "GrainPassportBuilder",
} as Meta<typeof GrainPassportBuilder>;

type Story = StoryObj<typeof GrainPassportBuilder>;

export const Default: Story = {
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
                id: "go",
                name: "Guarantee of Origin",
                issuerName: "Land Titles",
                verified: true,
                issuedAt: new Date("2024-06-23"),
                expiresAt: new Date("2026-06-23"),
                render: ngr,
              },
              {
                id: "cibo",
                name: "US EPA Assessment",
                issuerName: "Land Titles",
                verified: true,
                issuedAt: new Date("2024-06-23"),
                expiresAt: new Date("2026-06-23"),
                render: ngr,
              },
            ],
          });
        }),
      ],
    },
  },
};
