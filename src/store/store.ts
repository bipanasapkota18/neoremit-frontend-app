import { create } from "zustand";
interface OtpStoreTypes {
  email: string;
  setEmail: (email: string) => void;
}
export const useStore = create<OtpStoreTypes>(set => ({
  email: "",
  setEmail: email => set(state => ({ ...state, email }))
}));
