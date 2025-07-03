import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "src/router";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  BiStarHalf,
  BiStarFill,
  BiStar,
  GiExitDoor,
  CoMoon,
  MdRatereview,
  MdAccountbox,
  MdDashboardcustomize,
  FaRegularTrashAlt,
  FaEdit,
  IoCloseSharp,
  FcCheckmark,
} from "oh-vue-icons/icons";

addIcons(
  BiStarHalf,
  BiStarFill,
  BiStar,
  GiExitDoor,
  CoMoon,
  MdRatereview,
  MdAccountbox,
  MdDashboardcustomize,
  FaRegularTrashAlt,
  FaEdit,
  IoCloseSharp,
  FcCheckmark
);

import "./style.css";
import App from "./App.vue";
import Vue3Toastify, { ToastContainerOptions } from "vue3-toastify";

const app = createApp(App);

app
  .component("v-icon", OhVueIcon)
  .use(router)
  .use(createPinia())
  .use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions)
  .mount("#app");
