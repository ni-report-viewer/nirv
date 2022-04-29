// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
import { createPinia, PiniaVuePlugin } from "pinia";
import App from "./App";
import router from "./router/index";

const debug = process.env.NODE_ENV !== "production";

Vue.config.productionTip = false;
Vue.config.performance = debug;

Vue.use(PiniaVuePlugin);
Vue.use(VueCompositionAPI);
const pinia = createPinia();

/* eslint-disable no-new */
new Vue({
  pinia,
  el: "#app",
  router: router,
  components: { App },
  template: "<App/>",
});
