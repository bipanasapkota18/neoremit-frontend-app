import NeoToast from "@neo/utility/Toast/Toast";
import { trimObjectValues } from "@neo/utility/helper";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";
import { IPageParams } from "./master-data-common-interface";

export interface IPurposeResponse {
  id: number;
  name: string;
  code?: string;
  isActive: boolean;
}

export interface IPurposeRequest {
  id?: number | null;
  code: string;
  name: string;
  isActive?: boolean | null | undefined;
}
// interface IFilterItems {
// }
interface IFilterParams {
  pageParams?: IPageParams;
  filterParams: any;
  //   filterParams: IFilterItems;
}
const getAllPurpose = ({ pageParams, filterParams }: IFilterParams) => {
  return NeoHttpClient.post<NeoResponse<IPurposeResponse[]>>(
    api.masterData.purpose_of_payment.getAll,
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

const useGetAllPurpose = () => {
  return useMutation(getAllPurpose, {
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};

const addPurpose = (data: IPurposeRequest) => {
  return NeoHttpClient.post<NeoResponse<IPurposeRequest>>(
    api.masterData.purpose_of_payment.create,
    trimObjectValues(data)
  );
};
const useAddPurpose = () => {
  const queryClient = useQueryClient();
  return useMutation(addPurpose, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.purpose_of_payment.getAll);
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

const updatePurpose = ({ id, data }: { id: number; data: IPurposeRequest }) => {
  return NeoHttpClient.post<NeoResponse<IPurposeRequest>>(
    api.masterData.purpose_of_payment.update.replace("{id}", id.toString()),
    trimObjectValues(data)
  );
};
const useUpdatePurpose = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePurpose, {
    onSuccess: success => {
      queryClient.invalidateQueries([api.masterData.purpose_of_payment.getAll]);
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

const deletePurpose = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse<IPurposeRequest>>(
    api.masterData.purpose_of_payment.update.replace("{id}", id + "")
  );
};
const useDeletePurpose = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePurpose, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.purpose_of_payment.getAll);
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
    api.masterData.purpose_of_payment.statusChange.replace("{id}", id + "")
  );
};
const useTogglePurposeStatus = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery(
    [api.masterData.purpose_of_payment.statusChange, id],
    toggleStatus(id),
    {
      enabled: false,
      onSuccess: success => {
        queryClient.invalidateQueries(api.masterData.purpose_of_payment.getAll);
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
    }
  );
};

export {
  useAddPurpose,
  useDeletePurpose,
  useGetAllPurpose,
  useTogglePurposeStatus,
  useUpdatePurpose
};
