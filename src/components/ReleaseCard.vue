<template>
  <v-card :to="'/releases/' + release.slug">
    <v-img
      :src="`${publicPath}/img/releases/${release.ref}/${release.ref}_${imgSize}px.jpg`"
      :alt="`${release.title} artwork`"
    />

    <v-card-subtitle class="text-h5 pb-0" v-html="release.artist" />

    <v-card-title class="text-h4 pt-0" v-html="release.title" />

    <v-card-text class="font-italic pt-0" v-html="release.style" />
  </v-card>
</template>

<script lang="ts">
import { Release } from "@/types";
import { PropType } from "vue";
export default {
  name: "ReleaseCard",

  data: () => ({
    publicPath: process.env.VUE_APP_URL,
  }),

  props: {
    release: {
      type: Object as PropType<Release>,
      required: true,
    },
    imgSize: {
      type: String,
      default: "500",
    },
  },
};
</script>
