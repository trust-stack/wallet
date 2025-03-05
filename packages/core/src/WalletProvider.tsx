import {CoreConfig, useConfig} from "config";
import {fetcher} from "fetch";
import {createContext, useContext, useEffect} from "react";
import {SWRConfig} from "swr";

const context = createContext<CoreConfig | undefined>(undefined);

export type WalletProviderProps = {
  readonly children: React.ReactNode;
  readonly config?: CoreConfig;
};

export function WalletProvider({
  children,
  config: defaultConfig,
}: WalletProviderProps) {
  const {setConfig} = useConfig();

  useEffect(() => {
    setConfig(defaultConfig);
  }, [defaultConfig, setConfig]);

  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
}

export function useCoreConfig() {
  const config = useContext(context);
  if (!config) {
    throw new Error("CoreConfig not found");
  }
  return config;
}
