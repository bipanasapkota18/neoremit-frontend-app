import { toastFail } from "@neo/utility/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";
import TokenService, { NeoTokenDetails, TokenDetails } from "./service-token";

import { BroadcastChannel } from "broadcast-channel";

const logoutChannel = new BroadcastChannel("logout");
const loginChannel = new BroadcastChannel("login");

export interface LoginDetails {
  username: string;
  password: string;
}

type NeoUserTokenDetails = NeoTokenDetails;

export const authTokenKey = "authToken";
const authTokenDetails = "authTokenDetails";

const initLogout = () => {
  return NeoHttpClient.get(api.auth.logout);
};

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(initLogout, {
    onSuccess: () => {
      TokenService.clearToken();
      logoutChannel.postMessage("Logout");
      queryClient.clear();
      queryClient.setQueryData(authTokenKey, () => false);
      navigate("/login", { replace: true });
    }
  });
};

const initLogin = (loginData: LoginDetails) => {
  return NeoHttpClient.post<NeoResponse>(api.auth.login, loginData);
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(initLogin, {
    onSuccess: response => {
      loginChannel.postMessage("Login");
      const tokens = {
        access_token: response?.data?.data?.accessToken,
        refresh_token: response?.data?.data?.refreshToken
      };
      TokenService.setToken(tokens);
      queryClient.setQueryData(authTokenKey, () => true);
      navigate("/", { replace: true });
    },
    onError: error => {
      const loginErr = error as AxiosError<{ message: string; error: string }>;
      toastFail(
        loginErr.response?.data?.message ??
          loginErr.response?.data?.error ??
          "Login failed !"
      );
    }
  });
};

const initRefreshToken = async () => {
  try {
    const response = await NeoHttpClient.post<TokenDetails>(
      api.auth.refreshToken,
      {
        params: {
          refreshToken: TokenService.getToken()?.refresh_token
        },
        headers: {
          Authorization: ""
        }
      }
    );
    const tokens = {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token
    };
    TokenService.setToken(tokens);
    return true;
  } catch (error) {
    return false;
  }
};

const checkAuthentication = async () => {
  if (TokenService.isAuthenticated()) {
    const tokenInfo = TokenService.getTokenDetails();

    if (tokenInfo && tokenInfo.exp * 1000 < Date.now() + 5 * 60 * 1000) {
      return initRefreshToken();
    }
    return Promise.resolve(true);
  } else if (TokenService.getToken()?.refresh_token) {
    return initRefreshToken();
  }
  return Promise.resolve(null);
};

/**
 * Check if user is authenticated
 * @returns boolean
 */
const useAuthentication = () => {
  const queryClient = useQueryClient();

  return useQuery(authTokenKey, checkAuthentication, {
    onSuccess: () => {
      const tokenDetails = TokenService.getTokenDetails();

      if (tokenDetails) {
        queryClient.setQueryData<NeoUserTokenDetails>(authTokenDetails, {
          ...tokenDetails
        });
      }
    }
  });
};

const useLoginTokenDetailQuery = () => {
  return useQuery<unknown, unknown, NeoUserTokenDetails>(authTokenDetails);
};

export {
  initLogout,
  useAuthentication,
  useLoginMutation,
  useLoginTokenDetailQuery,
  useLogoutMutation
};
