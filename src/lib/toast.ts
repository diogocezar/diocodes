import { toast } from "sonner";

export const dispatchError = (error: any) => {
  console.error(`🔥 Houve um erro: ${error}`);
  toast.error("🚨 Oops! Houve um problema. Tente novamente mais tarde!", {
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
