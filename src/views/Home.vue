<template>
  <div style="width: 100%; height: 100%">
    <v-slide-x-transition :hide-on-leave="true">
      <v-row>
        <v-col v-if="release" cols="9" style="max-width: 1000px">
          <div class="d-flex flex-column">
            <v-subheader class="primary--text">Last Release</v-subheader>
            <last-release :release="release" />
          </div>
        </v-col>
        <v-col>
          <div class="d-flex flex-column">
            <v-subheader class="primary--text"
              >Prootjects &middot; Last Entries</v-subheader
            >
            <v-card>
              <div v-for="prooject of proojects" :key="prooject.id">
                <v-card-title>
                  <div class="d-flex justify-space-between" style="width: 100%">
                    <h3>Prooject {{ prooject.title }}</h3>
                    <v-btn plain :to="'/proojects/' + prooject.slug">
                      <v-icon v-text="'mdi-arrow-right'" />
                    </v-btn>
                  </div>
                </v-card-title>

                <v-list dense>
                  <v-list-item
                    two-line
                    v-for="track of prooject.tracks"
                    :key="track.position"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        <span v-html="track.artist" class="grey--text mr-2" />
                        <span v-html="track.title" />
                      </v-list-item-title>
                      <v-list-item-subtitle
                        v-if="track.info"
                        class="d-inline-block text-truncate"
                        v-html="track.info.content"
                      />
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-slide-x-transition>
  </div>
</template>

<script lang="ts">
import LastRelease from "@/components/LastRelease.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",

  components: { LastRelease },

  computed: {
    ...mapState(["release", "releases", "proojects"]),
  },

  watch: {
    releases() {
      if (this.releases.length) {
        this.getRelease(this.releases[0].slug);
      }
    },
  },

  beforeMount() {
    if (this.releases.length) {
      this.getRelease(this.releases[0].slug);
    }
    this.getProojects();
  },

  methods: {
    ...mapActions(["getRelease", "getProojects"]),
  },
};
</script>

<style scoped>
.v-subheader {
  align-self: flex-end;
  text-transform: uppercase;
}
</style>
