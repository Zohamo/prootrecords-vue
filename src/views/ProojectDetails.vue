<template>
  <div class="pt-8 px-4" style="width: 100%; height: 100%">
    <base-loader v-if="loading"></base-loader>

    <v-slide-x-transition :hide-on-leave="true">
      <div v-if="!loading">
        <h1 class="d-flex justify-space-between mb-8 px-8">
          <span class="text-h2">{{ prooject.title }}</span>
          <span class="proot--text">Prooject</span>
        </h1>

        <v-row>
          <v-col cols="7">
            <v-card>
              <v-card-text v-html="prooject.description" class="pb-0" />

              <v-card-title class="text-h4">Concept</v-card-title>
              <v-card-text v-html="prooject.concept" />

              <v-card-title class="text-h4">Process</v-card-title>
              <v-card-text>
                <p>
                  Please send us a message at
                  <a href="mailto:prootrecords@gmail.com"
                    >prootrecords@gmail.com</a
                  >
                  if you know <strong>what track</strong> you intend to cover,
                  so that not too many people have the idea to chose the same
                  track (we’ll sum it up in the submissions).
                </p>
                <p>
                  Once your track finished, please send it with your artist
                  name, the name of your cover, the original composition
                  details, all information is greatly welcomed.
                </p>
                <p>
                  Remember a <strong>prooject</strong>&copy; is like a
                  neverending release, there’s <strong>no deadline</strong>, you
                  can suggest your track whenever you want (as long as there is
                  someone to manage the label).
                </p>
              </v-card-text>

              <v-card-title class="text-h4">Diffusion</v-card-title>
              <v-card-text>
                <p>
                  Once your track polished in our studio, it will appear on this
                  page and Bandcamp, ready to be listened by everyone in the
                  world&nbsp;!
                </p>
                <p>
                  Once there will be enough tracks for a marvelous compilation,
                  the release will appear on the “Releases” part of Proot rec.
                  website.
                </p>
                <p>HAVE FUN and SPREAD THE WOR(L)D&nbsp;!</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="5">
            <player
              v-if="prooject && prooject.bandcampId"
              :id="prooject.bandcampId"
              class="mx-2"
              size="large"
              artwork="none"
              add-style="width: 100%; height: 700px"
            />
          </v-col>
        </v-row>
      </div>
    </v-slide-x-transition>
  </div>
</template>

<script lang="ts">
import BaseLoader from "@/components/BaseLoader.vue";
import Player from "@/components/Player.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "ProojectDetails",

  components: { BaseLoader, Player },

  data: () => ({
    loading: false,
  }),

  watch: {
    "$route.params.slug": {
      handler: function () {
        this.loading = true;
        this.getProoject(this.$route.params.slug).then(() => {
          this.loading = false;
        });
      },
      deep: true,
      immediate: true,
    },
  },

  computed: {
    ...mapState(["prooject"]),
  },

  methods: {
    ...mapActions(["getProoject"]),
  },
};
</script>
