<template>
  <div class="pt-8 px-4" style="width: 100%; height: 100%">
    <base-loader v-if="loading"></base-loader>

    <v-slide-x-transition :hide-on-leave="true">
      <div v-if="!loading">
        <v-row>
          <v-col cols="12" lg="8">
            <header class="d-flex flex-column px-8 pt-2">
              <div class="d-flex justify-space-between">
                <h3 class="text-h3" v-html="movie.artist" />

                <div class="ml-4 d-flex flex-column align-end">
                  <v-subheader class="text-subtitle-2">
                    {{ movie.createdAt | monthYear }}
                  </v-subheader>
                </div>
              </div>

              <h2 class="text-h2" v-html="movie.title" />
            </header>

            <v-card class="px-8 pt-8 pb-4 my-8">
              <v-card-text v-html="movie.embed" />
              <v-card-text v-html="movie.description" />
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-slide-x-transition>
  </div>
</template>

<script lang="ts">
import BaseLoader from "@/components/BaseLoader.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "MovieDetails",

  components: { BaseLoader },

  data: () => ({
    loading: false,
  }),

  watch: {
    "$route.params.slug": {
      handler: function () {
        this.loading = true;
        this.getMovie(this.$route.params.slug).then(() => {
          this.loading = false;
        });
      },
      deep: true,
      immediate: true,
    },
  },

  computed: {
    ...mapState(["movie"]),
  },

  methods: {
    ...mapActions(["getMovie"]),
  },
};
</script>
