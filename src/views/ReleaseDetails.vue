<template>
  <div class="pt-4 px-3" style="width: 100%; height: 100%">
    <base-loader v-if="loading" />

    <v-slide-x-transition :hide-on-leave="true">
      <v-container v-if="!loading" class="mx-auto">
        <v-row>
          <v-col class="flex-grow-0 order-0 order-md-1">
            <header
              v-if="$vuetify.breakpoint.smAndDown"
              class="d-flex flex-column pb-6"
            >
              <div class="d-flex justify-space-between">
                <div class="text-h5" v-html="release.artist" />

                <div class="ml-4 d-flex flex-column align-end">
                  <v-subheader class="text-subtitle-2">
                    {{ release.createdAt | monthYear }}
                  </v-subheader>
                  <v-subheader class="text-subtitle-2 small">
                    <small>[{{ release.ref }}]</small>
                  </v-subheader>
                </div>
              </div>

              <h2 class="text-h4" v-html="release.title" />
            </header>

            <v-card tile elevation="3">
              <v-img
                v-if="release"
                :src="`${publicPath}/img/releases/${release.ref}/${release.ref}_500px.jpg`"
                width="500"
                height="auto"
                class="mb-6"
                alt="artwork"
                style="max-width: 100%"
              />
            </v-card>

            <v-card tile>
              <player
                v-if="release && release.bandcampId"
                :id="release.bandcampId"
                size="large"
                artwork="none"
                add-style="width: 500px; height: 472px; max-width: 100%;"
              />
            </v-card>

            <v-card
              id="credits"
              v-if="release.credits && release.credits.length"
              class="pa-4 my-4"
            >
              <h5 class="text-h6 mb-4 d-flex justify-center align-center">
                <v-icon class="mr-2 black--text" medium>mdi-license</v-icon>
                <span>Credits</span>
              </h5>
              <v-list dense>
                <v-list-item
                  v-for="(credit, i) of release.credits"
                  :key="i"
                  style="min-height: unset"
                >
                  <v-list-item-content class="py-1">
                    <v-list-item-subtitle v-html="credit.content" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>

            <v-card
              id="external-links"
              v-if="release.links && release.links.length"
              class="pa-4 my-4"
            >
              <h5 class="text-h6 mb-4 d-flex justify-center align-center">
                <v-icon class="mr-2 black--text" medium
                  >mdi-link-variant</v-icon
                >
                <span>External links</span>
              </h5>
              <div class="d-flex justify-space-around align-center flex-wrap">
                <v-btn
                  v-for="(link, i) of release.links"
                  :key="i"
                  :href="link.url"
                  plain
                  v-html="link.platform.name"
                />
              </div>
            </v-card>
          </v-col>

          <v-col class="order-1 order-md-0">
            <header
              v-if="$vuetify.breakpoint.mdAndUp"
              class="d-flex flex-column px-8 pt-2"
            >
              <div class="d-flex justify-space-between">
                <div class="text-h3" v-html="release.artist" />

                <div class="ml-4 d-flex flex-column align-end">
                  <v-subheader class="text-subtitle-2">
                    {{ release.createdAt | monthYear }}
                  </v-subheader>
                  <v-subheader class="text-subtitle-2 small">
                    <small>[{{ release.ref }}]</small>
                  </v-subheader>
                </div>
              </div>

              <h2 class="text-h2" v-html="release.title" />
            </header>

            <div
              v-if="$vuetify.breakpoint.mdAndUp"
              class="d-flex px-8 my-2"
              style="width: 100%"
            >
              <v-btn
                v-if="release.description"
                @click="scrollTo('#description')"
                plain
                small
              >
                <v-icon left>mdi-card-text-outline</v-icon>
                Description
              </v-btn>

              <v-btn
                v-if="release.tracks && release.tracks.length"
                @click="scrollTo('#tracklist')"
                plain
                small
              >
                <v-icon left>mdi-playlist-music</v-icon>
                Tracklist
              </v-btn>

              <v-btn
                v-if="release.credits && release.credits.length"
                @click="scrollTo('#credits')"
                plain
                small
              >
                <v-icon left>mdi-license</v-icon>
                Credits
              </v-btn>

              <v-btn
                v-if="release.links && release.links.length"
                @click="scrollTo('#external-links')"
                plain
                small
              >
                <v-icon left>mdi-link-variant</v-icon>
                Links
              </v-btn>
            </div>

            <v-btn
              v-if="downloadUrl"
              :href="downloadUrl"
              class="my-md-8 mx-auto ml-md-12 pa-3 d-flex"
              target="_blank"
              block
              large
              color="primary"
              style="height: auto; min-width: auto !important; max-width: 400px"
            >
              <v-icon large left>mdi-download</v-icon>

              <div class="ml-2">
                <span class="text-h6">Download</span>

                <span class="text-body-2 grey--text ml-1 d-none d-md-inline"
                  >via Bandcamp</span
                >
              </div>
            </v-btn>

            <v-card
              id="description"
              v-if="release.description"
              v-html="release.description"
              class="px-8 pt-8 pb-4 my-8"
            />

            <v-card
              id="tracklist"
              v-if="release.tracks && release.tracks.length"
              class="px-8 pt-8 pb-4 my-8"
            >
              <h4 class="text-h5 mb-4 d-flex align-center">
                <v-icon class="mr-2 black--text" medium
                  >mdi-playlist-music</v-icon
                >
                <span>Tracklist</span>
              </h4>

              <v-list>
                <release-tracklist-item
                  v-for="track in tracklist"
                  :key="track.position"
                  :track="track"
                  :releaseArtist="release.artist"
                />
              </v-list>

              <template v-if="bonusTracklist && bonusTracklist.length">
                <h5 class="text-h5 my-4 d-flex align-center">
                  <v-icon class="mr-2 black--text" medium
                    >mdi-gift-outline</v-icon
                  >
                  <span>
                    Bonus
                    {{ bonusTracklist.length > 1 ? "tracks" : "track" }}
                  </span>
                </h5>

                <v-list dense>
                  <release-tracklist-item
                    v-for="track in bonusTracklist"
                    :key="track.position"
                    :track="track"
                    :releaseArtist="release.artist"
                  />
                </v-list>
              </template>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-slide-x-transition>
  </div>
