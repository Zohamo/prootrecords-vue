<template>
  <v-container>
    <v-row>
      <v-col>
        <img v-if="imgUrl" :src="imgUrl" alt="artwork" />

        <iframe
          style="border: 0; width: 500px; height: 472px"
          :src="
            'https://bandcamp.com/EmbeddedPlayer/album=' +
            release.bandcampId +
            '/size=large/bgcol=333333/linkcol=ffffff/artwork=none/transparent=true/'
          "
          seamless
        />
      </v-col>

      <v-col>
        <h2 class="d-flex flex-column">
          <span class="text-h3">{{ release.artist }}</span>
          <span class="text-h2">{{ release.title }}</span>
        </h2>

        <p class="text-subtitle-2">{{ release.datePublished | year }}</p>

        <v-card
          v-if="release.description"
          elevation="2"
          shaped
          v-html="release.description"
          class="px-8 pt-8 pb-4 my-8"
        />
      </v-col>
    </v-row>
    <div class="d-flex"></div>
  </v-container>
</template>

<script lang="ts">
import { Release } from "@/types";
import Vue from "vue";
import { PropType } from "vue";

export default Vue.extend({
  name: "ReleaseCard",

  props: {
    release: {
      type: Object as PropType<Release>,
      required: true,
    },
  },

  computed: {
    imgUrl() {
      if (!this.release) return;
      return `https://prootrecords.com/music/${this.release.ref}/${this.release.ref}-front_500px.jpg`;
    },
  },

  filters: {
    year: (value: string) => {
      return value ? value.split("-")[0] : value;
    },
  },

  data: () => ({}),
});
</script>
