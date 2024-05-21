import NeoToast from "@neo/utility/Toast/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient, toFormData } from "../service-axios";
import { IPageParams } from "./master-data-common-interface";
export interface ICountryResponse {
  totalItems: number;
  countriesList: CountriesList[];
}
export interface CountriesList {
  id: number;
  name: string;
  code: string;
  shortName: string;
  phoneCode: string;
  isoNumber: string;
  currency: Currency;
  canReceive: boolean;
  canSend: boolean;
  isActive: boolean;
  flagIcon?: any;
  hasState: boolean;
}
export interface Currency {
  id: number;
  code: string;
  name: string;
  shortName: string;
  symbol: string;
  isActive: boolean;
}
export interface ICountryRequest {
  id?: number | null;
  name: string;
  shortName: string;
  code: string;
  phoneCode: string;
  isoNumber: string;
  currencyId: number | null;
  hasState: boolean;
  flagIcon: string;
  canReceive: boolean;
  canSend: boolean;
  isActive: boolean | null | undefined;
}
interface IFilterParams {
  pageParams?: IPageParams;
  filterParams: any;
}
const getAllCountries = ({ pageParams, filterParams }: IFilterParams) => {
  return NeoHttpClient.post<NeoResponse<ICountryResponse>>(
    api.masterData.country.getAll,
    {
      ...filterParams
    },
    {
      params: {
        page: pageParams?.page,
        size: pageParams?.size
      }
    }
  );
};
const useGetAllCountries = () => {
  return useMutation(getAllCountries, {
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};
const getCountryList = async () => {
  return await NeoHttpClient.get<NeoResponse<CountriesList[]>>(
    api.masterData.country.getList
  );
};
const useGetCountryList = () => {
  return useQuery(api.masterData.country.getList, getCountryList, {
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};
const addCountry = (data: ICountryRequest) => {
  return NeoHttpClient.post<NeoResponse>(
    api.masterData.country.create,
    toFormData(data)
  );
};
const useAddCountry = () => {
  return useMutation(addCountry, {
    onSuccess: success => {
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
const getCountryById = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse<CountriesList>>(
    api.masterData.country.getById.replace("{id}", id + "")
  );
};
const useGetCountryById = (id: number | null) => {
  return useQuery(
    [api.masterData.country.getById, id],
    () => getCountryById(id),
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
const updateCountry = ({
  id,
  data
}: {
  id: number | null;
  data: ICountryRequest;
}) => {
  return NeoHttpClient.post<NeoResponse<ICountryRequest>>(
    api.masterData.country.update.replace("{id}", id + ""),
    toFormData(data)
  );
};
const useUpdateCountry = () => {
  const queryCLient = useQueryClient();
  return useMutation(updateCountry, {
    onSuccess: success => {
      queryCLient.invalidateQueries(api.masterData.country.getById);
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
const deleteCountry = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.masterData.country.update.replace("{id}", id + "")
  );
};
const useDeleteCountry = () => {
  return useMutation(deleteCountry, {
    onSuccess: success => {
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
const toggleStatus = (id: number | null) => () => {
  return NeoHttpClient.get<NeoResponse>(
    api.masterData.country.statusChange.replace("{id}", id + "")
  );
};
const useToggleStatus = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery([api.masterData.country.statusChange, id], toggleStatus(id), {
    enabled: false,
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.country.getAll);
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
export {
  useAddCountry,
  useDeleteCountry,
  useGetAllCountries,
  useGetCountryById,
  useGetCountryList,
  useToggleStatus,
  useUpdateCountry
};
