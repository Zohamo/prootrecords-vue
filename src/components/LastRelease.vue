<template>
  <v-card class="pb-8 px-2">
    <v-card-title class="flex-column align-start">
      <div class="d-flex justify-space-between" style="width: 100%">
        <h3 class="text-h3" v-html="release.artist"></h3>
        <v-btn plain :to="'/releases/' + release.slug">
          <v-icon v-text="'mdi-arrow-right'" />
        </v-btn>
      </div>
      <h2 class="text-h2" v-html="release.title"></h2>
    </v-card-title>

    <v-card-subtitle>{{ release.style }}</v-card-subtitle>

    <v-row class="px-6">
      <v-col>
        <v-card tile elevation="3" style="max-width: 500px">
          <v-img
            v-if="releaseImgUrl"
            :src="releaseImgUrl"
            width="500"
            height="500"
            alt="artwork"
          />
        </v-card>
      </v-col>

      <v-col>
        <div class="d-flex flex-column" style="height: 100%; max-width: 700px">
          <v-card tile class="mb-4" style="height: 120px">
            <iframe
              style="border: 0; width: 100%; height: 120px"
              :src="
                'https://bandcamp.com/EmbeddedPlayer/album=' +
                release.bandcampId +
                '/size=large/bgcol=ffffff/linkcol=333333/tracklist=false/artwork=none/transparent=true/'
              "
              seamless
            />
          </v-card>

          <v-card v-if="release.description" class="mb-4">
            <v-virtual-scroll
              class="px-4 pt-4"
              item-height="auto"
              max-height="290"
              v-html="release.description"
            ></v-virtual-scroll>
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
              <span class="text-h6">Download</span>
              <span class="text-body-2 grey--text ml-2">via Bandcamp</span>
            </div>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Link, Release } from "@/types";
import Vue from "vue";
import { PropType } from "vue";

export default Vue.extend({
  name: "LastRelease",

  props: {
    release: {
      type: Object as PropType<Release>,
      required: true,
    },
  },

  computed: {
    releaseImgUrl(): string | void {
      if (!this.release) return;
      return `https://prootrecords.com/music/${this.release.ref}/${this.release.ref}_500px.jpg`;
    },
    releaseDownloadUrl(): string | void {
      if (!this.release.links.length) return;
      return (
        this.release.links.find(
          (link: Link) => link.platform.slug === "bandcamp"
        ).url + "?action=download"
      );
    },
  },
});
</script>
