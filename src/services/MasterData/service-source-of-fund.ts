import NeoToast from "@neo/utility/Toast/Toast";
import { trimObjectValues } from "@neo/utility/helper";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";
import { IPageParams } from "./master-data-common-interface";

export interface ISourceOfFundResponse {
  id: number;
  name: string;
  code: string;
  isActive: boolean;
}
export interface ISourceOfFundRequest {
  id?: number;
  name: string;
  code: string;
  isActive?: boolean | null | undefined;
}

// interface IFilterItems {
// }
interface IFilterParams {
  pageParams?: IPageParams;
  filterParams: any;
  //   filterParams: IFilterItems;
}
const getAllSourceoffund = ({ pageParams, filterParams }: IFilterParams) => {
  return NeoHttpClient.post<NeoResponse<ISourceOfFundResponse[]>>(
    api.masterData.source_of_fund.getAll,
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
const useGetAllSourceOfFund = () => {
  return useMutation(getAllSourceoffund, {
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};
const addSourceoffund = (data: ISourceOfFundRequest) => {
  return NeoHttpClient.post<NeoResponse<ISourceOfFundRequest>>(
    api.masterData.source_of_fund.create,
    trimObjectValues(data)
  );
};
const useAddSourceOfFund = () => {
  return useMutation(addSourceoffund, {
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
const updateSourceOfFund = ({
  id,
  data
}: {
  id: number;
  data: ISourceOfFundRequest;
}) => {
  return NeoHttpClient.post<NeoResponse<ISourceOfFundRequest>>(
    api.masterData.source_of_fund.update.replace("{id}", id.toString()),
    trimObjectValues(data)
  );
};
const useUpdateSourceOfFund = () => {
  return useMutation(updateSourceOfFund, {
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

const deleteSourceOfFund = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse<ISourceOfFundRequest>>(
    api.masterData.source_of_fund.update.replace("{id}", id + "")
  );
};
const useDeleteSourceOfFund = () => {
  return useMutation(deleteSourceOfFund, {
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
const toggleStatus = (id: number | null) => () => {
  return NeoHttpClient.get<NeoResponse>(
    api.masterData.source_of_fund.statusChange.replace("{id}", id + "")
  );
};
const useToggleSourceStatus = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery(
    [api.masterData.source_of_fund.statusChange, id],
    toggleStatus(id),
    {
      enabled: false,
      onSuccess: success => {
        queryClient.invalidateQueries(api.masterData.source_of_fund.getAll);
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
  useAddSourceOfFund,
  useDeleteSourceOfFund,
  useGetAllSourceOfFund,
  useToggleSourceStatus,
  useUpdateSourceOfFund
};
