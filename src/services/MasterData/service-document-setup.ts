import { toastFail, toastSuccess } from "@neo/utility/Toast";
import { trimObjectValues } from "@neo/utility/helper";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { NeoResponse, api } from "../service-api";
import { NeoHttpClient } from "../service-axios";

export interface IDocumentRequest {
  id?: number | null;
  documentName: string;
  documentCode: string;
  allowedExtensions: string[] | null;
  documentSize: number;
}
export interface IDocumentResponse {
  id: number;
  documentName: string;
  documentCode: string;
  allowedExtensions: string[];
  documentSize: number;
  isActive: boolean;
}
export interface IDocumentExtension {
  id: number;
  extension: string;
}
// interface IFilterItems {
// }

const getAllDocument = () => {
  return NeoHttpClient.get<NeoResponse<IDocumentResponse[]>>(
    api.masterData.document.getAll
  );
};

const useGetAllDocument = () => {
  return useQuery(api.masterData.document.getAll, getAllDocument, {
    select: data => data?.data?.data,
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};
const getDocumentExtension = () => {
  return NeoHttpClient.get<NeoResponse<IDocumentExtension>>(
    api.masterData.document.extension
  );
};
const useGetAllExtensions = () => {
  return useQuery(api.masterData.document.extension, getDocumentExtension, {
    select: data => data?.data?.data,
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};
const addDocument = (data: IDocumentRequest) => {
  return NeoHttpClient.post<NeoResponse<IDocumentRequest>>(
    api.masterData.document.create,
    trimObjectValues(data)
  );
};
const useAddDocument = () => {
  const queryClient = useQueryClient();
  return useMutation(addDocument, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.document.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toastFail(error?.response?.data?.message ?? error?.message);
    }
  });
};
const getDocumentById = (id: number | null) => {
  return NeoHttpClient.get<NeoResponse<IDocumentResponse>>(
    api.masterData.document.update.replace("{id}", id + "")
  );
};
const useGetDocumentById = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery(
    [id, api.masterData.document.update],
    () => getDocumentById(id),
    {
      enabled: !!id,
      onSuccess: () => {
        queryClient.invalidateQueries(api.masterData.document.update);
      },
      onError: (error: AxiosError) => {
        toastFail(error?.message);
      }
    }
  );
};
const updateDocument = ({
  id,
  data
}: {
  id: number;
  data: IDocumentRequest;
}) => {
  return NeoHttpClient.post<NeoResponse<IDocumentRequest>>(
    api.masterData.document.update.replace("{id}", id.toString()),
    trimObjectValues(data)
  );
};
const useUpdateDocument = () => {
  const queryClient = useQueryClient();
  return useMutation(updateDocument, {
    onSuccess: success => {
      queryClient.invalidateQueries([api.masterData.document.getAll]);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};

const deleteDocument = (id: number | null) => {
  return NeoHttpClient.delete<NeoResponse>(
    api.masterData.document.update.replace("{id}", id + "")
  );
};
const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteDocument, {
    onSuccess: success => {
      queryClient.invalidateQueries(api.masterData.document.getAll);
      toastSuccess(success?.data?.message);
    },
    onError: (error: AxiosError) => {
      toastFail(error?.message);
    }
  });
};
const toggleStatus = (id: number | null) => () => {
  return NeoHttpClient.get<NeoResponse>(
    api.masterData.document.statusChange.replace("{id}", id + "")
  );
};
const useToggleDocumentStatus = (id: number | null) => {
  const queryClient = useQueryClient();
  return useQuery(
    [api.masterData.document.statusChange, id],
    toggleStatus(id),
    {
      enabled: false,
      onSuccess: success => {
        queryClient.invalidateQueries(api.masterData.document.getAll);
        toastSuccess(success?.data?.message);
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toastFail(error?.response?.data?.message ?? "Error");
      }
    }
  );
};
export {
  useAddDocument,
  useDeleteDocument,
  useGetAllDocument,
  useGetAllExtensions,
  useGetDocumentById,
  useToggleDocumentStatus,
  useUpdateDocument
};
