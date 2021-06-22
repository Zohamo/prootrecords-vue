<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        class="col-md-6 col-lg-4 col-xl-3"
        v-for="release of releases"
        :key="release.id"
      >
        <release-card :release="release" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import ReleaseCard from "@/components/ReleaseCard.vue";
import { Release } from "@/types";
import { mapActions } from "vuex";
export default {
  name: "ReleaseList",

  components: { ReleaseCard },

  methods: {
    ...mapActions(["getReleases"]),
  },

  computed: {
    releases(): Release[] {
      return this.$store.state.releases;
    },
  },

  beforeMount() {
    this.getReleases();
  },
};
</script>
