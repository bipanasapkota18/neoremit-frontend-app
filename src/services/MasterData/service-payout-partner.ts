import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient, toFormData } from "../service-axios";

interface IPayoutPartnerRequest {
  id?: number;
  payoutMethodId: number;
  countryId: number;
  name: string;
  code: string;
  image: string;
  isActive: boolean;
}
const getAllPayoutPartners = () => {
  return NeoHttpClient.get<NeoResponse>(api.masterData.payout_partner.getAll);
};
const useGetAllPayoutPartners = () => {
  return useQuery(api.masterData.payout_partner.getAll, getAllPayoutPartners, {
    select: data => data?.data?.data,
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};
const getPayoutPartnerById = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse>(
    api.masterData.payout_partner.update.replace("{id}", id + "")
  );
};
const useGetPayoutPartnerById = (id: number | null) => {
  return useQuery(
    [id, api.masterData.payout_partner.update],
    () => getPayoutPartnerById(id),
    {
      enabled: !!id,
      onError: (error: AxiosError) => {
        toastFail(error?.message);
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
  return useMutation(addPayoutPartner, {
    onSuccess: (success: any) => {
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};
const updatePayoutPartner = (data: any) => {
  return NeoHttpClient.put<NeoResponse<IPayoutPartnerRequest>>(
    api.masterData.payout_partner.update.replace("{id}", data.id + ""),
    data
  );
};
const useUpdatePayoutPartner = () => {
  return useMutation(updatePayoutPartner, {
    onSuccess: (success: any) => {
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};
const deletePayoutPartner = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.masterData.payout_partner.update.replace("{id}", id + "")
  );
};
const useDeletePayoutPartner = () => {
  return useMutation(deletePayoutPartner, {
    onSuccess: (success: any) => {
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};

export {
  useAddPayoutPartner,
  useDeletePayoutPartner,
  useGetAllPayoutPartners,
  useGetPayoutPartnerById,
  useUpdatePayoutPartner
};
