<template>
  <div>
    <v-card-title>
      <div class="d-flex justify-space-between" style="width: 100%">
        <h3>Prooject {{ prooject.title }}</h3>

        <v-btn plain :to="'/proojects/' + prooject.slug">
          <v-icon v-text="'mdi-arrow-right'" />
        </v-btn>
      </div>
    </v-card-title>

    <v-list dense>
      <v-list-item
        two-line
        v-for="track of prooject.tracks.slice(0, 3)"
        :key="track.position"
      >
        <v-list-item-content>
          <v-list-item-title>
            <span v-html="track.artist" class="grey--text mr-2" />
            <span v-html="track.title" />
          </v-list-item-title>

          <v-list-item-subtitle
            v-if="track.info"
            class="d-inline-block text-truncate"
            v-html="track.info.content"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Prooject } from "@/types";
import { PropType } from "vue";
export default {
  name: "ProojectHomeListItem",

  props: {
    prooject: {
      type: Object as PropType<Prooject>,
      required: true,
    },
  },
};
</script>
