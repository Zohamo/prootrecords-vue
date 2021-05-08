<template>
  <div>
    <release-card :release="lastRelease" />
  </div>
</template>

<script lang="ts">
import ReleaseCard from "@/components/ReleaseCard.vue";
import ReleaseService from "@/services/ReleaseService";
import { Release } from "@/types";
import Vue from "vue";

export default Vue.extend({
  name: "Home",

  components: {
    ReleaseCard,
  },

  data: () => ({
    lastRelease: {} as Release,
  }),

  created() {
    ReleaseService.get("last").then((release) => {
      this.lastRelease = release;
    });
  },
});
</script>
