import NeoToast from "@neo/utility/Toast/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CountriesList } from "./MasterData/service-country";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";

export interface IPartnerCommissionDetailRequest {
  paymentMethod: string | null;
  fromAmount: number;
  toAmount: number;
  type: string;
  commission: number;
}

export interface IPartnerCommissionRequest {
  id?: number | null;
  partnerId: number | null;
  commissionCurrencyId: number | null;
  payoutCountryId: number | null;
  partnerCommissionPaymentRequestList?: PartnerCommissionPaymentRequestList[];
}

export interface PartnerCommissionPaymentRequestList {
  paymentMethod: string;
  fromAmount: number;
  toAmount: number;
  type: string;
  commission: number;
}

export interface IPartnerCommissionResponse {
  id: number;
  partner: string;
  commissionCurrencyId: CommonID;
  payoutCountryId: CommonID;
  status: boolean;
}

export interface CommonID {
  id: number;
  name: string;
}

export interface IPartnerCommissionResponseById {
  id: number;
  partner: Partner;
  commissionCurrency: CommonID;
  payoutCountry: CountriesList;
  paymentDetails: any[];
}

export interface Partner {
  id: number;
  companyName: string;
}
const getAllPartnerCommission = () => {
  return NeoHttpClient.get<NeoResponse<IPartnerCommissionResponse[]>>(
    api.partner_commission_setup.getAll
  );
};
const useGetAllPartnerCommissionData = () => {
  return useQuery(
    [api.partner_commission_setup.getAll],
    getAllPartnerCommission,
    {
      select: data => data?.data?.data,
      onError: (error: AxiosError<{ message: string }>) => {
        NeoToast({
          message: error.response?.data.message || "Something went wrong",
          type: "error"
        });
      }
    }
  );
};

const createPartnerCommission = (data: IPartnerCommissionRequest) => {
  return NeoHttpClient.post<NeoResponse>(
    api.partner_commission_setup.create,
    data
  );
};
const useAddPartnerCommission = () => {
  const queryClient = useQueryClient();
  return useMutation(createPartnerCommission, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.partner_commission_setup.getAll);
      NeoToast({
        type: "success",
        message: success?.data?.message
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        message: error.response?.data.message || "Something went wrong",
        type: "error"
      });
    }
  });
};

const updatePartnerCommission = ({
  data,
  id
}: {
  data: IPartnerCommissionRequest;
  id: number;
}) => {
  return NeoHttpClient.put<NeoResponse>(
    api.partner_commission_setup.update.replace(
      "{partnerCommissionId}",
      id + ""
    ),
    data
  );
};
const useUpdatePartnerCommission = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePartnerCommission, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.partner_commission_setup.getAll);
      NeoToast({
        type: "success",
        message: success?.data?.message
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        message: error.response?.data.message || "Something went wrong",
        type: "error"
      });
    }
  });
};

const getPartnerCommissionById = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse<IPartnerCommissionResponseById>>(
    api.partner_commission_setup.getById.replace(
      "{partnerCommissionId}",
      id + ""
    )
  );
};
const useGetPartnerCommissionById = (id: number | null) => {
  return useQuery(
    [api.partner_commission_setup.getById, id],
    () => getPartnerCommissionById(id),
    {
      enabled: !!id,
      select: data => data?.data?.data,
      onError: (error: AxiosError<{ message: string }>) => {
        NeoToast({
          message: error.response?.data.message || "Something went wrong",
          type: "error"
        });
      }
    }
  );
};

const deletePartnerCommission = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.partner_commission_setup.delete.replace(
      "{partnerCommissionId}",
      id + ""
    )
  );
};
const useDeletePartnerCommission = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePartnerCommission, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.partner_commission_setup.getAll);
      NeoToast({
        type: "success",
        message: success?.data?.message
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        message: error.response?.data.message || "Something went wrong",
        type: "error"
      });
    }
  });
};

const toggleStatus = (id: number | null) => {
  return NeoHttpClient.put<NeoResponse>(
    api.partner_commission_setup.toggleStatus.replace("{id}", id + "")
  );
};
const useTogglePartnerCommissionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleStatus, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.partner_commission_setup.getAll);
      NeoToast({
        type: "success",
        message: success?.data?.message
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        message: error.response?.data.message || "Something went wrong",
        type: "error"
      });
    }
  });
};

const addPartnerCommissionDetails = ({
  id,
  data
}: {
  id: number | null;
  data: IPartnerCommissionDetailRequest;
}) => {
  return NeoHttpClient.post<NeoResponse>(
    api.partner_commission_details.create.replace(
      "{partnerCommissionId}",
      id + ""
    ),
    data
  );
};
const useAddPartnerCommissionDetails = () => {
  const queryClient = useQueryClient();
  return useMutation(addPartnerCommissionDetails, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.partner_commission_setup.getById);
      NeoToast({
        type: "success",
        message: success?.data?.message
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        message: error.response?.data.message || "Something went wrong",
        type: "error"
      });
    }
  });
};

const updatePartnerCommissionDetails = ({
  id,
  data
}: {
  id: number;
  data: IPartnerCommissionDetailRequest;
}) => {
  return NeoHttpClient.put<NeoResponse>(
    api.partner_commission_details.update.replace("{id}", id + ""),
    data
  );
};
const useUpdatePartnerCommissionDetails = () => {
  const queryClient = useQueryClient();
  return useMutation(updatePartnerCommissionDetails, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.partner_commission_setup.getById);
      NeoToast({
        type: "success",
        message: success?.data?.message
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        message: error.response?.data.message || "Something went wrong",
        type: "error"
      });
    }
  });
};

const deletePartnerCommissionDetails = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.partner_commission_details.delete.replace("{id}", id + "")
  );
};
const useDeletePartnerCommissionDetails = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePartnerCommissionDetails, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.partner_commission_setup.getById);
      NeoToast({
        type: "success",
        message: success?.data?.message
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        message: error.response?.data.message || "Something went wrong",
        type: "error"
      });
    }
  });
};
export {
  useAddPartnerCommission,
  useAddPartnerCommissionDetails,
  useDeletePartnerCommission,
  useDeletePartnerCommissionDetails,
  useGetAllPartnerCommissionData,
  useGetPartnerCommissionById,
  useTogglePartnerCommissionStatus,
  useUpdatePartnerCommission,
  useUpdatePartnerCommissionDetails
};
