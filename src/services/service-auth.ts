import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { AxiosError } from "axios";
import { BroadcastChannel } from "broadcast-channel";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";
import TokenService, { NeoTokenDetails } from "./service-token";
const logoutChannel = new BroadcastChannel("logout");
const loginChannel = new BroadcastChannel("login");
export interface LoginDetails {
  username: string | null;
  password: string;
}
export interface NeoToken {
  userDetails: UserDetails;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface UserDetails {
  id: number;
  username: string;
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
    onSuccess: success => {
      TokenService.clearToken();
      logoutChannel.postMessage("Logout");
      queryClient.clear();
      queryClient.setQueryData(authTokenKey, () => false);
      toastSuccess(success?.data?.message ?? "Logout Successful");
      navigate("/login", { replace: true });
    },
    onError: error => {
      const logoutErr = error as AxiosError<{ message: string }>;
      toastFail(logoutErr.response?.data?.message ?? "Logout failed !");
    }
  });
};

const initLogin = (loginData: LoginDetails) => {
  return NeoHttpClient.post<NeoResponse<NeoToken>>(api.auth.login, {
    ...loginData,
    loginFrom: "INTERNAL"
  });
};

const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation(initLogin, {
    onSuccess: response => {
      loginChannel.postMessage("Login");
      const tokens = {
        accessToken: response?.data?.data?.accessToken,
        refreshToken: response?.data?.data?.refreshToken
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
    const response = await NeoHttpClient.post<NeoResponse<NeoToken>>(
      api.auth.refreshToken,
      {
        refreshToken: TokenService.getToken()?.refreshToken
      }
    );
    const tokens = {
      accessToken: response?.data?.data?.accessToken,
      refreshToken: response?.data?.data?.refreshToken
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
  } else if (TokenService.getToken()?.refreshToken) {
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
