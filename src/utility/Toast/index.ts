import toast, { Toaster } from "react-hot-toast";

const toastSuccess = (message: string) => {
  toast.success(message, {
    style: {
      padding: "16px"
    },
    iconTheme: {
      primary: "#38A169",
      secondary: "#C6F6D5"
    }
  });
};

const toastFail = (message: string) => {
  toast.error(message, {
    id: message,
    style: {
      padding: "16px"
    }
  });
};

const toastInfo = (message: string) => {
  toast(message, {
    id: message,
    style: {
      color: "#fff",
      border: "1px solid blue",
      padding: "8px",
      backgroundColor: "#1034A6"
    }
  });
};
const toastPromise = (
  promiseAction: Promise<any>,
  id?: string,
  loadingMessage?: string,
  successMessage?: string,
  errorMessage?: string
) => {
  toast.promise(
    promiseAction,
    {
      loading: loadingMessage ?? "Saving...",
      success: successMessage ?? "Success!",
      error: errorMessage ?? "Error!"
    },
    {
      id: id
    }
  );
};

export { Toaster, toastFail, toastInfo, toastPromise, toastSuccess };