</template>

<script lang="ts">
import BaseLoader from "@/components/BaseLoader.vue";
import Player from "@/components/Player.vue";
import ReleaseTracklistItem from "@/components/ReleaseTracklistItem.vue";
import { Link, Track } from "@/types";
import { mapActions, mapState } from "vuex";
export default {
  name: "ReleaseDetails",

  components: { BaseLoader, Player, ReleaseTracklistItem },

  data: () => ({
    loading: false,
    publicPath: process.env.VUE_APP_URL,
  }),

  watch: {
    "$route.params.slug": {
      handler: function () {
        this.loading = true;
        this.getRelease(this.$route.params.slug).then(() => {
          this.loading = false;
        });
      },
      deep: true,
      immediate: true,
    },
  },

  computed: {
    ...mapState(["release"]),

    tracklist(): Track[] {
      return this.release.tracks?.filter((track: Track) => !track.bonus);
    },

    bonusTracklist(): Track[] {
      return this.release.tracks?.filter((track: Track) => track.bonus);
    },

    downloadUrl(): string | void {
      if (!this.release.links || !this.release.links.length) return;
      return (
        this.release.links.find(
          (link: Link) => link.platform.slug === "bandcamp"
        ).url + "?action=download"
      );
    },
  },

  methods: {
    ...mapActions(["getRelease"]),

    scrollTo(target: string) {
      return this.$vuetify.goTo(target);
    },
  },
};
</script>

<style scoped>
header .v-subheader {
  margin: 0;
  height: auto;
  white-space: nowrap;
}
.v-list-item__title,
.v-list-item__subtitle {
  white-space: normal;
}
</style>
