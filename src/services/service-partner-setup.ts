import NeoToast from "@neo/utility/Toast/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";

export interface IPartnerRequest {
  countryHeadQuarterId: number | null;
  partnerType: string | undefined;
  companyName: string | null;
  address: string | null;
  phoneNumber: string | null;
  emailAddress: string | null;
  timeZone: string | undefined;
  operatingCountryIds: number[] | undefined;
  partnerSettlementInfo: PartnerSettlementInfo;
  partnerContactInfo: PartnerContactInfo[] | undefined;
}

export interface PartnerContactInfo {
  contactName?: string | null;
  designation?: string | null;
  email?: string | null;
}

export interface PartnerSettlementInfo {
  fundingCurrencyId: number | null | undefined;
  localCurrencyId: number | null | undefined;
  transactionLimit: number | null;
  acceptPinNo: boolean;
}

const getAllPartners = () => {
  return NeoHttpClient.get<NeoResponse>(api.partner_setup.getAll);
};
const useGetAllPartners = () => {
  return useQuery([api.partner_setup.getAll], getAllPartners, {
    select: data => data?.data?.data,
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};

const addPartner = (data: IPartnerRequest) => {
  return NeoHttpClient.post<NeoResponse>(api.partner_setup.create, data);
};
const useAddPartner = () => {
  const queryClient = useQueryClient();
  return useMutation(addPartner, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.partner_setup.getAll);
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

const updatePartner = ({
  data,
  id
}: {
  data: IPartnerRequest;
  id: number | null;
}) => {
  return NeoHttpClient.put<NeoResponse>(
    api.partner_setup.update.replace("{partnerId}", id + ""),
    data
  );
};
const useUpdatePartner = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePartner, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.partner_setup.getAll);
      queryClient.invalidateQueries(api.partner_setup.getById);

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

const deletePartner = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.partner_setup.delete.replace("{partnerId}", id + "")
  );
};
const useDeletePartner = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePartner, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.partner_setup.getAll);
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

const togglePartnerStatus = (id: number | null) => {
  return NeoHttpClient.put<NeoResponse>(
    api.partner_setup.statusChange.replace("{id}", id + "")
  );
};
const useTogglePartnerStatus = () => {
  const queryCLient = useQueryClient();
  return useMutation(togglePartnerStatus, {
    onSuccess: success => {
      queryCLient.invalidateQueries(api.partner_setup.getAll);
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

const getPartnerById = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse>(
    api.partner_setup.getById.replace("{partnerId}", id + "")
  );
};
const useGetPartnerById = (id: number | null) => {
  return useQuery([api.partner_setup.getById, id], () => getPartnerById(id), {
    enabled: !!id,
    select: data => data?.data?.data,

    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};

const getAllTimezones = () => {
  return NeoHttpClient.get<NeoResponse>(api.partner_setup.timezone);
};
const useGetAllTimezones = () => {
  return useQuery([api.partner_setup.timezone], getAllTimezones, {
    select: data => data?.data?.data,
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};
export {
  useAddPartner,
  useDeletePartner,
  useGetAllPartners,
  useGetAllTimezones,
  useGetPartnerById,
  useTogglePartnerStatus,
  useUpdatePartner
};
