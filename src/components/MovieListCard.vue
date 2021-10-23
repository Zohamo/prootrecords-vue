<template>
  <v-card :to="'/movies/' + movie.slug">
    <v-img
      :src="require(`../assets/img/movies/${movie.slug}.jpg`)"
      :aspect-ratio="16 / 9"
      alt="movie preview"
    />
    <v-card-subtitle class="text-h5 pb-0" v-html="movie.artist" />
    <v-card-title class="text-h4 pt-0" v-html="movie.title" />
  </v-card>
</template>

<script lang="ts">
import { Movie } from "@/types";
import { PropType } from "vue";
export default {
  name: "MovieListCard",

  props: {
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
  },
};
</script>
