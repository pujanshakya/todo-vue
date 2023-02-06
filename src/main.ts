/* eslint-disable vue/multi-word-component-names */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { state } from "./store/index";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPhone, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import "./assets/main.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Toast, { POSITION, type PluginOptions } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import "bootstrap/dist/js/bootstrap.js";

library.add(faPhone, faTrash, faPen);

const app = createApp(App);
const options: PluginOptions = {
  // You can set your default options here
  position: POSITION.BOTTOM_RIGHT,
  timeout: 2000,
};

app.use(Toast, options);

app.use(state);
app.use(VueSweetalert2);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);

app.mount("#app");
