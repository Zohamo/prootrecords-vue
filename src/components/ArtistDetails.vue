<template>
  <v-card>
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-card-title class="text-h2 d-flex flex-nowrap">
        <span class="mr-3">{{ artist.name }}</span>
        <span>
          <v-icon
            v-for="category in artist.categories"
            :key="category.slug"
            class="ml-3"
            v-text="category.icon"
          />
        </span>
      </v-card-title>

      <v-avatar class="ma-3" size="75" tile>
        <v-img :src="imgUrl" :alt="`${artist.name} picture`" />
      </v-avatar>
    </div>

    <v-card-subtitle v-html="artist.description" />

    <v-card-actions v-if="artist.url" class="pt-0">
      <v-btn class="ml-2 mt-5" small plain :href="artist.url" target="_blank">
        <v-icon small class="mr-2" v-text="'mdi-open-in-new'" />
        Link
      </v-btn>
    </v-card-actions>

    <template
      v-if="artist.relationships.movies && artist.relationships.movies.length"
    >
      <v-divider class="mx-4" />

      <v-card-title
        class="primary--text text-uppercase text-h6"
        v-text="'Related movies'"
      />

      <v-row class="px-3">
        <v-col
          cols="12"
          class="col-lg-6 col-xl-4"
          v-for="movie in artist.relationships.movies"
          :key="movie.slug"
        >
          <movie-list-card :movie="movie" class="mb-3" />
        </v-col>
      </v-row>
    </template>

    <template
      v-if="
        artist.relationships.proojects && artist.relationships.proojects.length
      "
    >
      <v-divider class="mx-4" />

      <v-card-title
        class="primary--text text-uppercase text-h6"
        v-text="'Related proojects'"
      />

      <v-list shaped class="px-3">
        <v-list-item
          v-for="prooject in artist.relationships.proojects"
          :key="prooject.slug"
          :to="'/proojects/' + prooject.slug"
        >
          <v-list-item-content>
            <v-list-item-title class="text-h5" v-text="prooject.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>

    <template
      v-if="
        artist.relationships.releases && artist.relationships.releases.length
      "
    >
      <v-divider class="mx-4" />

      <v-card-title
        class="primary--text text-uppercase text-h6 mb-3"
        v-text="'Related releases'"
      />

      <v-row class="px-3">
        <v-col
          cols="12"
          class="col-lg-4 col-xl-3"
          v-for="release in artist.relationships.releases"
          :key="release.slug"
        >
          <div>
            <release-card :release="release" :img-size="'500'" class="mb-3" />
          </div>
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>

<script lang="ts">
import MovieListCard from "@/components/MovieListCard.vue";
import ReleaseCard from "@/components/ReleaseCard.vue";
import { Artist } from "@/types";
import { PropType } from "vue";
export default {
  name: "ArtistDetails",

  components: { MovieListCard, ReleaseCard },

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
