import Vue from "vue";
import Vuex from "vuex";
import { Artist, Prooject, Release } from "@/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    artists: [] as Artist[],
    artistsPromise: null,

    prooject: {} as Prooject,
    proojects: [] as Prooject[],

    release: {} as Release,
    releases: [] as Release[],
    releasesPromise: null,
  },

  getters: {
    getArtistBySlug: (state) => (slug: string) => {
      return state.artists.find((artist: Artist) => artist.slug === slug);
    },
  },

  mutations: {
    SET_ARTISTS(state, artists): void {
      state.artists = artists;
    },
    SET_ARTISTS_PROMISE(state, promise): void {
      state.artistsPromise = promise;
    },

    SET_PROOJECT(state, prooject): void {
      const index = state.proojects.findIndex(
        (item) => item.slug === prooject.slug
      );
      state.proojects[index] = prooject;
      state.prooject = prooject;
    },
    SET_PROOJECTS(state, proojects): void {
      state.proojects = proojects;
    },

    SET_RELEASE(state, release): void {
      const index = state.releases.findIndex(
        (item) => item.slug === release.slug
      );
      state.releases[index] = release;
      state.release = release;
    },
    SET_RELEASES(state, releases): void {
      state.releases = releases;
    },
    SET_RELEASES_PROMISE(state, promise): void {
      state.releasesPromise = promise;
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
        .then((artists) => commit("SET_ARTISTS", artists))
        .catch((error) => console.log("getArtists", error));

      commit("SET_ARTISTS_PROMISE", promise);

      return promise;
    },

    async getProoject(
      { state, commit, dispatch },
      slug: string
    ): Promise<Prooject> {
      if (!state.proojects.length) {
        dispatch("getProojects");
      }
      const prooject = state.proojects.find(
        (prooject) => prooject.slug === slug
      );
      if (prooject?.tracks.length > 3) {
        return commit("SET_PROOJECT", prooject);
      }
      return fetch(`${process.env.VUE_APP_API_URL}/proojects/${slug}`)
        .then((res) => res.json())
        .then((res) => commit("SET_PROOJECT", res))
        .catch((error) => console.log("get prooject", error));
    },

    async getProojects({ state, commit }): Promise<Prooject[]> {
      if (state.proojects.length) {
        return state.proojects;
      }

      return fetch(`${process.env.VUE_APP_API_URL}/proojects`)
        .then((res) => res.json())
        .then((res) => commit("SET_PROOJECTS", res))
        .catch((error) => console.log("get proojects", error));
    },

    async getRelease({ state, commit, dispatch }, slug: string) {
      if (!state.releases.length) {
        dispatch("getReleases");
      }
      const release = state.releases.find((release) => release.slug === slug);
      if (release?.tracks) {
        return commit("SET_RELEASE", release);
      }
      return fetch(`${process.env.VUE_APP_API_URL}/releases/${slug}`)
        .then((res) => res.json())
        .then((res) => commit("SET_RELEASE", res))
        .catch((error) => console.log("get release", error));
    },

    async getReleases({ state, commit }) {
      if (state.releases.length) {
        return state.releases;
      }

      if (state.releasesPromise) {
        return state.releasesPromise;
      }

      const promise = fetch(`${process.env.VUE_APP_API_URL}/releases`)
        .then((res) => res.json())
        .then((res) => commit("SET_RELEASES", res))
        .catch((error) => console.log("get releases", error));

      commit("SET_RELEASES_PROMISE", promise);

      return promise;
    },
  },
});
