import {useQuery} from "@tanstack/react-query";
import {getWalletCredentialsOptions} from "client/@tanstack/react-query.gen";

export type PaginationProps = {
  page?: number;
  limit?: number;
};

export const useCredentials = ({
  page = 0,
  limit = 10,
}: PaginationProps = {}) => {
  const {data, isLoading, error} = useQuery({
    ...getWalletCredentialsOptions({
      query: {
        page,
        limit,
      },
    }),
  });

  const credentials = data?.credentials;

  return {
    credentials,
    loading: isLoading,
    error,
    noResults: credentials?.length === 0 && !isLoading,
  };
};
