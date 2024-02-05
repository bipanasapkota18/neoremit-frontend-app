import { AxiosError } from "axios";
import { atom, useSetAtom } from "jotai";
import { useQuery } from "react-query";
import { TemplateProjectResponse, api } from "./service-api";
import { TemplateProjectHttpClient } from "./service-axios";

export interface Module {
  moduleCode: string;
  moduleName: string;
  scopes: string;
}
export interface IInitData {
  id: number;
}

const fetchInitData = () => () => {
  return TemplateProjectHttpClient.get<TemplateProjectResponse<IInitData>>(
    api.init
  );
};

const useFetchInitData = (enabled?: boolean) => {
  const initDataAtom = atom<IInitData | null>(null);
  const setStoredInitData = useSetAtom(initDataAtom);

  return useQuery([api.init], fetchInitData(), {
    enabled: enabled,
    retry: 1,
    select: ({ data }) => data?.data || {},
    onSuccess: (data: IInitData) => {
      setStoredInitData(data);
    },
    onError: (error: AxiosError) => {
      console.error(error);
    }
  });
};

export { useFetchInitData };
