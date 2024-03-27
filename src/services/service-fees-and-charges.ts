import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";

export interface IFeeAndChargeResponse {
  id: number;
  feeName: string;
  country: Country;
  currencyDetailResponseDto: Currency;
  isActive: boolean;
  feeAndChargesDetails?: FeeAndChargesDetail[];
}

interface Country {
  id: number;
  name: string;
}
interface Currency {
  id: number;
  name: string;
}
export interface IFeeAndChargeDetailsResponse {
  id: number;
  feeName: string;
  country: Country;
  currencyDetailResponseDto: Currency;
  isActive: boolean;
  feeAndChargesDetails: FeeAndChargesDetail[];
}

export interface FeeAndChargesDetail {
  id?: number;
  payoutMethods: PaymentMethodId[] | undefined;
  feeAndChargeType?: string;
  fromAmount: number | null;
  toAmount: number | null;
  fee: number | null;
}
export interface FeeAndChargesDetailRequest {
  id?: number;
  payoutMethodIds: PaymentMethodId[];
  feeAndChargeType?: string;
  fromAmount: number | null;
  toAmount: number | null;
  fee: number | null;
}
export interface PaymentMethodId {
  id: number;
  code: string;
  name: string;
  description: string;
  isCash: boolean;
  isActive: boolean;
}
export interface IFeeAndChargeRequest {
  id?: number | null;
  feeName: string;
  countryId: number | string;
  currencyId: number | string;
  feeAndChargesDetails?: FeeAndChargesDetail[];
}

const getAllFeesAndCharges = () => {
  return NeoHttpClient.get<NeoResponse<IFeeAndChargeResponse[]>>(
    api.fee_and_charges.getAll
  );
};
const useGetAllFeesAndCharges = () => {
  return useQuery(api.fee_and_charges.getAll, getAllFeesAndCharges, {
    select: data => data?.data?.data,
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};
const getFeeAndChargesbyId = (id: number | null) => () => {
  return NeoHttpClient.get<NeoResponse<IFeeAndChargeDetailsResponse>>(
    api.fee_and_charges.getSingle.replace("{id}", id + "")
  );
};
const useGetFeeAndChargesbyId = (id: number | null) => {
  return useQuery(
    [api.fee_and_charges.getSingle, id],
    getFeeAndChargesbyId(id),
    {
      enabled: !!id,
      onError: (error: AxiosError<{ message: string }>) => {
        toastFail(error?.response?.data?.message || error?.message);
      }
    }
  );
};
const addFeesAndCharges = (data: IFeeAndChargeRequest) => {
  return NeoHttpClient.post<NeoResponse<IFeeAndChargeRequest>>(
    api.fee_and_charges.create,
    data
  );
};
const useAddFeesAndCharges = () => {
  const queryCLient = useQueryClient();
  return useMutation(addFeesAndCharges, {
    onSuccess: success => {
      queryCLient.invalidateQueries(api.fee_and_charges.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};
const updataFeeAndCharges = (data: IFeeAndChargeRequest) => {
  return NeoHttpClient.put<NeoResponse<IFeeAndChargeRequest>>(
    api.fee_and_charges.update.replace("{id}", data.id + ""),
    data
  );
};
const useUpdateFeesAndCharges = () => {
  const queryCLient = useQueryClient();
  return useMutation(updataFeeAndCharges, {
    onSuccess: success => {
      queryCLient.invalidateQueries(api.fee_and_charges.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};
const deleteFeeAndCharges = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.fee_and_charges.delete.replace("{id}", id + "")
  );
};
const useFeeAndChargesDelete = () => {
  const queryCLient = useQueryClient();
  return useMutation(deleteFeeAndCharges, {
    onSuccess: success => {
      queryCLient.invalidateQueries(api.fee_and_charges.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};
const toggleFeeAndChargesStatus = (id: number | null) => {
  return NeoHttpClient.put<NeoResponse>(
    api.fee_and_charges.toggleStatus.replace("{id}", id + "")
  );
};
const useFeeandChargeToggle = () => {
  const queryCLient = useQueryClient();
  return useMutation(toggleFeeAndChargesStatus, {
    onSuccess: success => {
      queryCLient.invalidateQueries(api.fee_and_charges.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};
//Fees and Charges Configuration
const addFeeandChargesDetails = ({
  feeAndChargeId,
  data
}: {
  feeAndChargeId: number | null;
  data: FeeAndChargesDetailRequest;
}) => {
  return NeoHttpClient.post<NeoResponse<FeeAndChargesDetailRequest>>(
    api.fee_and_charges_details.create.replace(
      "{feeAndChargeId}",
      feeAndChargeId + ""
    ),
    data
  );
};
const useAddFeeandChargesDetails = () => {
  const queryCLient = useQueryClient();
  return useMutation(addFeeandChargesDetails, {
    onSuccess: success => {
      queryCLient.invalidateQueries(api.fee_and_charges.getSingle);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};
const updateFeeandChargesDetails = ({
  id,
  data
}: {
  id: number | null;
  data: FeeAndChargesDetailRequest;
}) => {
  return NeoHttpClient.put<NeoResponse<FeeAndChargesDetailRequest>>(
    api.fee_and_charges_details.update.replace("{id}", id + ""),
    data
  );
};
const useUpdateFeeandChargesDetails = () => {
  const queryCLient = useQueryClient();
  return useMutation(updateFeeandChargesDetails, {
    onSuccess: success => {
      queryCLient.invalidateQueries(api.fee_and_charges_details.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};
const deleteFeeAndChargesDetails = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.fee_and_charges_details.delete.replace("{id}", id + "")
  );
};
const useFeeAndChargesDetailDelete = () => {
  const queryCLient = useQueryClient();
  return useMutation(deleteFeeAndChargesDetails, {
    onSuccess: success => {
      queryCLient.invalidateQueries(api.fee_and_charges.update);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};

export {
  useAddFeeandChargesDetails,
  useAddFeesAndCharges,
  useFeeAndChargesDelete,
  useFeeAndChargesDetailDelete,
  useFeeandChargeToggle,
  useGetAllFeesAndCharges,
  useGetFeeAndChargesbyId,
  useUpdateFeeandChargesDetails,
  useUpdateFeesAndCharges
};
