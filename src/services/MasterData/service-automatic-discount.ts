import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";

export interface IAutomaticDiscountResponse {
  id: number;
  discountCode?: any;
  discountName: string;
  country: country;
  payoutMethods: PayoutMethod[];
  validFrom: string;
  validTill: string;
  isActive: boolean;
  description: string;
  firstNTransactionPerCustomer: FirstNTransactionPerCustomer;
  // firstNTransaction: FirstNTransaction;
}

export interface PayoutMethod {
  id: number;
  code: string;
  name: string;
  description: string;
  icon: string;
  isCash: boolean;
  isActive: boolean;
}

export interface country {
  id: number;
  name: string;
}
export interface IAutomaticDiscountRequest {
  description: string;
  countryMasterId: number | undefined;
  payoutMethodIds: number[] | undefined;
  // firstNTransaction: FirstNTransaction;
  firstNTransactionPerCustomer: FirstNTransactionPerCustomer;
  discountName: string;
}

export interface FirstNTransaction {
  id?: number;
  noOfTransactions: number | null;
  capAmount: number | null;
  deductionFrom: string | undefined;
  validFrom: string | null;
  validTill: string | null;
  discountType: string | undefined;
  discountAmount: number | null;
}

export interface FirstNTransactionPerCustomer {
  id?: number;
  noOfTransactions: number | null;
  capAmount: number | null;
  deductionFrom: string | undefined;
  discountType: string | undefined;
  discountAmount: number | null;
}
const getAllAutomaticDiscounts = () => {
  return NeoHttpClient.get<NeoResponse<IAutomaticDiscountResponse[]>>(
    api.automatic_discount.getAll
  );
};
const useGetAllAutomaticDiscounts = () => {
  return useQuery(api.automatic_discount.getAll, getAllAutomaticDiscounts, {
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error.response?.data.message ?? error?.message);
    }
  });
};

const getAutomaticDiscountById = (id: number | null) => () => {
  return NeoHttpClient.get<NeoResponse<IAutomaticDiscountResponse>>(
    api.automatic_discount.getById.replace("{id}", id + "")
  );
};
const useGetAutomaticDiscountById = (id: number | null) => {
  return useQuery(
    [api.automatic_discount.getById, id],
    getAutomaticDiscountById(id),
    {
      enabled: !!id,
      onError: (error: AxiosError<{ message: string }>) => {
        toastFail(error.response?.data.message ?? error?.message);
      }
    }
  );
};
const addAutomaticDiscount = (data: IAutomaticDiscountRequest) => {
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

const updateAutomaticDiscount = ({
  id,
  data
}: {
  id: number;
  data: IAutomaticDiscountRequest;
}) => {
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
  return useMutation(api.automatic_discount.delete, deleteAutomaticDiscount, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.automatic_discount.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error.response?.data.message ?? error?.message);
    }
  });
};

// const togglePromoCodeStatus = (id: number | null) => () => {
//   return NeoHttpClient.get<NeoResponse<IAutomaticDiscountRequest>>(
//     api.automatic_discount.statusChange.replace("{id}", id + "")
//   );
// };
// const useTogglePromoCodeStatus = (id: number | null) => {
//   const queryClient = useQueryClient();
//   return useQuery(
//     [api.automatic_discount.statusChange, id],
//     togglePromoCodeStatus(id),
//     {
//       enabled: false,
//       onSuccess: success => {
//         queryClient.invalidateQueries(api.automatic_discount.getAll);
//         toastSuccess(success?.data?.message);
//       },
//       onError: (error: AxiosError<{ message: string }>) => {
//         toastFail(error?.response?.data?.message ?? error?.message);
//       }
//     }
//   );
// };
const toggleStatus = (id: number | null) => {
  return NeoHttpClient.put<NeoResponse>(
    api.automatic_discount.statusChange.replace("{id}", id + "")
  );
};
const useToggleAutomaticDiscount = () => {
  const queryCLient = useQueryClient();
  return useMutation(toggleStatus, {
    onSuccess: success => {
      queryCLient.invalidateQueries(api.automatic_discount.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};
export {
  useAddAutomaticDiscount,
  useDeleteAutomaticDiscount,
  useGetAllAutomaticDiscounts,
  useGetAutomaticDiscountById,
  useToggleAutomaticDiscount,
  useUpdateAutomaticDiscount
};
