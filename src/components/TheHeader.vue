<template>
  <v-app-bar class="pa-2" fixed hide-on-scroll height="auto">
    <v-app-bar-title class="mr-8">
      <router-link to="/">
        <h1 class="proot--text" style="font-size: 3rem; line-height: 3rem">
          Proot
        </h1>
      </router-link>
      <v-subheader style="height: auto">
        frivolous &amp; original music
      </v-subheader>
    </v-app-bar-title>

    <div v-for="navLink in navLinks" :key="navLink.name">
      <v-list-item v-if="!navLink.children" :to="navLink.name">
        <v-list-item-content>
          <v-list-item-title
            class="primary--text text-uppercase"
            v-text="navLink.text"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-else link>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-content>
              <v-list-item-title
                class="primary--text text-uppercase"
                v-bind="attrs"
                v-on="on"
                v-text="navLink.text"
              />
            </v-list-item-content>
          </template>

          <v-list>
            <v-list-item
              v-for="navLinkChild in navLink.children"
              :key="navLinkChild.name"
              :to="navLink.name + navLinkChild.name"
            >
              <v-list-item-title v-text="navLinkChild.text" />
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>
    </div>

    <v-spacer />

    <v-tooltip bottom v-for="socialLink in socialLinks" :key="socialLink.name">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :href="socialLink.url"
          icon
          x-large
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon v-text="socialLink.icon" />
        </v-btn>
      </template>
      <span v-text="socialLink.name" />
    </v-tooltip>
  </v-app-bar>
</template>

<script lang="ts">
import { mapState } from "vuex";
export default {
  name: "TheHeader",

  data: () => ({
    navLinks: [
      { name: "/about", text: "about" },
      { name: "/artists", text: "artists" },
      // { name: "/movies", text: "movies" },
      {
        name: "/proojects",
        text: "proojects",
        children: [],
      },
      { name: "/releases", text: "releases" },
      { name: "/shop", text: "shop" },
    ],
    socialLinks: [
      {
        name: "Bandcamp",
        url: "https://prootrecords.bandcamp.com/",
        icon: "mdi-cards-diamond",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/proot_rec/",
        icon: "mdi-instagram",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/Prootrecords",
        icon: "mdi-facebook",
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/channel/UCfsvySaVOwLZwt1tLna3vCQ/",
        icon: "mdi-youtube",
      },
    ],
  }),

  computed: {
    ...mapState(["proojects"]),
  },

  watch: {
    proojects() {
      if (this.proojects.length) {
        this.proojects.forEach((prooject) => [
          this.navLinks[2].children.push({
            name: "/" + prooject.slug,
            text: prooject.title,
          }),
        ]);
      }
    },
  },
};
</script>

<style scoped>
.mdi-cards-diamond {
  transform: rotate(55deg);
}
</style>
