<template>
  <v-list-item>
    <v-list-item-icon>
      <v-chip v-if="!track.bonus" outlined>{{ track.position }}</v-chip>

      <v-icon v-else small>mdi-plus</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>
        <span
          v-if="releaseArtist !== track.artist"
          v-html="track.artist + ' - '"
          class="grey--text"
        />

        <span v-html="track.title" />
      </v-list-item-title>

      <v-list-item-subtitle v-if="track.info" v-html="track.info.content" />
    </v-list-item-content>

    <v-list-item-action>
      <v-btn v-if="track.url" icon tile :href="track.url" target="_blank">
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import { Track } from "@/types";
import { PropType } from "vue";
export default {
  name: "ReleaseTracklistItem",

  props: {
    track: {
      type: Object as PropType<Track>,
      required: true,
    },

    releaseArtist: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.v-list-item {
  padding: 0;
}
.v-application--is-ltr .v-list-item__icon:first-child {
  margin: 16px auto;
  text-align: center;
  display: block;
  width: 48px;
}
.v-list-item__content {
  margin-left: 24px;
}
.v-list-item__title,
.v-list-item__subtitle {
  white-space: normal;
}
</style>
