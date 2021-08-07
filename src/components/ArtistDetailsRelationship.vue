<template>
  <v-card> </v-card>
</template>

<script lang="ts">
import { Artist } from "@/types";
import { PropType } from "vue";
export default {
  name: "ArtistDetails",

  props: {
    artist: {
      type: Object as PropType<Artist>,
      required: true,
    },
  },

  computed: {
    imgUrl(): string {
      return `https://prootrecords.com/images/artists/${this.artist.slug}.jpg`;
    },
  },
};
</script>
