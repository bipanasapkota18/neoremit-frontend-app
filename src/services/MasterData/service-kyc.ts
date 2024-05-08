import NeoToast from "@neo/utility/Toast/Toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../service-api";
import { NeoHttpClient } from "../service-axios";
import { NeoResponse } from "./../service-api";

export interface ICountryFields {
  countryId: number;
  documents: Document[];
  kycFormField: KycFormField[];
}

export interface KycFormField {
  id: number;
  countryDetail: CountryDetail;
  isRequired: boolean;
  display: boolean;
  allowUpdate: boolean;
  keyField: KeyField;
}

export interface KeyField {
  id: number;
  name: string;
  label: string;
  displayOrder: number;
  category: string;
}

export interface CountryDetail {
  id: number;
  name: string;
}

export interface Document {
  id: number;
  documentName: string;
  documentCode: string;
  allowedExtensions: string[];
  documentSize: number;
  isActive: boolean;
}
export interface ICreateFields {
  kycFormFieldId: number | null;
  shouldDisplay: boolean;
  isRequired: boolean;
  allowUpdate: boolean;
}

const getFields = () => {
  return NeoHttpClient.get<NeoResponse<KeyField[]>>(api.masterData.kyc.getAll);
};

const useGetFields = () => {
  return useMutation(getFields, {
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};

const countryFields = (countryId: string | null) => {
  return NeoHttpClient.get<NeoResponse<ICountryFields>>(
    api.masterData.kyc.countryField?.replace("{countryId}", countryId + "")
  );
};

const useCountryFields = () => {
  return useMutation(countryFields, {
    onError: (error: AxiosError<{ message: string }>) => {
      NeoToast({
        type: "error",
        message: error?.response?.data?.message ?? error?.message
      });
    }
  });
};

const saveKycFormFieldRequired = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse>(
    api.masterData.kyc.updateRequired.replace("{id}", `${id}`)
  );
};
const useSaveKycFormFieldRequired = (id: number | null) => {
  return useQuery(
    [id, api.masterData.kyc.updateRequired],
    () => saveKycFormFieldRequired(id),
    {
      enabled: !!id,
      onError: (error: AxiosError<{ message: string }>) => {
        NeoToast({
          type: "error",
          message: error?.response?.data?.message ?? error?.message
        });
      }
    }
  );
};

const saveKycFormFieldDisplay = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse>(
    api.masterData.kyc.displayRequired.replace("{id}", `${id}`)
  );
};

const useSaveKycFormFieldDisplay = (id: number | null) => {
  return useQuery(
    [id, api.masterData.kyc.displayRequired],
    () => saveKycFormFieldDisplay(id),
    {
      enabled: !!id,
      onError: (error: AxiosError<{ message: string }>) => {
        NeoToast({
          type: "error",
          message: error?.response?.data?.message ?? error?.message
        });
      }
    }
  );
};
const saveKycFormFieldallowUpdate = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse>(
    api.masterData.kyc.allowupdateRequired.replace("{id}", `${id}`)
  );
};
const usesaveKycFormFieldallowUpdate = (id: number | null) => {
  return useQuery(
    [id, api.masterData.kyc.allowupdateRequired],
    () => saveKycFormFieldallowUpdate(id),
    {
      enabled: !!id,
      onError: (error: AxiosError<{ message: string }>) => {
        NeoToast({
          type: "error",
          message: error?.response?.data?.message ?? error?.message
        });
      }
    }
  );
};

const formFieldCreate = ({
  data,
  id
}: {
  data: ICreateFields[];
  id: number | null;
}) => {
  return NeoHttpClient.post<NeoResponse>(
    api.masterData.kyc.kycFormField.replace("{id}", id + ""),
    data
  );
};
const useFormFieldCreate = () => {
  const queryCLient = useQueryClient();
  return useMutation(formFieldCreate, {
    onSuccess: success => {
      queryCLient.invalidateQueries(api.masterData.kyc.countryField);
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

export {
  useCountryFields,
  useFormFieldCreate,
  useGetFields,
  useSaveKycFormFieldDisplay,
  useSaveKycFormFieldRequired,
  usesaveKycFormFieldallowUpdate
};
