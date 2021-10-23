import Vue from "vue";
import colors from "vuetify/lib/util/colors";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
import "./assets/css/style.css";

Vue.config.productionTip = false;

Vue.filter("monthYear", (value: string) => {
  return value
    ? [
        "Jan. ",
        "Feb. ",
        "Mar. ",
        "Apr. ",
        "May ",
        "Jun. ",
        "Jul. ",
        "Aug. ",
        "Sep. ",
        "Oct. ",
        "Nov. ",
        "Dec. ",
      ][+value.split("-")[1]] + value.split("-")[0]
    : value;
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
