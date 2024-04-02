import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";

const getAllAutomaticDiscounts = () => {
  return NeoHttpClient.get<NeoResponse>(api.automatic_discount.getAll);
};
const useGetAllAutomaticDiscounts = () => {
  return useQuery(api.automatic_discount.getAll, getAllAutomaticDiscounts, {
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error.response?.data.message ?? error?.message);
    }
  });
};

const addAutomaticDiscount = (data: any) => {
  return NeoHttpClient.post<NeoResponse>(api.automatic_discount.create, data);
};
const useAddAutomaticDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation("addAutomaticDiscount", addAutomaticDiscount, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.automatic_discount.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error.response?.data.message ?? error?.message);
    }
  });
};

const updateAutomaticDiscount = ({ id, data }: { id: number; data: any }) => {
  return NeoHttpClient.put<NeoResponse>(
    api.automatic_discount.update.replace("{id}", id + ""),
    data
  );
};
const useUpdateAutomaticDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation("updateAutomaticDiscount", updateAutomaticDiscount, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.automatic_discount.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error.response?.data.message ?? error?.message);
    }
  });
};

const deleteAutomaticDiscount = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.automatic_discount.delete.replace("{id}", id + "")
  );
};
const useDeleteAutomaticDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation("deleteAutomaticDiscount", deleteAutomaticDiscount, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.automatic_discount.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error.response?.data.message ?? error?.message);
    }
  });
};
export {
  useAddAutomaticDiscount,
  useDeleteAutomaticDiscount,
  useGetAllAutomaticDiscounts,
  useUpdateAutomaticDiscount
};
