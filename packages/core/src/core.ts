import useSWR from "swr";
import {Credential} from "types";

export type PaginationProps = {
  offset?: number;
  limit?: number;
};

export const useCredentials = ({
  offset = 0,
  limit = 10,
}: PaginationProps = {}) => {
  const {data, isLoading, error} = useSWR<Credential[]>(
    `/api/wallet/credentials?offset=${offset}&limit=${limit}`
  );

  return {
    credentials: data,
    loading: isLoading,
    error,
    noResults: data?.length === 0 && !isLoading,
  };
};

export const useCredential = (credentialId: string) => {
  const {data, isLoading, error} = useSWR<Credential>(
    `/api/wallet/credentials/${credentialId}`
  );

  return {
    credential: data,
    loading: isLoading,
    error,
  };
};
