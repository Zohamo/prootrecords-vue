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

<script>
import ReleaseCard from "@/components/ReleaseCard.vue";
import { mapActions } from "vuex";
export default {
  components: { ReleaseCard },
  data() {
    return {};
  },

  methods: {
    ...mapActions(["getReleases"]),
  },

  computed: {
    releases() {
      return this.$store.state.releases;
    },
  },

  created() {
    this.getReleases();
  },
};
</script>
