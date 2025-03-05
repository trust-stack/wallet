import {createClient} from "@hey-api/client-fetch";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {CoreConfig, useConfig} from "config";
import {useEffect} from "react";

export type WalletProviderProps = {
  readonly children: React.ReactNode;
  readonly config?: CoreConfig;
};

// hey-api client
const client = createClient({});

// react-query client
const queryClient = new QueryClient();

export function WalletProvider({
  children,
  config: defaultConfig,
}: WalletProviderProps) {
  const {setConfig, config} = useConfig();

  // useEffect(() => {
  //   setConfig(defaultConfig);
  // }, [defaultConfig, setConfig]);

  useEffect(() => {
    client.setConfig({
      baseUrl: config?.baseUrl,
    });

    client.interceptors.request.use(async (request) => {
      const token = await config?.getBearerToken();
      request.headers.set("Authorization", `Bearer ${token}`);
      return request;
    });
  }, [config]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
