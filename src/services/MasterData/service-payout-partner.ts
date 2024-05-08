import NeoToast from "@neo/utility/Toast/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient, toFormData } from "../service-axios";

interface IPayoutPartnerRequest {
  id?: number;
  payoutMethodId: number | null;
  countryId: number | null;
  name: string;
  code: string;
  image: string;
  isActive: boolean;
}
export interface IPayoutPartnerResponse {
  id: number;
  payoutMethod: PayoutMethod;
  country: Country;
  name: string;
  code: string;
  image: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface PayoutMethod {
  id: number;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
}
const getAllPayoutPartners = () => {
  return NeoHttpClient.get<NeoResponse<IPayoutPartnerResponse[]>>(
    api.masterData.payout_partner.getAll
  );
};
const useGetAllPayoutPartners = () => {
  return useQuery(api.masterData.payout_partner.getAll, getAllPayoutPartners, {
    select: data => data?.data?.data,
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};
const getPayoutPartnerById = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse<IPayoutPartnerResponse>>(
    api.masterData.payout_partner.update.replace("{id}", id + "")
  );
};
const useGetPayoutPartnerById = (id: number | null) => {
  return useQuery(
    [id, api.masterData.payout_partner.update],
    () => getPayoutPartnerById(id),
    {
      enabled: !!id,
      onError: (error: AxiosError<{ message: string }>) => {
        NeoToast({
          type: "error",
          message: error?.response?.data?.message ?? error?.message
        });
      }
    }
  );
};

const addPayoutPartner = (data: any) => {
  return NeoHttpClient.post<NeoResponse<IPayoutPartnerRequest>>(
    api.masterData.payout_partner.create,
    toFormData(data)
  );
};
const useAddPayoutPartner = () => {
  const queryClient = useQueryClient();
  return useMutation(addPayoutPartner, {
    onSuccess: (success: any) => {
      queryClient.invalidateQueries(api.masterData.payout_partner.getAll);
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
const updatePayoutPartner = (data: IPayoutPartnerRequest) => {
  return NeoHttpClient.post<NeoResponse<IPayoutPartnerRequest>>(
    api.masterData.payout_partner.update.replace("{id}", data.id + ""),
    toFormData(data)
  );
};
const useUpdatePayoutPartner = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePayoutPartner, {
    onSuccess: (success: any) => {
      queryClient.invalidateQueries(api.masterData.payout_partner.getAll);
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
const deletePayoutPartner = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.masterData.payout_partner.update.replace("{id}", id + "")
  );
};
const useDeletePayoutPartner = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePayoutPartner, {
    onSuccess: (success: any) => {
      queryClient.invalidateQueries(api.masterData.payout_partner.getAll);
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
    api.masterData.payout_partner.statusChange.replace("{id}", id + "")
  );
};
const useToggleStatus = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery(
    [api.masterData.payout_partner.statusChange, id],
    toggleStatus(id),
    {
      enabled: false,
      onSuccess: success => {
        queryClient.invalidateQueries(api.masterData.payout_partner.getAll);
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
  useAddPayoutPartner,
  useDeletePayoutPartner,
  useGetAllPayoutPartners,
  useGetPayoutPartnerById,
  useToggleStatus,
  useUpdatePayoutPartner
};
