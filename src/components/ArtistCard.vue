<template>
  <v-card :to="`/artists/${artist.slug}`" style="height: 100%">
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-card-title class="text-h5 d-flex flex-nowrap">
        <span>{{ artist.name }}</span>
        <span>
          <v-icon
            v-for="category in artist.categories"
            :key="category.slug"
            class="ml-2"
            v-text="category.icon"
          />
        </span>
      </v-card-title>

      <v-avatar class="ma-3" size="75" tile>
        <img :src="imgUrl" alt="artist photo" />
      </v-avatar>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Artist } from "@/types";
import { PropType } from "vue";
export default {
  name: "ArtistCard",

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
