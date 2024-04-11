import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";

export interface IRoleResponse {
  id: number;
  name: string;
}

const getAllRoles = () => {
  return NeoHttpClient.get<NeoResponse<IRoleResponse[]>>(
    api.masterData.role.getAll
  );
};
const useGetAllRoles = () => {
  return useQuery([api.masterData.role.getAll], getAllRoles, {
    select: data => data.data.data,
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const addRole = (data: any) => {
  return NeoHttpClient.post<NeoResponse>(api.masterData.role.create, data);
};
const useAddRole = () => {
  const queryClient = useQueryClient();
  return useMutation(addRole, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.role.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const updateRole = ({ id, data }: { id: number; data: any }) => {
  return NeoHttpClient.put<NeoResponse>(
    api.masterData.role.update.replace("{id}", id + ""),
    data
  );
};
const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation(updateRole, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.role.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const deleteRole = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.masterData.role.delete.replace("{id}", id + "")
  );
};
const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteRole, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.role.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
export { useAddRole, useDeleteRole, useGetAllRoles, useUpdateRole };
