import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { trimObjectValues } from "@neo/utility/helper";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";
import { IPageParams } from "./master-data-common-interface";

export interface ICurrencyResponse {
  totalItems: number;
  currenciesList: CurrenciesList[];
}

export interface CurrenciesList {
  id: number;
  code: string;
  name: string;
  shortName: string;
  symbol: string;
  isActive: boolean;
}
export interface ICurrencyRequest {
  id?: number | null;
  code: string;
  name: string;
  shortName: string;
  Symbol: string;
  isActive?: boolean;
}
// interface IFilterItems {
// }
interface IFilterParams {
  pageParams?: IPageParams;
  filterParams: any;
  //   filterParams: IFilterItems;
}
const getAllCurrency = ({ pageParams, filterParams }: IFilterParams) => {
  return NeoHttpClient.post<NeoResponse<ICurrencyResponse>>(
    api.masterData.currency.getAll,
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

const useGetAllCurrency = () => {
  return useMutation(getAllCurrency, {
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};

const getCurrencyById = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse<CurrenciesList>>(
    api.masterData.currency.update.replace("{id}", id + "")
  );
};
const useGetCurrencyById = (id: number | null) => {
  return useQuery([id], () => getCurrencyById(id), {
    enabled: !!id,
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};

const addCurrency = (data: ICurrencyRequest) => {
  return NeoHttpClient.post<NeoResponse<ICurrencyRequest>>(
    api.masterData.currency.create,
    trimObjectValues(data)
  );
};
const useAddCurrency = () => {
  const queryClient = useQueryClient();
  return useMutation(addCurrency, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.currency.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};

const updateCurrency = ({
  id,
  data
}: {
  id: number;
  data: ICurrencyRequest;
}) => {
  return NeoHttpClient.post<NeoResponse<ICurrencyRequest>>(
    api.masterData.currency.update.replace("{id}", id.toString()),
    trimObjectValues(data)
  );
};
const useUpdateCurrency = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCurrency, {
    onSuccess: success => {
      queryClient.invalidateQueries([api.masterData.currency.getAll]);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};

const deleteCurrency = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse<ICurrencyRequest>>(
    api.masterData.currency.update.replace("{id}", id + "")
  );
};
const useDeleteCurrency = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCurrency, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.currency.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};
const toggleStatus = (id: number | null) => () => {
  return NeoHttpClient.get<NeoResponse>(
    api.masterData.currency.toggleStatus.replace("{id}", id + "")
  );
};
const useToggleCurrencyStatus = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery(
    [api.masterData.currency.toggleStatus, id],
    toggleStatus(id),
    {
      enabled: false,
      onSuccess: success => {
        queryClient.invalidateQueries(api.masterData.currency.getAll);
        toastSuccess(success?.data?.message);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toastFail(error?.response?.data?.message ?? "Error");
      }
    }
  );
};
export {
  useAddCurrency,
  useDeleteCurrency,
  useGetAllCurrency,
  useGetCurrencyById,
  useToggleCurrencyStatus,
  useUpdateCurrency
};
