import {create, useStore} from "zustand";

export type CoreConfig = {
  readonly baseUrl?: string;
  readonly getBearerToken?: () => Promise<string>;
  readonly onError?: (error: Error) => void;
};

interface CoreConfigStore {
  config: CoreConfig;
  setConfig: (config: Partial<CoreConfig>) => void;
}

export const configStore = create<CoreConfigStore>((set) => ({
  config: {},
  setConfig: (config) => set({config}),
}));

export const useConfig = () => {
  const config = useStore(configStore, (state) => state);
  return config;
};

export const getConfig = () => {
  return configStore.getState().config;
};

export const setConfig = (config: Partial<CoreConfig>) => {
  configStore.getState().setConfig(config);
};
