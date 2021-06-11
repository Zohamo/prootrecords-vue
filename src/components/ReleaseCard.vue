<template>
  <v-card :to="'/releases/' + release.slug">
    <v-img
      :src="`https://prootrecords.com/music/${this.release.ref}/${this.release.ref}_500px.jpg`"
    />

    <v-card-subtitle class="text-h5 pb-0" v-html="release.artist" />

    <v-card-title class="text-h4 pt-0" v-html="release.title" />

    <v-card-text class="font-italic pt-0" v-html="release.style" />
  </v-card>
</template>

<script lang="ts">
import { Release } from "@/types";
import Vue from "vue";
import { PropType } from "vue";

export default Vue.extend({
  name: "ReleaseCard",

  props: {
    release: {
      type: Object as PropType<Release>,
      required: true,
    },
  },
});
</script>

<style>
.v-card--link,
.v-card--link .v-image__image {
  transition: all 350ms ease-out;
}
.v-card--link:hover,
.v-card--link:hover .v-image__image {
  transition: all 100ms ease-in;
}
.v-card--link:hover {
  background-color: var(--v-primary-lighten3);
}
.v-card--link .v-image__image {
  filter: sepia(0.3);
}
.v-card--link:hover .v-image__image {
  filter: sepia(0);
}
</style>
