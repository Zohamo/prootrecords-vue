<template>
  <v-app>
    <the-header />

    <the-sidebar />

    <v-main class="px-3" style="margin-top: 95px; margin-left: 200px">
      <v-scale-transition origin="center center">
        <v-btn
          v-show="scrollToTopBtn"
          v-scroll="onScroll"
          class="mx-2"
          fab
          fixed
          bottom
          right
          color="primary"
          title="Scroll to top"
          @click="$vuetify.goTo(0)"
          transition="scale-transition"
        >
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </v-scale-transition>

      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import TheHeader from "@/components/TheHeader.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "App",

  components: { TheHeader, TheSidebar },

  data: () => ({
    scrollToTopBtn: false,
  }),

  beforeMount() {
    this.getProojects();
    this.getReleases();
  },

  methods: {
    ...mapActions(["getProojects", "getReleases"]),

    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.scrollToTopBtn = top > 20;
    },
  },
});
</script>
