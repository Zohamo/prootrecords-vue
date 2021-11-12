<template>
  <div>
    <v-app-bar class="pa-2" fixed height="auto" :class="{ shrink: shrink }">
      <v-app-bar-title class="mr-8">
        <router-link to="/">
          <h1 class="proot--text">Proot</h1>
        </router-link>
        <v-subheader> frivolous &amp; original music </v-subheader>
      </v-app-bar-title>

      <div
        v-for="navLink in navLinks"
        :key="navLink.name"
        class="d-none d-lg-block"
      >
        <v-list-item
          v-if="!navLink.children"
          :to="navLink.name"
          class="nav-item"
        >
          <v-list-item-content>
            <v-list-item-title
              class="primary--text text-uppercase"
              v-text="navLink.text"
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-else link class="nav-item">
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

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="d-lg-none"
            to="/releases"
            icon
            :small="shrink"
            :x-large="!shrink"
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon v-text="'mdi-disc'" />
          </v-btn>
        </template>
        <span v-text="'Releases'" />
      </v-tooltip>

      <v-tooltip
        bottom
        v-for="socialLink in socialLinks"
        :key="socialLink.name"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="d-none d-md-flex"
            :href="socialLink.url"
            icon
            :small="shrink"
            :x-large="!shrink"
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon v-text="socialLink.icon" />
          </v-btn>
        </template>
        <span v-text="socialLink.name" />
      </v-tooltip>

      <v-app-bar-nav-icon
        color="primary"
        class="d-lg-none"
        :small="shrink"
        :x-large="!shrink"
        @click.stop="drawer = !drawer"
      />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      v-show="drawer"
      fixed
      bottom
      temporary
      class="text-center"
    >
      <div class="d-flex pa-3">
        <v-btn
          class="ml-auto"
          icon
          x-large
          color="primary"
          @click.stop="drawer = false"
        >
          <v-icon v-text="'mdi-close'" />
        </v-btn>
      </div>

      <div class="pa-3">
        <router-link to="/">
          <h1 class="proot--text">Proot</h1>
        </router-link>
        <v-subheader class="d-block mx-auto">
          frivolous &amp; original music
        </v-subheader>
      </div>

      <v-list nav dense class="my-5 d-flex flex-column">
        <div v-for="navLink in navLinks" :key="navLink.name">
          <v-list-item
            v-if="!navLink.children"
            :to="navLink.name"
            class="nav-item"
          >
            <v-list-item-content>
              <v-list-item-title
                class="primary--text text-uppercase"
                v-text="navLink.text"
                style="font-size: 2rem; line-height: 2rem"
              />
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>

      <v-tooltip
        bottom
        v-for="socialLink in socialLinks"
        :key="socialLink.name"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :href="socialLink.url"
            icon
            :small="shrink"
            :x-large="!shrink"
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon v-text="socialLink.icon" />
          </v-btn>
        </template>
        <span v-text="socialLink.name" />
      </v-tooltip>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
export default {
  name: "TheHeader",

  props: {
    shrink: {
      type: Boolean,
    },
  },

  data: () => ({
    drawer: false,
    navLinks: [
      { name: "/about", text: "about" },
      { name: "/artists", text: "artists" },
      { name: "/movies", text: "movies" },
      { name: "/proojects", text: "proojects", children: [] },
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
          this.navLinks[3].children.push({
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
h1,
.v-subheader,
.v-list-item__content,
v-btn--icon {
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
h1 {
  font-size: 3rem;
  line-height: 3rem;
}
.shrink h1 {
  font-size: 2rem;
  line-height: 2rem;
}
.v-subheader {
  height: 1rem;
  opacity: 1;
  overflow: hidden;
}
.shrink .v-subheader {
  height: 0;
  opacity: 0;
}
.nav-item.v-list-item {
  min-height: auto;
}
.shrink .v-list-item__content {
  padding: 6px 0 !important;
}

.v-btn--icon {
  margin-left: 0;
}
.shrink .v-btn--icon {
  margin-left: 8px;
}

.mdi-cards-diamond {
  transform: rotate(55deg);
}

.v-navigation-drawer--bottom.v-navigation-drawer--is-mobile {
  max-height: none;
}
</style>
