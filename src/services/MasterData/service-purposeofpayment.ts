import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { trimObjectValues } from "@neo/utility/helper";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
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
  isActive: boolean;
}
// interface IFilterItems {
// }
interface IFilterParams {
  pageParams?: IPageParams;
  filterParams: any;
  //   filterParams: IFilterItems;
}
const getAllPurpose = ({ pageParams, filterParams }: IFilterParams) => {
  return NeoHttpClient.post<NeoResponse<IPurposeResponse>>(
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
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};

const addPurpose = (data: IPurposeRequest) => {
  return NeoHttpClient.post<NeoResponse>(
    api.masterData.purpose_of_payment.create,
    trimObjectValues(data)
  );
};
const useAddPurpose = () => {
  const queryClient = useQueryClient();
  return useMutation(addPurpose, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.purpose_of_payment.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
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
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
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
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};

export { useAddPurpose, useDeletePurpose, useGetAllPurpose, useUpdatePurpose };
