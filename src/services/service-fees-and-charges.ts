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
  feeAndChargesDetails?: any;
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
  id: number;
  paymentMethodIds: any[];
  feeAndChargeType?: string;
  fromAmount: number;
  toAmount: number;
  fee: number;
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
  return useQuery(api.fee_and_charges.getSingle, getFeeAndChargesbyId(id), {
    enabled: !!id,
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};
const addFeesAndCharges = (data: any) => {
  return NeoHttpClient.post<NeoResponse>(api.fee_and_charges.create, data);
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
const updataFeeAndCharges = (data: any) => {
  return NeoHttpClient.put<NeoResponse>(api.fee_and_charges.update, data);
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
//Fees and Charges Configuration
const addFeeandChargesDetails = ({
  feeAndChargeId,
  data
}: {
  feeAndChargeId: number | null;
  data: any;
}) => {
  return NeoHttpClient.post<NeoResponse<FeeAndChargesDetail>>(
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
      queryCLient.invalidateQueries(api.fee_and_charges_details.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message || error?.message);
    }
  });
};
const updateFeeandChargesDetails = (data: any) => {
  return NeoHttpClient.put<NeoResponse<FeeAndChargesDetail>>(
    api.fee_and_charges_details.update,
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
      queryCLient.invalidateQueries(api.fee_and_charges_details.getAll);
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
  useGetAllFeesAndCharges,
  useGetFeeAndChargesbyId,
  useUpdateFeeandChargesDetails,
  useUpdateFeesAndCharges
};
