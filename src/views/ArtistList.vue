<template>
  <div>
    <div v-if="$vuetify.breakpoint.smAndDown">
      <artist-details
        v-if="!loadingArtist && artist && $route.params.slug"
        :artist="artist"
      />

      <artist-list-card
        v-else
        v-for="artist of artists"
        :key="artist.slug"
        :artist="artist"
        class="my-3 mr-3"
      />
    </div>

    <div v-else style="position: relative">
      <v-navigation-drawer
        style="
          position: fixed;
          min-width: 400px;
          max-height: 100vh;
          margin-top: 95px;
          margin-left: 220px;
        "
      >
        <artist-list-card
          v-for="artist of artists"
          :key="artist.slug"
          :artist="artist"
          class="my-3 mr-3"
        />
      </v-navigation-drawer>
      <v-container fluid>
        <artist-details
          v-if="!loadingArtist && artist"
          :artist="artist"
          style="margin-left: 400px"
        />
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import ArtistDetails from "@/components/ArtistDetails.vue";
import ArtistListCard from "@/components/ArtistListCard.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "ArtistList",

  components: { ArtistDetails, ArtistListCard },

  data: () => ({
    loadingArtist: true,
  }),

  computed: {
    ...mapState(["artist", "artists"]),
  },

  watch: {
    "$route.params.slug": {
      handler: function () {
        if (this.$route.params.slug) {
          this.getArtist(this.$route.params.slug).then(() => {
            this.loadingArtist = false;
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    ...mapActions(["getArtist", "getArtists"]),
  },

  async beforeMount() {
    this.getArtists();
  },
};
</script>
