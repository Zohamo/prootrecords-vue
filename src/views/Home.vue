<template>
  <div style="width: 100%; height: 100%">
    <base-loader v-if="loading"></base-loader>

    <v-slide-x-transition :hide-on-leave="true">
      <v-row v-if="!loading">
        <v-col cols="9" style="max-width: 1000px">
          <div class="d-flex flex-column">
            <v-subheader class="primary--text">Last Release</v-subheader>
            <last-release :release="lastRelease" />
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
import BaseLoader from "@/components/BaseLoader.vue";
import ProojectService from "@/services/ProojectService";
import ReleaseService from "@/services/ReleaseService";
import { Prooject, Release } from "@/types";
export default {
  name: "Home",

  components: { BaseLoader, LastRelease },

  data: () => ({
    loading: true,
    lastRelease: {} as Release,
    proojects: [] as Prooject[],
  }),

  created() {
    ReleaseService.get("last").then((release) => {
      this.lastRelease = release;
      this.loading = false;
    });
    ProojectService.all().then((proojects) => {
      this.proojects = proojects;
    });
  },
};
</script>

<style scoped>
.v-subheader {
  align-self: flex-end;
  text-transform: uppercase;
}
</style>
