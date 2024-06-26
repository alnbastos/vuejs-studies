import { createApp } from "vue";
import App from "./App.vue";
import roteador from "./router";
import { key, store } from "./store";

import "@fortawesome/fontawesome-free/css/all.css";

createApp(App)
    .use(roteador)
    .use(store, key)
    .mount("#app")
