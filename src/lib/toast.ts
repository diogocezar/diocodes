import { toast } from "sonner";

export const dispatchError = (error: any, message?: string) => {
  console.error(`🔥 Houve um erro: ${error}`);
  const displayMessage =
    message || "🚨 Houve um erro. Tente novamente mais tarde!";
  toast.error(displayMessage, {
    cancel: {
      label: "Ok",
    },
    duration: 5000,
    position: "bottom-center",
  });
};

export const dispatchSuccess = (message: string) => {
  toast.success(message, {
    cancel: {
      label: "Ok",
    },
    duration: 5000,
    position: "bottom-center",
  });
};

export const dispatchPromise = (message: string, promise: Promise<any>) => {
  toast.promise(promise, {
    loading: message || "Carregando...",
    cancel: {
      label: "Ok",
    },
    success: "A operação foi realizada com sucesso.",
    error: "🚨 Houve um erro. Tente novamente mais tarde!",
    position: "bottom-center",
  });
};
