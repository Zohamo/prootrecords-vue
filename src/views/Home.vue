<template>
  <div style="width: 100%; height: 100%">
    <loader v-if="loading" />
    <v-slide-x-transition :hide-on-leave="true">
      <div v-if="!loading">
        <v-row>
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
                    <div
                      class="d-flex justify-space-between"
                      style="width: 100%"
                    >
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
                          <span
                            v-html="track.artist"
                            class="grey--text mr-2"
                          ></span>
                          <span v-html="track.title"></span>
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
      </div>
    </v-slide-x-transition>
  </div>
</template>

<script lang="ts">
import LastRelease from "@/components/LastRelease.vue";
import Loader from "@/components/Loader.vue";
import ProojectService from "@/services/ProojectService";
import ReleaseService from "@/services/ReleaseService";
import { Prooject, Release, Track } from "@/types";
import Vue from "vue";

export default Vue.extend({
  name: "Home",

  components: { LastRelease, Loader },

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
});
</script>

<style scoped>
.v-subheader {
  align-self: flex-end;
  text-transform: uppercase;
}
</style>
