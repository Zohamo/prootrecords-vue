<template>
  <v-navigation-drawer fixed permanent width="270">
    <template v-slot:prepend>
      <header class="d-flex flex-column align-center pa-4 pb-0">
        <router-link to="/">
          <h1
            class="proot--text mt-2"
            style="font-size: 3rem; line-height: 3rem"
          >
            Proot
          </h1>
        </router-link>

        <v-subheader class="mb-4" style="height: auto"
          >frivolous & original music</v-subheader
        >

        <v-btn
          v-show="releasesPanel"
          plain
          @click="releasesPanel = !releasesPanel"
          style="width: 100%"
        >
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>

        <v-list v-show="!releasesPanel">
          <div v-for="navLink in navLinks" :key="navLink.name">
            <v-list-group v-if="navLink.children">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title
                    class="primary--text text-uppercase"
                    v-text="navLink.text"
                  />
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="navLinkChild in navLink.children"
                :key="navLinkChild.name"
                :to="navLink.name + navLinkChild.name"
              >
                <v-list-item-content class="pl-4">
                  <v-list-item-title
                    v-text="navLinkChild.text"
                    class="primary--text"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item v-else :to="navLink.name">
              <v-list-item-content>
                <v-list-item-title
                  class="primary--text text-uppercase"
                  v-text="navLink.text"
                />
              </v-list-item-content>
            </v-list-item>
          </div>
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
            class="text-h6 py-8 px-4 d-flex primary--text"
            style="width: 100%"
          >
            <v-icon large v-text="'mdi-disc'" />
            <span class="proot--text mt-1">Releases</span>
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
                <v-list-item-subtitle
                  v-html="release.artist"
                  class="text-uppercase"
                />
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
export default {
  name: "TheSidebar",

  data: () => ({
    releases: [] as Release[],
    navLinks: [
      { name: "/about", text: "about" },
      { name: "/artists", text: "artists" },
      // { name: "/movies", text: "movies" },
      {
        name: "/proojects",
        text: "proojects",
        children: [
          { name: "/vgu", text: "V.G. Unplugged" },
          { name: "/classical", text: "C.l.a.s.s.i.c.a.l." },
        ],
      },
      { name: "/releases", text: "releases" },
      { name: "/shop", text: "shop" },
    ],
    releasesPanel: false,
  }),

  created() {
    ReleaseService.all().then((releases: Release[]) => {
      this.releases = releases;
    });
  },
};
</script>
