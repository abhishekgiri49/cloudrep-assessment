import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@sweetalert2/theme-material-ui/material-ui.css";

const MySwal = withReactContent(Swal);

type AlertType = "success" | "error" | "warning" | "info" | "question";

interface AlertOptions extends SweetAlertOptions {
  title?: string;
  text?: string;
  type?: AlertType;
  timer?: number;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  showCancelButton?: boolean;
  cancelButtonText?: string;
}

export const showAlert = (
  options: AlertOptions
): Promise<SweetAlertResult<any>> => {
  return MySwal.fire({
    ...options,
    icon: options.type || "info",
    confirmButtonText: options.confirmButtonText || "OK",
    cancelButtonText: options.cancelButtonText || "Cancel",
  });
};

export const showSuccessAlert = (
  title: string,
  text?: string,
  options?: Omit<AlertOptions, "title" | "text" | "type">
): Promise<SweetAlertResult<any>> => {
  return showAlert({
    title,
    text,
    type: "success",
    ...options,
  });
};

export const showErrorAlert = (
  title: string,
  text?: string,
  options?: Omit<AlertOptions, "title" | "text" | "type">
): Promise<SweetAlertResult<any>> => {
  return showAlert({
    title,
    text,
    type: "error",
    ...options,
  });
};

export const showToast = (
  type: AlertType,
  title: string,
  timer: number = 3000
): Promise<SweetAlertResult<any>> => {
  return MySwal.fire({
    title,
    icon: type,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

export const showSuccessToast = (
  title: string,
  timer?: number
): Promise<SweetAlertResult<any>> => {
  return showToast("success", title, timer);
};

export const showErrorToast = (
  title: string,
  timer?: number
): Promise<SweetAlertResult<any>> => {
  return showToast("error", title, timer);
};

export const showLoadingAlert = (title: string, text?: string): void => {
  MySwal.fire({
    title,
    text,
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    showConfirmButton: false,
    willOpen: () => {
      MySwal.showLoading();
    },
  });
};

export const closeAlert = (): void => {
  MySwal.close();
};
