import type {StorybookConfig} from "@storybook/react-vite";
import {tamaguiPlugin} from "@tamagui/vite-plugin";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-react-native-web",
      options: {
        modulesToTranspile: [
          "expo-linking",
          "expo-constants",
          "expo-modules-core",
          "expo-document-picker",
          "expo-av",
          "expo-asset",
          "expo-document-picker",
        ],
      },
    },
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    const {mergeConfig} = await import("vite");
    return mergeConfig(config, {
      resolve: {
        alias: {
          ...config.resolve?.alias,
          "*.svg": "*.svg?react",
          "react-native$": require.resolve("react-native-web"),
        },
      },
      plugins: [
        tamaguiPlugin({
          config: "../src/tamagui.config.ts",
          components: ["tamagui", "@truststack/ui"],
          importsWhitelist: ["constants.js", "colors.js"],
          logTimings: true,
          disableExtraction: true,
          platform: "web",
        }),
        svgr({
          svgrOptions: {
            icon: true,
          },
          include: "../**/*.svg",
        }),
      ],
    });
  },
};
export default config;
