<template>
  <div class="sidebar-releases">
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
          <v-img :src="getReleaseImgUrl(release.ref)" />
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

  computed: {
    ...mapState(["releases"]),
  },

  methods: {
    getReleaseImgUrl(ref: string): string {
      return `https://prootrecords.com/music/${ref}/${ref}_150px.jpg`;
    },
  },
};
</script>

<style scoped>
.sidebar-releases {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  margin-top: 95px;
  overflow-y: auto;
}
.v-list-item__title,
.v-list-item__subtitle {
  white-space: break-spaces;
}
</style>

