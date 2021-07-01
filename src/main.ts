import Vue from "vue";
import colors from "vuetify/lib/util/colors";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
import "./assets/css/style.css";

Vue.config.productionTip = false;

// Global constants
Vue.prototype.$bandcampBgColor = colors.grey.darken4.replace("#", "");
Vue.prototype.$bandcampLinkColor = colors.purple.lighten2.replace("#", "");

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
