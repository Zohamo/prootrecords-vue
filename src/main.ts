import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./plugins/store";
import vuetify from "./plugins/vuetify";
import "./assets/css/style.css";

Vue.config.productionTip = false;

// Global constants
Vue.prototype.$bandcampBgColor = "ffffff";
Vue.prototype.$bandcampLinkColor = "7B1FA2";

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
