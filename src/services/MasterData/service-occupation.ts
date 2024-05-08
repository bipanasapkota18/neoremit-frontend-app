import NeoToast from "@neo/utility/Toast/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";

export interface IOccupationResponse {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
}
const getAllOccupation = () => {
  return NeoHttpClient.get<NeoResponse<IOccupationResponse[]>>(
    api.masterData.occupation.getAll
  );
};

const useGetAllOccupation = () => {
  return useQuery([api.masterData.occupation.getAll], getAllOccupation, {
    select: data => data?.data?.data,
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};
const createOccupation = (data: any) => {
  return NeoHttpClient.post<NeoResponse>(
    api.masterData.occupation.create,
    data
  );
};
const useCreateOccupation = () => {
  const queryClient = useQueryClient();
  return useMutation(createOccupation, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.occupation.getAll);
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
const updateOccupation = ({ id, data }: { id: number; data: any }) => {
  return NeoHttpClient.post<NeoResponse>(
    api.masterData.occupation.update.replace("{id}", id + ""),
    data
  );
};
const useUpdateOccupation = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOccupation, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.occupation.getAll);
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
const deleteOccupation = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.masterData.occupation.update.replace("{id}", id + "")
  );
};
const useDeleteOccupation = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOccupation, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.occupation.getAll);
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
const toggleOccupationStatus = (id: number | null) => () => {
  return NeoHttpClient.get<NeoResponse>(
    api.masterData.occupation.statusChange.replace("{id}", id + "")
  );
};
const useToggleOccupationStatus = (id: null | number) => {
  const queryClient = useQueryClient();
  return useQuery(
    [api.masterData.occupation.statusChange, id],
    toggleOccupationStatus(id),
    {
      enabled: false,
      onSuccess: success => {
        queryClient.invalidateQueries(api.masterData.occupation.getAll);
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
  useCreateOccupation,
  useDeleteOccupation,
  useGetAllOccupation,
  useToggleOccupationStatus,
  useUpdateOccupation
};
