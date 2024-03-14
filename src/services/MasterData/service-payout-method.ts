import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { trimObjectValues } from "@neo/utility/helper";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";

// interface IFilterItems {
// }
export interface IPayoutMethodResponse {
  id: number;
  code: string;
  name: string;
  description?: any;
  isActive: boolean;
}
export interface IPayoutMethodRequest {
  id?: number;
  code: string;
  name: string;
  description?: any;
  isActive: boolean;
}

const getAllPayoutMethod = () => {
  return NeoHttpClient.get<NeoResponse<IPayoutMethodResponse[]>>(
    api.masterData.payout_method.getAll
  );
};

const useGetAllPayoutMethod = () => {
  return useQuery(api.masterData.payout_method.getAll, getAllPayoutMethod, {
    select: data => data?.data?.data,
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};

const getPayOutMethodById = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse<IPayoutMethodResponse>>(
    api.masterData.payout_method.update.replace("{id}", id + "")
  );
};
const useGetPayOutMethodById = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery(
    [id, api.masterData.payout_method.update],
    () => getPayOutMethodById(id),
    {
      enabled: !!id,
      onSuccess: () => {
        queryClient.invalidateQueries(api.masterData.payout_method.update);
      },
      onError: (error: AxiosError) => {
        toastFail(error?.message);
      }
    }
  );
};

const addPayoutMethod = (data: IPayoutMethodRequest) => {
  return NeoHttpClient.post<NeoResponse<IPayoutMethodRequest>>(
    api.masterData.payout_method.create,
    trimObjectValues(data)
  );
};
const useAddPayoutMethod = () => {
  const queryClient = useQueryClient();
  return useMutation(addPayoutMethod, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.payout_method.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};

const updatePayoutMethod = ({ id, data }: { id: number; data: any }) => {
  return NeoHttpClient.post<NeoResponse>(
    api.masterData.payout_method.update.replace("{id}", id.toString()),
    trimObjectValues(data)
  );
};
const useUpdatePayoutMethod = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePayoutMethod, {
    onSuccess: success => {
      queryClient.invalidateQueries([api.masterData.payout_method.getAll]);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};

const deletePayoutMethod = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.masterData.payout_method.update.replace("{id}", id + "")
  );
};
const useDeletePayoutMethod = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePayoutMethod, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.payout_method.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};

export {
  useAddPayoutMethod,
  useDeletePayoutMethod,
  useGetAllPayoutMethod,
  useGetPayOutMethodById,
  useUpdatePayoutMethod
};
