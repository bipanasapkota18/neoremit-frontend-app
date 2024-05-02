import { toastFail } from "@neo/utility/Toast";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { api } from "../service-api";
import { NeoHttpClient } from "../service-axios";
import { NeoResponse } from "./../service-api";

// interface NeoResponse {
//   id: string;
//   name: string;
//   isRequired: boolean;
//   hide: boolean;
//   allowUpdate: boolean;
// }

const getFields = () => {
  return NeoHttpClient.get<NeoResponse>(api.masterData.kyc.getAll);
};

const useGetFields = () => {
  return useMutation(getFields, {
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const countryFields = (countryId: string) => {
  return NeoHttpClient.get<NeoResponse>(
    api.masterData.kyc.countryField?.replace("{countryId}", countryId)
  );
};

const useCountryFields = () => {
  return useMutation(countryFields, {
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

export { useCountryFields, useGetFields };
