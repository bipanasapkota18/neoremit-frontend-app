import { toastFail, toastSuccess } from "@neo/utility/Toast";
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

// interface IFilterItems {
// }
interface IFilterParams {
  pageParams?: IPageParams;
  filterParams: any;
  //   filterParams: IFilterItems;
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
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const getCountryList = () => {
  return NeoHttpClient.get<NeoResponse>(api.masterData.country.getList);
};
const useGetCountryList = () => {
  return useQuery(api.masterData.country.getList, getCountryList, {
    select: data => data?.data?.data,
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};
const addCountry = (data: ICountryRequest) => {
  return NeoHttpClient.post<NeoResponse<ICountryRequest>>(
    api.masterData.country.create,
    toFormData(data)
  );
};
const useAddCountry = () => {
  return useMutation(addCountry, {
    onSuccess: success => {
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
const getCountryById = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse<CountriesList>>(
    api.masterData.country.update.replace("{id}", id + "")
  );
};
const useGetCountryById = (id: number | null) => {
  return useQuery([id], () => getCountryById(id), {
    enabled: !!id,
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};
const updateCountry = ({ id, data }: { id: number; data: ICountryRequest }) => {
  return NeoHttpClient.post<NeoResponse<ICountryRequest>>(
    api.masterData.country.update.replace("{id}", id + ""),
    toFormData(data)
  );
};
const useUpdateCountry = () => {
  return useMutation(updateCountry, {
    onSuccess: success => {
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
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
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
      // toastFail(error?.response?.data?.errors[0]);
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
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? "Error");
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
