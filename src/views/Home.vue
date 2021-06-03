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
              <v-subheader class="primary--text">Prootjects</v-subheader>
              <v-card>
                <v-card-title>Classical</v-card-title>
                <v-card-title>VG Unplugged</v-card-title>
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
import ReleaseService from "@/services/ReleaseService";
import { Release } from "@/types";
import Vue from "vue";

export default Vue.extend({
  name: "Home",

  components: { LastRelease, Loader },

  data: () => ({
    loading: true,
    lastRelease: {} as Release,
  }),

  created() {
    ReleaseService.get("last").then((release) => {
      this.lastRelease = release;
      this.loading = false;
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
