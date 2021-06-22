<template>
  <v-container fluid>
    <v-row class="align-stretch">
      <v-col
        cols="12"
        :class="{
          'col-lg-6 col-xl-4': artist.isActive,
          'col-md-6 col-lg-4 col-xl-3': !artist.isActive,
        }"
        v-for="artist of artists"
        :key="artist.slug"
      >
        <artist-card :artist="artist" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import ArtistCard from "@/components/ArtistCard.vue";
import { mapState } from "vuex";
export default {
  name: "ArtistList",

  components: { ArtistCard },

  computed: {
    ...mapState(["artists"]),
  },

  async beforeMount() {
    this.$store.dispatch("getArtists");
  },
};
</script>
