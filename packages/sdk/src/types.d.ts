import {config} from "@truststack/ui";

export type Conf = typeof config;

declare module "@truststack/ui" {
  interface TamaguiCustomConfig extends Conf {}
}
