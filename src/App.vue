<template>
  <v-app>
    <the-header :shrink="scrolled || $vuetify.breakpoint.smAndDown" />

    <the-sidebar class="d-none d-md-block" :scrolled="scrolled" />

    <v-main
      class="px-3"
      :class="{
        'margin-for-sidebar': $vuetify.breakpoint.mdAndUp,
        'margin-for-header-shrinked': scrolled || $vuetify.breakpoint.smAndDown,
      }"
    >
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
    scrolled: false,
    scrollToTopBtn: false,
  }),

  beforeMount() {
    this.getProojects();
    this.getReleases();
  },

  watch: {
    scrolled() {
      this.scrollToTopBtn = this.scrolled;
    },
  },

  methods: {
    ...mapActions(["getProojects", "getReleases"]),

    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.scrolled = top > 20;
    },
  },
});
</script>

<style scoped>
.margin-for-sidebar {
  margin-left: 200px;
}
main {
  margin-top: 95px;
}
main.margin-for-header-shrinked {
  margin-top: 56px;
}
</style>
