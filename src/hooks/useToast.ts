import { useToast as useToastContext } from "../context/ToastContext";

type ToastType = "success" | "error" | "info" | "warning";

export const useToast = () => {
  const { addToast, removeToast, toasts } = useToastContext();

  const showToast = (
    message: string,
    type: ToastType = "info",
    duration = 3000
  ) => {
    addToast(message, type, duration);
  };

  const showSuccess = (message: string, duration?: number) => {
    showToast(message, "success", duration);
  };

  const showError = (message: string, duration?: number) => {
    showToast(message, "error", duration);
  };

  const showInfo = (message: string, duration?: number) => {
    showToast(message, "info", duration);
  };

  const showWarning = (message: string, duration?: number) => {
    showToast(message, "warning", duration);
  };

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeToast,
  };
};
