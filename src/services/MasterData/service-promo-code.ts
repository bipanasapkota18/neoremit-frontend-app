import NeoToast from "@neo/utility/Toast/Toast";
import { ISelectOptions } from "@neo/utility/format";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";
import { IPageParams } from "./master-data-common-interface";

// interface IFilterItems {
// }
interface IFilterParams {
  pageParams?: IPageParams;
  filterParams: any;
  //   filterParams: IFilterItems;
}
export interface IPromoCodeResponse {
  totalItems: number;
  promoCodeList: PromoCodeList[];
}

export interface PromoCodeList {
  id: number;
  code: string;
  name: string;
  validFrom: string;
  validTo: string;
  doesExpire: boolean;
  hasUsageLimit: boolean;
  capAmount: number;
  deductionFrom: string;
  payoutMethodList: any[];
  countryList: CountryList[];
  usageLimit: number;
  marginDiscountType: string;
  marginDiscountValue: number;
  transactionFeeDiscountType: string;
  transactionFeeDiscountValue: number;
  description: string;
  isActive: boolean;
}

export interface CountryList {
  id: number;
  name: string;
}

export interface IPromoCodeRequest {
  id?: number;
  code: string;
  name: string;
  validFrom: string | null;
  validTo: string | null;
  doesExpire: boolean;
  hasUsageLimit: boolean;
  capAmount: number | null;
  deductionFrom: string | null;
  payoutMethodIds: ISelectOptions<number>[] | null;
  countryIds: ISelectOptions<number>[] | null;
  usageLimit: number | null;
  marginDiscountType: string | null | undefined;
  marginDiscountValue: number | null | undefined;
  transactionFeeDiscountType: string | null | undefined;
  transactionFeeDiscountValue: number | null | undefined;
  description: string;
}

const getAllPromoCode = ({ pageParams, filterParams }: IFilterParams) => {
  return NeoHttpClient.post<NeoResponse<IPromoCodeResponse>>(
    api.masterData.promo_code.getAll,
    {
      ...filterParams
    },
    {
      params: {
        page: pageParams?.page,
        size: pageParams?.size
      }
    }
  );
};
const useGetAllPromoCode = () => {
  return useMutation(getAllPromoCode, {
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};

const addPromoCode = (data: IPromoCodeRequest) => {
  return NeoHttpClient.post<NeoResponse<IPromoCodeRequest>>(
    api.masterData.promo_code.create,
    data
  );
};
const useAddPromoCode = () => {
  const queryClient = useQueryClient();
  return useMutation(addPromoCode, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.promo_code.getAll);
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

const updatePromoCode = ({
  id,
  data
}: {
  id: number | null;
  data: IPromoCodeRequest;
}) => {
  return NeoHttpClient.post<NeoResponse<IPromoCodeRequest>>(
    api.masterData.promo_code.update.replace("{id}", id + ""),
    data
  );
};
const useUpdatePromoCode = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePromoCode, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.promo_code.getAll);
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

const deletePromoCode = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse<IPromoCodeRequest>>(
    api.masterData.promo_code.update.replace("{id}", id + "")
  );
};
const useDeletePromoCode = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePromoCode, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.promo_code.getAll);
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

const togglePromoCodeStatus = (id: number | null) => () => {
  return NeoHttpClient.get<NeoResponse<IPromoCodeRequest>>(
    api.masterData.promo_code.statusChange.replace("{id}", id + "")
  );
};
const useTogglePromoCodeStatus = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery(
    [api.masterData.promo_code.statusChange, id],
    togglePromoCodeStatus(id),
    {
      enabled: false,
      onSuccess: success => {
        queryClient.invalidateQueries(api.masterData.promo_code.getAll);
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
  useAddPromoCode,
  useDeletePromoCode,
  useGetAllPromoCode,
  useTogglePromoCodeStatus,
  useUpdatePromoCode
};
