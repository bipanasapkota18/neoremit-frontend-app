import NeoToast from "@neo/utility/Toast/Toast";
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

const baseRateSetup = ({ id, data }: { id: number | null; data: any }) => {
  return NeoHttpClient.post(
    api.masterData.base_rate.baseRateSetup.replace("{id}", id + ""),
    data
  );
};
const useBaseRateSetup = () => {
  return useMutation(baseRateSetup, {
    onSuccess: success => {
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

const baseRateConfig = (data: any) => {
  return NeoHttpClient.post(api.masterData.base_rate.baseRateConfig, data);
};
const useBaseRateConfig = () => {
  const queryCLient = useQueryClient();
  return useMutation(baseRateConfig, {
    onSuccess: success => {
      queryCLient.invalidateQueries(api.masterData.base_rate.getBaseRate);
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
export { useBaseRateConfig, useBaseRateSetup, useGetBaseRate };
