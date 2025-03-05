import type {Preview} from "@storybook/react";
import {TamaguiProvider, config} from "@truststack/ui";
import {WalletProvider} from "@truststack/wallet-core";
import {initialize, mswLoader} from "msw-storybook-addon";
import React from "react";

// Initialize msw
initialize({
  onUnhandledRequest: "bypass",
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <TamaguiProvider config={config} defaultTheme="light">
        <WalletProvider>
          <Story />
        </WalletProvider>
      </TamaguiProvider>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
