<template>
  <div
    class="d-flex justify-center align-center"
    style="width: 100%; height: 100%"
  >
    <v-progress-circular :size="100" :width="15" color="grey" indeterminate />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Loader",
});
</script>
