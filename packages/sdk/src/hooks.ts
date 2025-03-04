import useSWR from "swr";
import {Credential} from "types";
import {fetcher} from "./fetch";

type PaginationProps = {
  offset?: number;
  limit?: number;
};

export const useCredentials = ({
  offset = 0,
  limit = 10,
}: PaginationProps = {}) => {
  const {data, isLoading, error} = useSWR<Credential[]>(
    `/api/wallet/credentials?offset=${offset}&limit=${limit}`,
    fetcher
  );

  return {
    credentials: data,
    loading: isLoading,
    error,
    noResults: data?.length === 0 && !isLoading,
  };
};
