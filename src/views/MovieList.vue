<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        class="col-md-6 col-lg-4 col-xl-3"
        v-for="movie of movies"
        :key="movie.id"
      >
        <movie-list-card :movie="movie" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import MovieListCard from "@/components/MovieListCard.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "MovieList",

  components: { MovieListCard },

  computed: {
    ...mapState(["movies"]),
  },

  beforeMount() {
    this.getMovies();
  },

  methods: {
    ...mapActions(["getMovies"]),
  },
};
</script>
