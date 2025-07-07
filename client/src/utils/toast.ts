import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

type ToastType = "success" | "error";

export const showToast = (text: string, type: ToastType = "success") => {
  toast[type](text, {
    position: toast.POSITION.TOP_CENTER,
  });
};
