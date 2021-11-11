<template>
  <div class="sidebar" :class="{ scrolled: scrolled }">
    <v-list>
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
            :src="`${publicPath}/img/releases/${release.ref}/${release.ref}_150px.jpg`"
            :alt="`${release.title} artwork`"
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
  </div>
</template>

<script lang="ts">
import { mapState } from "vuex";
export default {
  name: "TheSidebarReleases",

  data: () => ({
    publicPath: process.env.VUE_APP_URL,
  }),

  props: {
    scrolled: {
      type: Boolean,
    },
  },

  computed: {
    ...mapState(["releases"]),
  },
};
</script>

<style scoped>
.sidebar {
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  margin-top: 95px;
  overflow-y: auto;
}
.scrolled.sidebar {
  margin-top: 56px;
}

.v-list-item__title,
.v-list-item__subtitle {
  white-space: break-spaces;
}
</style>

