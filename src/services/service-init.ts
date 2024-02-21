import { AxiosError } from "axios";
import { atom, useSetAtom } from "jotai";
import { useQuery } from "react-query";
import { NeoResponse, api } from "./service-api";
import { NeoHttpClient } from "./service-axios";

export interface Module {
  moduleCode: string;
  moduleName: string;
  scopes: string;
}
export interface IInitData {
  id: number;
}

const fetchInitData = () => () => {
  return NeoHttpClient.get<NeoResponse<IInitData>>(api.init);
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
