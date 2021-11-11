<template>
  <v-card class="pa-3">
    <div
      class="
        d-flex
        flex-column flex-sm-row
        justify-center
        align-center align-sm-end
      "
    >
      <v-card-subtitle
        v-if="product.artist"
        class="text-h5 pb-0 pb-sm-4"
        v-html="product.artist"
      />

      <v-card-title
        class="text-h4 pt-0 pt-sm-4 pl-sm-0"
        v-html="product.title"
        style="font-variant: small-caps"
      />
    </div>

    <v-card-subtitle class="text-center text-h5" v-html="product.details" />

    <v-card-text v-if="product.description" v-html="product.description" />

    <div
      class="
        d-flex
        flex-column-reverse
        align-center
        flex-md-row
        align-md-start
        mx-3
      "
    >
      <player
        v-if="product && product.bandcampId"
        :id="product.bandcampId"
        class="mx-2"
        size="large"
        artwork="small"
        add-style="width: 100%; max-width: 450px; height: 430px"
      />

      <div class="flex-grow-1 mx-2" style="max-width: 100%">
        <v-carousel
          cycle
          hide-delimiters
          show-arrows-on-hover
          height="300"
          class="mx-auto"
          style="max-width: 450px"
        >
          <template v-slot:prev="{ on, attrs }">
            <v-btn icon color="primary" v-bind="attrs" v-on="on">
              <v-icon v-text="'mdi-chevron-left'" />
            </v-btn>
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn icon color="primary" v-bind="attrs" v-on="on">
              <v-icon v-text="'mdi-chevron-right'" />
            </v-btn>
          </template>
          <v-carousel-item
            v-for="(picture, i) in product.pictures"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-img :src="picture.thumbUrl" :alt="`${product.title} photo`" />
          </v-carousel-item>
        </v-carousel>

        <v-btn
          :href="product.purchaseUrl"
          class="my-8 pa-3 d-flex"
          target="_blank"
          block
          large
          color="primary"
          style="height: auto; min-width: auto !important"
        >
          <v-icon large left>mdi-cart</v-icon>

          <div class="ml-2">
            <span class="text-h6">Order</span>
          </div>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Player from "@/components/Player.vue";
import { Product } from "@/types";
import { PropType } from "vue";
export default {
  name: "ProductCard",

  components: { Player },

  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
};
</script>