import NeoToast from "@neo/utility/Toast/Toast";
import { trimObjectValues } from "@neo/utility/helper";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";
export interface ILedgerHeadRequest {
  name: string;
  shortCode: string;
  currencyId: number | null;
  description: string;
  id: number;
}

export interface ILedgerHeadResponse {
  id: number;
  name: string;
  shotCode: string;
  currency: Currency;
  isPartnerLedger: boolean;
  description: string;
  isActive: boolean;
}

export interface Currency {
  id: number;
  name: string;
}

const getAllLedgerList = () => {
  return NeoHttpClient.get<NeoResponse<ILedgerHeadResponse[]>>(
    api.ledger_setup.getAll
  );
};

const useGetAlLedgerlList = () => {
  return useQuery([api.ledger_setup.getAll], getAllLedgerList, {
    select: data => data?.data?.data,
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};

const addLedgerHead = (data: any) => {
  return NeoHttpClient.post<NeoResponse<ILedgerHeadRequest>>(
    api.ledger_setup.create,
    trimObjectValues(data)
  );
};
const useAddLedgerHead = () => {
  const QueryClient = useQueryClient();
  return useMutation(addLedgerHead, {
    onSuccess: success => {
      QueryClient.invalidateQueries(api.ledger_setup.getAll);
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

const updateLedgerHeadStatus = ({
  id,
  data
}: {
  id: number | null;
  data: ILedgerHeadRequest;
}) => {
  return NeoHttpClient.post<NeoResponse>(
    api.ledger_setup.update.replace("{id}", id + ""),
    data
  );
};
const useUpdateLedgerHeadStatus = () => {
  const queryClient = useQueryClient();
  return useMutation(updateLedgerHeadStatus, {
    onSuccess: success => {
      NeoToast({
        type: "success",
        message: success?.data?.message
      });
      queryClient.invalidateQueries(api.ledger_setup.getAll);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};
// for delete

const deleteLedgerHead = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.ledger_setup.update.replace("{id}", id + "")
  );
};

const useDeleteLedgerHead = () => {
  const QueryClient = useQueryClient();
  return useMutation(deleteLedgerHead, {
    onSuccess: success => {
      QueryClient.invalidateQueries(api.ledger_setup.getAll);
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
export {
  useAddLedgerHead,
  useDeleteLedgerHead,
  useGetAlLedgerlList,
  useUpdateLedgerHeadStatus
};
