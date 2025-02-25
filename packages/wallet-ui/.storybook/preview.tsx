import type {Preview} from "@storybook/react";
import {TamaguiProvider, config} from "@truststack/ui";
import {initialize, mswLoader} from "msw-storybook-addon";
import React from "react";
import {SWRConfig} from "swr";

// Initialize msw
initialize();

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
        <SWRConfig
          value={{
            dedupingInterval: 0,
            provider: () => new Map(),
            revalidateOnMount: true,
            revalidateOnFocus: true,
          }}
        >
          <Story />
        </SWRConfig>
      </TamaguiProvider>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
