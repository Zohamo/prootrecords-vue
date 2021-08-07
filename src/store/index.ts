import Vue from "vue";
import Vuex from "vuex";
import { Artist, Prooject, Release } from "@/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    artist: {} as Artist,
    artists: [] as Artist[],

    prooject: {} as Prooject,
    proojects: [] as Prooject[],

    release: {} as Release,
    releases: [] as Release[],
  },

  mutations: {
    SET_ARTIST(state, artist): void {
      const index = state.artists.findIndex(
        (item) => item.slug === artist.slug
      );
      state.artists[index] = artist;
      state.artist = artist;
    },

    SET_ARTISTS(state, artists): void {
      state.artists = artists;
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
  },

  actions: {
    async getArtist({ state, commit, dispatch }, slug: string): Promise<void> {
      const artist = state.artists.find((artist) => artist.slug === slug);
      if (artist?.relationships) {
        return commit("SET_ARTIST", artist);
      }
      return fetch(`${process.env.VUE_APP_API_URL}/artists/${slug}`)
        .then((res) => res.json())
        .then((res) => commit("SET_ARTIST", res))
        .catch((error) => console.log("get artist", error));
    },

    async getArtists({ state, commit }): Promise<void> {
      if (state.artists.length) {
        return;
      }
      return fetch(`${process.env.VUE_APP_API_URL}/artists`)
        .then((res) => res.json())
        .then((artists) => commit("SET_ARTISTS", artists))
        .catch((error) => console.log("getArtists", error));
    },

    async getProoject(
      { state, commit, dispatch },
      slug: string
    ): Promise<void> {
      if (!state.proojects.length) {
        dispatch("getProojects");
      }
      const prooject = state.proojects.find(
        (prooject) => prooject.slug === slug
      );
      if (prooject.tracks.length > 3) {
        return commit("SET_PROOJECT", prooject);
      }
      return fetch(`${process.env.VUE_APP_API_URL}/proojects/${slug}`)
        .then((res) => res.json())
        .then((res) => commit("SET_PROOJECT", res))
        .catch((error) => console.log("get prooject", error));
    },

    async getProojects({ state, commit }): Promise<void> {
      if (state.proojects.length) {
        return;
      }
      return fetch(`${process.env.VUE_APP_API_URL}/proojects`)
        .then((res) => res.json())
        .then((res) => commit("SET_PROOJECTS", res))
        .catch((error) => console.log("get proojects", error));
    },

    async getRelease({ state, commit, dispatch }, slug: string): Promise<void> {
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

    async getReleases({ state, commit }): Promise<void> {
      if (state.releases.length) {
        return;
      }
      return fetch(`${process.env.VUE_APP_API_URL}/releases`)
        .then((res) => res.json())
        .then((res) => commit("SET_RELEASES", res))
        .catch((error) => console.log("get releases", error));
    },
  },
});
