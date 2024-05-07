import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { filterFalseyValues } from "@neo/utility/remove-falsey";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";

export interface IRoleResponse {
  roleId: number | null;
  roleName: string | null;
  roleDescription?: string | null;
  roleHierarchy: number | null;
  moduleList: ModuleList[] | null | undefined;
  active?: boolean;
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
      queryClient.invalidateQueries(api.role.create);
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

const toggleRoleStatus = (roleId: number | null) => () => {
  return NeoHttpClient.get<NeoResponse>(
    api.role.toggleStatus.replace("{roleId}", roleId + "")
  );
};
const useToggleRoleStatus = (roleId: number | null) => {
  const queryClient = useQueryClient();
  return useQuery([api.role.toggleStatus, roleId], toggleRoleStatus(roleId), {
    enabled: false,
    onSuccess: success => {
      queryClient.invalidateQueries(api.role.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? "Error");
    }
  });
};

const getRoleById = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse>(
    api.role.getById.replace("{roleId}", id + "")
  );
};
const useGetRoleById = (id: number | null) => {
  return useQuery([api.role.getById, id], () => getRoleById(id), {
    enabled: !!id,
    select: data => data?.data?.data,
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data.message ?? error?.message);
    }
  });
};
export {
  useAddRole,
  useGetAllModules,
  useGetAllRoles,
  useGetRoleById,
  useToggleRoleStatus
};
