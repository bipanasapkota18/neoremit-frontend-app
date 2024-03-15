import { toastFail } from "@neo/utility/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
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
const getAllCountries = ({ pageParams, filterParams }: IFilterParams) => {
  return NeoHttpClient.post<NeoResponse>(
    api.masterData.country.getAll,
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
const useGetAllCountries = () => {
  return useMutation(getAllCountries, {
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};

const getCountryList = () => {
  return NeoHttpClient.get<NeoResponse>(api.masterData.country.getList);
};
const useGetCountryList = () => {
  return useQuery(api.masterData.country.getList, getCountryList, {
    select: data => data?.data?.data,
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};

export { useGetAllCountries, useGetCountryList };
