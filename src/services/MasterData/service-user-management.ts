import NeoToast from "@neo/utility/Toast/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";
export interface IUserManagementResponse {
  name: string;
  email: string;
  mobileNumber: string;
  role: number[];
}
export interface IUserManagementRequest {
  name: string;
  email: string;
  mobileNumber: string;
  roles: (number | undefined)[];
}

export interface ToogleBlockUnblockRequest {
  id: number;
  isActive: boolean;
}

const getAllUserManagementResponse = () => {
  return NeoHttpClient.get<NeoResponse<IUserManagementResponse[]>>(
    api.internalUser.getAll
  );
};
const useGetAllUsers = () => {
  return useQuery([api.internalUser.getAll], getAllUserManagementResponse, {
    select: data => data.data.data,
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};
const createUser = (data: IUserManagementRequest) => {
  return NeoHttpClient.post<NeoResponse<IUserManagementRequest[]>>(
    api.internalUser.create,
    data
  );
};

const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(createUser, {
    onSuccess: success => {
      NeoToast({
        type: "success",
        message: success?.data?.message
      });
      queryClient.invalidateQueries(api.internalUser.getAll);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};

const toogleBlockUnblock = (id: number | null) => {
  return NeoHttpClient.put<NeoResponse>(
    api.internalUser.toggleStatus.replace("{UserId}", id + "")
  );
};

const useBlockUnblocktoggle = () => {
  const queryClient = useQueryClient();
  return useMutation(toogleBlockUnblock, {
    onSuccess: success => {
      NeoToast({
        type: "success",
        message: success?.data?.message
      });
      queryClient.invalidateQueries(api.internalUser.getAll);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};

export { useBlockUnblocktoggle, useCreateUser, useGetAllUsers };
