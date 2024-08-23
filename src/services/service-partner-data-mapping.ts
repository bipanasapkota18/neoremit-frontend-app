import NeoToast from "@neo/utility/Toast/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";
export interface ICountryMappingResponse {
  id: number | null;
  iso2: string;
  iso3: string;
  countryCode: string;
  partnerCode: string;
  countryName: string;
  partnerCountryName: string;
  partnerCountryCode: string;
}
export interface ICountryMappingRequest {
  id?: number | null;
  iso2: string;
  iso3: string;
  partnerCountryName: string;
  partnerCountryCode: string;
}

const getAllPartnerData = (partnerCode: string | null) => () => {
  return NeoHttpClient.get<NeoResponse<ICountryMappingResponse[]>>(
    api.partner_data_mapping.getPartnerCountry.replace(
      "{partnerCode}",
      partnerCode + ""
    )
  );
};
const useGetAllPartnerData = (partnerCode: string | null) => {
  return useQuery(
    [api.partner_data_mapping.getPartnerCountry, partnerCode],
    getAllPartnerData(partnerCode),

    {
      select: data => data?.data?.data,
      enabled: !!partnerCode,
      onError: (error: AxiosError<{ message: string }>) => {
        NeoToast({
          type: "error",
          message: error?.response?.data?.message ?? error?.message
        });
      }
    }
  );
};

const saveCountryMapping = (data: ICountryMappingRequest) => {
  return NeoHttpClient.post<NeoResponse>(
    api.partner_data_mapping.saveCountryMapping,
    data
  );
};
const useSaveCountryMapping = () => {
  const queryClient = useQueryClient();
  return useMutation(saveCountryMapping, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.partner_data_mapping.getPartnerCountry);
      NeoToast({
        type: "success",
        message: success?.data?.message
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};

const getPartnerCountryDataById = (id: number | null) => () => {
  return NeoHttpClient.get<NeoResponse<ICountryMappingResponse>>(
    api.partner_data_mapping.getCountry.replace("{id}", id + "")
  );
};
const useGetPartnerCountryDataById = (id: number | null) => {
  return useQuery(
    [api.partner_data_mapping.getCountry, id],
    getPartnerCountryDataById(id),
    {
      enabled: !!id,
      select: data => data?.data?.data,
      onError: (error: AxiosError<{ message: string }>) => {
        NeoToast({
          type: "error",
          message: error?.response?.data?.message ?? error?.message
        });
      }
    }
  );
};

const getAllPartnerCountries = () => {
  return NeoHttpClient.get<NeoResponse<ICountryMappingResponse[]>>(
    api.partner_data_mapping.getAllPartnerCountries
  );
};
const useGetAllPartnerCountries = () => {
  return useQuery(
    api.partner_data_mapping.getAllPartnerCountries,
    getAllPartnerCountries,
    {
      select: data => data?.data?.data,
      onError: (error: AxiosError<{ message: string }>) => {
        NeoToast({
          type: "error",
          message: error?.response?.data?.message ?? error?.message
        });
      }
    }
  );
};

//State Mapping
const getPartnerStateData =
  (countryCode: string | null, partnerCode: string | null) => () => {
    return NeoHttpClient.get<NeoResponse<ICountryMappingResponse[]>>(
      api.partner_state_mapping.getPartnerState
        .replace("{countryCode}", countryCode + "")
        .replace("{partnerCode}", partnerCode + "")
    );
  };
const useGetPartnerStateData = (
  countryCode: string | null,
  partnerCode: string | null
) => {
  return useQuery(
    [api.partner_state_mapping.getPartnerState, countryCode, partnerCode],
    getPartnerStateData(countryCode, partnerCode),
    {
      select: data => data?.data?.data,
      enabled: !!countryCode && !!partnerCode,
      onError: (error: AxiosError<{ message: string }>) => {
        NeoToast({
          type: "error",
          message: error?.response?.data?.message ?? error?.message
        });
      }
    }
  );
};
export {
  useGetAllPartnerCountries,
  useGetAllPartnerData,
  useGetPartnerCountryDataById,
  useGetPartnerStateData,
  useSaveCountryMapping
};
