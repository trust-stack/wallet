import {useMutation, useQuery} from "@tanstack/react-query";
import {
  addWalletCredentialMutation,
  getWalletCredentialByIdOptions,
  getWalletCredentialsOptions,
} from "./client/@tanstack/react-query.gen";

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

export const useAddCredential = () => {
  const result = useMutation({
    ...addWalletCredentialMutation(),
  });

  return {
    addCredential: result.mutateAsync,
    loading: result.isPending,
    error: result.error,
  };
};

export const useCredential = (id: string) => {
  const {data, isLoading, error} = useQuery({
    ...getWalletCredentialByIdOptions({path: {id}}),
  });

  return {
    credential: data,
    loading: isLoading,
    error,
  };
};
