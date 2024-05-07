import { IInitData } from "@neo/services/service-init";
import create from "zustand";

interface IInitDataStore {
  initData?: IInitData;
  setInitData: (initData?: IInitData) => void;
}

export const useStoreInitData = create<IInitDataStore>(set => ({
  initData: undefined,
  setInitData: initData => set(state => ({ ...state, initData }))
}));
