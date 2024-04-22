import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";
export interface IMaritalStatusResponse {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
}

export interface IMaritalStatusRequest {
  id?: number;
  name: string;
  code: string;
  isActive?: boolean;
}

const getAllMaritalStatus = () => {
  return NeoHttpClient.get<NeoResponse<IMaritalStatusResponse[]>>(
    api.masterData.marital_status.getAll
  );
};

const useGetAllMaritalStatus = () => {
  return useQuery([api.masterData.marital_status.getAll], getAllMaritalStatus, {
    select: data => data.data.data,
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const createMaritalStatus = (data: IMaritalStatusRequest) => {
  return NeoHttpClient.post<NeoResponse>(
    api.masterData.marital_status.create,
    data
  );
};
const useAddMaritalStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(createMaritalStatus, {
    onSuccess: success => {
      toastSuccess(success?.data?.message);
      queryClient.invalidateQueries(api.masterData.marital_status.getAll);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
const updateMaritalStatus = ({
  id,
  data
}: {
  id: number;
  data: IMaritalStatusRequest;
}) => {
  return NeoHttpClient.post<NeoResponse>(
    api.masterData.marital_status.update.replace("{id}", id.toString()),
    data
  );
};
const useUpdateMaritalStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(updateMaritalStatus, {
    onSuccess: success => {
      toastSuccess(success?.data?.message);
      queryClient.invalidateQueries(api.masterData.marital_status.getAll);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
const changeMaritalStatusStatus = (id: number | null) => () => {
  return NeoHttpClient.get<NeoResponse>(
    api.masterData.marital_status.statusChange.replace("{id}", id + "")
  );
};
const useChangeMaritalStatusStatus = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery(
    [api.masterData.marital_status.statusChange, id],
    changeMaritalStatusStatus(id),
    {
      enabled: false,
      onSuccess: success => {
        toastSuccess(success?.data?.message);
        queryClient.invalidateQueries(api.masterData.marital_status.getAll);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toastFail(error?.response?.data?.message ?? error?.message);
      }
    }
  );
};
const deleteMaritalStatus = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.masterData.marital_status.update.replace("{id}", id + "")
  );
};
const useDeleteMaritalStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteMaritalStatus, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.marital_status.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
export {
  useAddMaritalStatus,
  useChangeMaritalStatusStatus,
  useDeleteMaritalStatus,
  useGetAllMaritalStatus,
  useUpdateMaritalStatus
};
