<template>
  <v-app>
    <the-sidebar />
    <v-main class="px-3" style="margin-left: 270px">
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
import TheSidebar from "@/components/TheSidebar.vue";
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: { TheSidebar },

  data: () => ({
    scrollToTopBtn: false,
  }),

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.scrollToTopBtn = top > 20;
    },
  },
});
</script>
