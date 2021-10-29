<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        class="col-sm-6 col-md-4 col-lg-3 col-xl-2"
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
import { mapState } from "vuex";
export default {
  name: "ReleaseList",

  components: { ReleaseCard },

  computed: {
    ...mapState(["releases"]),
  },
};
</script>
