<template>
  <v-navigation-drawer fixed permanent width="270">
    <template v-slot:prepend>
      <header class="d-flex flex-column align-center pa-4 pb-0">
        <router-link to="/">
          <h1 class="text-h3">Proot</h1>
        </router-link>

        <v-subheader>frivolous & original music</v-subheader>

        <v-btn
          v-show="releasesPanel"
          plain
          @click="releasesPanel = !releasesPanel"
          style="width: 100%"
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>

        <v-list v-show="!releasesPanel">
          <v-list-item
            v-for="(navLink, i) in navLinks"
            :key="i"
            link
            :to="navLink.name"
          >
            <v-list-item-content>
              <v-list-item-title v-text="navLink.text" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </header>
    </template>

    <template v-slot:default>
      <div class="d-flex flex-column" style="height: 100%">
        <v-spacer />
        <v-divider />

        <div v-show="!releasesPanel">
          <v-btn
            plain
            @click="releasesPanel = !releasesPanel"
            class="text-h5 py-8 px-4 d-flex"
            style="width: 100%"
          >
            <v-icon large v-text="'mdi-disc'" class="mr-4" />
            <span>Releases</span>
            <v-spacer />
            <v-icon v-text="'mdi-chevron-up'" />
          </v-btn>
        </div>

        <v-expand-transition>
          <v-list v-show="releasesPanel">
            <v-list-item
              v-for="release in releases"
              :key="release.ref"
              link
              :to="'/releases/' + release.slug"
              class="d-flex flex-column text-center"
              style="min-height: auto"
            >
              <v-list-item-avatar tile size="150" class="mr-0">
                <v-img
                  :src="`https://prootrecords.com/music/${release.ref}/${release.ref}_150px.jpg`"
                />
              </v-list-item-avatar>

              <v-list-item-content class="pt-0">
                <v-list-item-subtitle v-html="release.artist" />
                <v-list-item-title v-html="release.title" />
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expand-transition>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import ReleaseService from "@/services/ReleaseService";
import { Release } from "@/types";
import Vue from "vue";

export default Vue.extend({
  name: "Sidebar",

  data: () => ({
    releases: [] as Release[],
    navLinks: [
      { name: "/about", text: "about" },
      { name: "/artists", text: "artists" },
      { name: "/movies", text: "movies" },
      { name: "/proojects", text: "proojects" },
      { name: "/releases", text: "releases" },
      { name: "/shop", text: "shop" },
    ],
    releasesPanel: false,
  }),

  created() {
    ReleaseService.all().then((releases) => {
      this.releases = releases;
    });
  },
});
</script>

<style scoped>
header a {
  color: inherit;
  text-decoration: none;
}
</style>
