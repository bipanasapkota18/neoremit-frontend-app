import { toastFail } from "@neo/utility/Toast";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";

interface IEmailVerification {
  email: string;
}
interface IOTPVerification {
  email: string;
  otpCode: string;
  otpFor: string;
}

interface IResendOTP {
  email: string;
  otpFor: string;
}
export interface ISetPassword {
  email: string;
  newPassword: string;
  changePasswordFor: string;
}

export interface ISetPasswordFirst {
  email: string | null;
  newPassword: string;
  confirmPassword: string;
}

const emailVerification = (data: IEmailVerification) => {
  return NeoHttpClient.post<NeoResponse>(api.users.email, data);
};

const useEmailVerification = () => {
  return useMutation(emailVerification, {
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};

const verifyOTP = (data: IOTPVerification) => {
  return NeoHttpClient.post<NeoResponse<IOTPVerification>>(api.users.otp, data);
};
const useVerifyOTP = () => {
  return useMutation(verifyOTP, {
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};
const resendOTP = (data: IResendOTP) => {
  return NeoHttpClient.post<NeoResponse<IResendOTP>>(api.users.resendOtp, data);
};
const useResendOTP = () => {
  return useMutation(resendOTP, {
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};
const resetPassword = (data: ISetPassword) => {
  return NeoHttpClient.post<NeoResponse<ISetPassword>>(
    api.users.changePassword,
    data
  );
};
const useResetPassword = () => {
  return useMutation(resetPassword, {
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};

const setPassword = (data: ISetPasswordFirst) => {
  return NeoHttpClient.post<NeoResponse>(api.users.setPasssword, data);
};

const useSetPassword = () => {
  return useMutation(setPassword, {
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};

export {
  useEmailVerification,
  useResendOTP,
  useResetPassword,
  useSetPassword,
  useVerifyOTP
};
