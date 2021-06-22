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
import { PropType } from "vue";
export default {
  name: "ReleaseCard",

  props: {
    release: {
      type: Object as PropType<Release>,
      required: true,
    },
  },
};
</script>
