import { Button, ChakraProvider, HStack, Text } from "@chakra-ui/react";
import { api } from "@neo/services/service-api";
import { authTokenKey } from "@neo/services/service-auth";
import TokenService from "@neo/services/service-token";
import { globalStyles, theme } from "@neo/theme";
import { AxiosError } from "axios";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";

import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { toastFail } from "./utility/Toast";

const ErrorFallback = () => {
  return (
    <HStack alignItems="center" justifyContent="center" role="alert">
      <Text>Ooops, something went wrong :( </Text>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </HStack>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 30 * 1000
    }
  },
  queryCache: new QueryCache({
    onError: async error => {
      const err = error as AxiosError;
      if (
        (err.request?.status === 401 || err.request?.status === 500) &&
        err.config?.url?.includes(api.auth.refreshToken)
      ) {
        queryClient.setQueryData(authTokenKey, () => false);
        setTimeout(() => {
          TokenService.clearToken();
          queryClient.clear();
          toastFail("Session Expired! Please login again!");
        }, 500);
      }
    }
  })
});

const Provider = ({ children }: IProvider) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Toaster position="bottom-right" />
            <HelmetProvider>{children}</HelmetProvider>

            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
          {globalStyles()}
        </ChakraProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

interface IProvider {
  children: React.ReactNode;
}

export default Provider;
