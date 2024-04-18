import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../service-api";
import { NeoHttpClient } from "../service-axios";

const getBaseRate =
  ({ senderId, receiverId }: { senderId: number; receiverId: number | null }) =>
  () => {
    return NeoHttpClient.get(
      api.masterData.base_rate.getBaseRate
        .replace("{senderId}", senderId + "")
        .replace("{receiverId}", receiverId + "")
    );
  };
const useGetBaseRate = ({
  senderId,
  receiverId
}: {
  senderId: number;
  receiverId: number | null;
}) => {
  return useQuery(
    [api.masterData.base_rate.getBaseRate, senderId, receiverId],
    getBaseRate({ senderId, receiverId }),
    {
      enabled: receiverId !== null,
      onSuccess: success => {
        toastSuccess(success?.data?.message);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toastFail(error?.response?.data?.message ?? error?.message);
      }
    }
  );
};

const baseRateSetup = ({ id, data }: { id: number | null; data: any }) => {
  return NeoHttpClient.post(
    api.masterData.base_rate.baseRateSetup.replace("{id}", id + ""),
    data
  );
};
const useBaseRateSetup = () => {
  return useMutation(baseRateSetup, {
    onSuccess: success => {
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};

const baseRateConfig = (data: any) => {
  return NeoHttpClient.post(api.masterData.base_rate.baseRateConfig, data);
};
const useBaseRateConfig = () => {
  const queryCLient = useQueryClient();
  return useMutation(baseRateConfig, {
    onSuccess: success => {
      queryCLient.invalidateQueries(api.masterData.base_rate.getBaseRate);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
export { useBaseRateConfig, useBaseRateSetup, useGetBaseRate };
