<template>
  <div style="width: 100%; height: 100%">
    <v-slide-x-transition :hide-on-leave="true">
      <v-row>
        <v-col v-if="release" cols="9" style="max-width: 1000px">
          <div class="d-flex flex-column">
            <v-subheader class="primary--text" v-html="'Last Release'" />
            <last-release :release="release" />
          </div>
        </v-col>
        <v-col>
          <div class="d-flex flex-column">
            <v-subheader
              class="primary--text"
              v-html="'Prootjects &middot; Last Entries'"
            />
            <v-card>
              <home-prooject-list-item
                v-for="prooject of proojects"
                :key="prooject.id"
                :prooject="prooject"
              />
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-slide-x-transition>
  </div>
</template>

<script lang="ts">
import LastRelease from "@/components/LastRelease.vue";
import HomeProojectListItem from "@/components/HomeProojectListItem.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",

  components: { LastRelease, HomeProojectListItem },

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
