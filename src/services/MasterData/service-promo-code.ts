import { toastFail } from "@neo/utility/Toast";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";
import { IPageParams } from "./master-data-common-interface";

// interface IFilterItems {
// }
interface IFilterParams {
  pageParams?: IPageParams;
  filterParams: any;
  //   filterParams: IFilterItems;
}
const getAllPromoCode = ({ pageParams, filterParams }: IFilterParams) => {
  return NeoHttpClient.post<NeoResponse>(
    api.masterData.promo_code.getAll,
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
const useGetAllPromoCode = () => {
  return useMutation(getAllPromoCode, {
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
export { useGetAllPromoCode };
