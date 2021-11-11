<template>
  <v-card class="pb-8 px-2">
    <v-card-title class="flex-column align-start">
      <div class="d-flex justify-space-between" style="width: 100%">
        <h3 class="text-h3" v-html="release.artist"></h3>
        <v-btn plain :to="'/releases/' + release.slug">
          <v-icon v-text="'mdi-arrow-right'" />
        </v-btn>
      </div>
      <h2 class="text-h2">
        {{ release.title }}
      </h2>
    </v-card-title>

    <v-card-subtitle>{{ release.style }}</v-card-subtitle>

    <div class="d-lg-flex flex-nowrap">
      <div class="px-3 flex-shrink-1">
        <v-img
          v-if="release.ref"
          :src="
            require(`../assets/img/releases/${release.ref}/${release.ref}_500px.jpg`)
          "
          style="width: auto; max-width: 100%"
          :alt="`${release.title} artwork`"
        />
      </div>

      <div
        class="px-3 d-flex flex-column"
        style="height: 100%; max-width: 700px"
      >
        <v-card tile class="mb-4" style="height: 120px">
          <player
            v-if="release && release.bandcampId"
            :id="release.bandcampId"
            size="large"
            artwork="none"
            :tracklist="false"
            add-style="width: 100%; height: 120px"
          />
        </v-card>

        <v-card v-if="release.description" class="mb-4">
          <v-virtual-scroll
            class="px-4 pt-4"
            item-height="auto"
            max-height="290"
            v-html="release.description"
          />
        </v-card>

        <v-btn
          v-if="releaseDownloadUrl"
          :href="releaseDownloadUrl"
          class="flex-grow-0 pa-3 d-flex"
          target="_blank"
          block
          large
          color="primary"
          style="height: auto"
        >
          <v-icon large left>mdi-download</v-icon>
          <div class="ml-2">
            <span class="text-h5">Download</span>
            <span class="text-body-2 ml-2">via Bandcamp</span>
          </div>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Player from "@/components/Player.vue";
import { Link, Release } from "@/types";
import { PropType } from "vue";
export default {
  name: "LastRelease",

  components: { Player },

  props: {
    release: {
      type: Object as PropType<Release>,
      required: true,
    },
  },

  computed: {
    releaseDownloadUrl(): string {
      return this.release?.links && this.release.links.length
        ? this.release.links.find(
            (link: Link) => link.platform.slug === "bandcamp"
          ).url + "?action=download"
        : "";
    },
  },
};
</script>
