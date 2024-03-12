import { toastFail } from "@neo/components/Toast";
import { toastSuccess } from "@neo/utility/Toast";
import { trimObjectValues } from "@neo/utility/helper";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
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
  isActive: boolean;
}
// interface IFilterItems {
// }
interface IFilterParams {
  pageParams?: IPageParams;
  filterParams: any;
  //   filterParams: IFilterItems;
}
const getAllSourceoffund = ({ pageParams, filterParams }: IFilterParams) => {
  return NeoHttpClient.post<NeoResponse<ISourceOfFundResponse>>(
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
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};
const addSourceoffund = (data: any) => {
  return NeoHttpClient.post<NeoResponse>(
    api.masterData.source_of_fund.create,
    trimObjectValues(data)
  );
};
const useAddSourceOfFund = () => {
  return useMutation(addSourceoffund, {
    onSuccess: success => {
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
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
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
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
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};
export {
  useAddSourceOfFund,
  useDeleteSourceOfFund,
  useGetAllSourceOfFund,
  useUpdateSourceOfFund
};
