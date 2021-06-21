<template>
  <div class="pt-4 px-3" style="width: 100%; height: 100%">
    <loader v-if="loading" />

    <v-slide-x-transition v-if="!loading" :hide-on-leave="true">
      <v-container class="mx-auto">
        <v-card style="max-width: 1000px">
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
              <v-img
                :src="`https://prootrecords.com/images/artists/${artist.slug}.jpg`"
              />
            </v-avatar>
          </div>

          <v-card-subtitle v-html="artist.description" />
          <v-card-actions v-if="artist.url" class="pt-0">
            <v-btn
              class="ml-2 mt-5"
              small
              plain
              :href="artist.url"
              target="_blank"
            >
              <v-icon small class="mr-2" v-text="'mdi-open-in-new'" />
              Link
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-slide-x-transition>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Loader from "@/components/Loader.vue";
import { Artist } from "@/types";

export default Vue.extend({
  name: "ArtistDetails",

  components: { Loader },

  data: () => ({
    loading: true,
    artist: {} as Artist,
  }),

  watch: {
    "$route.params.slug": {
      handler: function () {
        this.loading = true;
        this.$store.dispatch("getArtists").then(() => {
          this.artist = this.$store.getters.getArtistBySlug(
            this.$route.params.slug
          );
          this.loading = false;
        });
      },
      deep: true,
      immediate: true,
    },
  },
});
</script>
