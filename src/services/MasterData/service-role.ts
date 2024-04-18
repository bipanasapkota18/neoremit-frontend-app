import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { filterFalseyValues } from "@neo/utility/remove-falsey";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";

export interface IRoleResponse {
  roleId: number | null;
  roleName: string | null;
  roleDescription?: string;
  roleHierarchy: number;
  moduleList: ModuleList[];
  active: boolean;
}

export interface ModuleList {
  moduleId: number;
  scopeList: string[];
  moduleName: string;
}

export interface IModuleResponse {
  id: number;
  name: string;
  parentModuleId?: number;
  parentModuleName?: string;
  scopeList: string[];
}

const getAllRoles = () => {
  return NeoHttpClient.get<NeoResponse<IRoleResponse[]>>(api.role.getAll);
};
const useGetAllRoles = () => {
  return useQuery([api.role.getAll], getAllRoles, {
    select: data => data.data.data,
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const addRole = (data: IRoleResponse) => {
  return NeoHttpClient.post<NeoResponse>(
    api.role.create,
    filterFalseyValues(data)
  );
};
const useAddRole = () => {
  const queryClient = useQueryClient();
  return useMutation(addRole, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.role.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const getAllModules = () => {
  return NeoHttpClient.get<NeoResponse<IModuleResponse[]>>(api.role.allModules);
};
const useGetAllModules = () => {
  return useQuery([api.role.allModules], getAllModules, {
    select: data => data.data.data,
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
export { useAddRole, useGetAllModules, useGetAllRoles };
