<template>
  <iframe :style="'border: 0;' + addStyle" :src="src" seamless />
</template>

<script lang="ts">
import colors from "vuetify/lib/util/colors";
export default {
  name: "Player",

  props: {
    id: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "large",
    },
    artwork: {
      type: String,
    },
    tracklist: {
      type: Boolean,
      default: true,
    },
    addStyle: {
      type: String,
    },
  },

  computed: {
    src() {
      let src = "https://bandcamp.com/EmbeddedPlayer";
      src += "/album=" + this.id;
      src += "/size=" + this.size;
      src += "/bgcol=" + colors.grey.lighten5.replace("#", "");
      src += "/linkcol=" + colors.purple.lighten2.replace("#", "");
      if (this.artwork) {
        src += "/artwork=" + this.artwork;
      }
      if (!this.tracklist) {
        src += "/tracklist=false";
      }
      return src + "/transparent=true/";
    },
  },
};
</script>
