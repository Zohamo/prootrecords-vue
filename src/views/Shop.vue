<template>
  <v-container>
    <product-card
      v-for="product of products"
      :key="product.id"
      :product="product"
      class="mb-7"
      style="max-width: 1000px"
    />
  </v-container>
</template>

<script lang="ts">
import ProductCard from "@/components/ProductCard.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "Shop",

  components: { ProductCard },

  computed: {
    ...mapState(["products"]),
  },

  methods: {
    ...mapActions(["getProducts"]),
  },

  async beforeMount() {
    this.getProducts();
  },
};
</script>
