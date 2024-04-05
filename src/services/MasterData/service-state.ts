import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";
import { IPageParams } from "./master-data-common-interface";

export interface IStateResponse {
  countryId: number;
  totalItems: number;
  statesList: StatesList[];
}

export interface StatesList {
  id: number;
  name: string;
  code: string;
  country: Country;
  isActive: boolean;
}

export interface Country {
  id: number;
  name: string;
}
interface IFilterItems {
  countryId: number | null;
}
interface IFilterParams {
  pageParams?: IPageParams;
  filterParams: IFilterItems;
}
const getAllState = ({ pageParams, filterParams }: IFilterParams) => {
  return NeoHttpClient.post<NeoResponse<IStateResponse>>(
    api.masterData.state.getAll,
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
const useGetAllState = () => {
  return useMutation(getAllState, {
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
const addState = (data: any) => {
  return NeoHttpClient.post<NeoResponse>(api.masterData.state.create, data);
};
const useAddState = () => {
  return useMutation(addState, {
    onSuccess: success => {
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
const deleteState = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.masterData.state.update.replace("{id}", id + "")
  );
};
const useDeleteState = () => {
  return useMutation(deleteState, {
    onSuccess: success => {
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const updateState = ({ id, data }: { id: number | null; data: any }) => {
  return NeoHttpClient.post<NeoResponse>(
    api.masterData.state.update.replace("{id}", id + ""),
    data
  );
};
const useUpdateState = () => {
  return useMutation(updateState, {
    onSuccess: success => {
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
export { useAddState, useDeleteState, useGetAllState, useUpdateState };
