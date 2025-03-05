import {getConfig} from "config";

export const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  let token: string | undefined;

  // Fetch config storage
  const config = getConfig();

  if (config.getBearerToken) {
    token = await config.getBearerToken();
  }

  const fetchUrl = config.baseUrl ? `${config.baseUrl}${input}` : input;

  console.log("fetch", fetchUrl);

  return fetch(fetchUrl, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${token}`,
    },
  })
    .catch((error) => {
      if (config.onError) {
        config.onError(error);
      }
      throw error;
    })
    .then((response) => response.json());
};
