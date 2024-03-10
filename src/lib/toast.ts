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
    position: "top-right",
  });
};

export const dispatchSuccess = (message: string) => {
  toast.success(message, {
    cancel: {
      label: "Ok",
    },
    duration: 5000,
    position: "top-right",
  });
};
