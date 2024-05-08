import NeoToast from "@neo/utility/Toast/Toast";
import { trimObjectValues } from "@neo/utility/helper";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";

export interface IRelationshipRequest {
  id?: number | null;
  name: string;
  code: string;
  isActive: boolean;
}
export interface IRelationshipResponse {
  id?: number | null;
  name: string;
  code: string;
  isActive: boolean;
}
// interface IFilterItems {
// }

const getAllRelationShip = () => {
  return NeoHttpClient.get<NeoResponse<IRelationshipResponse[]>>(
    api.masterData.relationship.getAll
  );
};

const useGetAllRelationShip = () => {
  return useQuery(api.masterData.relationship.getAll, getAllRelationShip, {
    select: data => data?.data?.data,
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};

const getRelationshipById = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse<IRelationshipResponse>>(
    api.masterData.relationship.getById.replace("{id}", id + "")
  );
};
const useGetRelationshipById = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery(
    [id, api.masterData.relationship.getById],
    () => getRelationshipById(id),
    {
      enabled: !!id,
      onSuccess: () => {
        queryClient.invalidateQueries(api.masterData.relationship.getById);
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

const addRelationShip = (data: any) => {
  return NeoHttpClient.post<NeoResponse<IRelationshipRequest>>(
    api.masterData.relationship.create,
    trimObjectValues(data)
  );
};
const useAddRelationship = () => {
  const queryClient = useQueryClient();
  return useMutation(addRelationShip, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.relationship.getAll);
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

const updateRelationship = ({
  id,
  data
}: {
  id: number;
  data: IRelationshipRequest;
}) => {
  return NeoHttpClient.post<NeoResponse<IRelationshipRequest>>(
    api.masterData.relationship.update.replace("{id}", id.toString()),
    trimObjectValues(data)
  );
};
const useUpdateRelationship = () => {
  const queryClient = useQueryClient();
  return useMutation(updateRelationship, {
    onSuccess: success => {
      queryClient.invalidateQueries([api.masterData.relationship.getAll]);
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

const deleteRelationship = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.masterData.relationship.update.replace("{id}", id + "")
  );
};
const useDeleteRelationship = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteRelationship, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.relationship.getAll);
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
    api.masterData.relationship.statusChange.replace("{id}", id + "")
  );
};
const useToggleRelationshipStatus = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery(
    [api.masterData.relationship.statusChange, id],
    toggleStatus(id),
    {
      enabled: false,
      onSuccess: success => {
        queryClient.invalidateQueries(api.masterData.relationship.getAll);
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
  useAddRelationship,
  useDeleteRelationship,
  useGetAllRelationShip,
  useGetRelationshipById,
  useToggleRelationshipStatus,
  useUpdateRelationship
};
