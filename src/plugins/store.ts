import Vue from "vue";
import Vuex from "vuex";
import { Artist, Release } from "@/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    artistsPromise: null,
    artists: [] as Artist[],
    releases: [] as Release[],
  },

  getters: {
    getArtistBySlug: (state) => (slug: string) => {
      return state.artists.find((artist: Artist) => artist.slug === slug);
    },
  },

  mutations: {
    SET_ARTISTS_PROMISE(state, promise): void {
      state.artistsPromise = promise;
    },
    SET_ARTISTS(state, artists): void {
      state.artists = artists;
    },

    releases(state, releases): Release[] {
      return (state.releases = releases);
    },
  },

  actions: {
    async getArtists({ state, commit }): Promise<Artist[]> {
      if (state.artists.length) {
        return state.artists;
      }

      if (state.artistsPromise) {
        return state.artistsPromise;
      }

      const promise = fetch(`${process.env.VUE_APP_API_URL}/artists`)
        .then((res) => res.json())
        .then((artists) => {
          commit("SET_ARTISTS", artists);
        })
        .catch((error) => {
          console.log("getArtists", error);
        });

      commit("SET_ARTISTS_PROMISE", promise);

      return promise;
    },

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
