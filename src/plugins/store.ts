import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    releases: [],
  },

  mutations: {
    releases(state, releases): Release[] {
      return (state.releases = releases);
    },
  },

  actions: {
    getReleases({ commit }) {
      fetch(`${process.env.VUE_APP_API_URL}/releases`)
        .then((res) => res.json())
        .then((res) => {
          commit("releases", res);
        })
        .catch((error) => {
          console.log("get releases", error);
        });
    },
  },
});
