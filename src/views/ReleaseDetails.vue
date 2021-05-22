<template>
  <div style="width: 100%; height: 100%">
    <loader v-if="loading" />
    <v-slide-x-transition mode="in" hide-on-leave="true">
      <release-card v-if="!loading" :release="release" />
    </v-slide-x-transition>
  </div>
</template>

<script lang="ts">
import Loader from "@/components/Loader.vue";
import ReleaseCard from "@/components/ReleaseCard.vue";
import ReleaseService from "@/services/ReleaseService";
import { Release } from "@/types";
import Vue from "vue";

export default Vue.extend({
  name: "Home",

  components: {
    Loader,
    ReleaseCard,
  },

  data: () => ({
    release: {} as Release,
    loading: false,
  }),

  watch: {
    "$route.params.slug": {
      handler: function () {
        this.loading = true;
        ReleaseService.get(this.$route.params.slug).then((release) => {
          this.release = release;
          this.loading = false;
        });
      },
      deep: true,
      immediate: true,
    },
  },
});
</script>
