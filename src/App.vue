<template>
  <v-app>
    <sidebar />
    <v-main class="pa-8" style="margin-left: 270px">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {
    Sidebar,
  },

  data: () => ({
    //
  }),
});
</script>
