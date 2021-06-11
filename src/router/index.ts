import Home from "@/views/Home.vue";
import Releases from "@/views/Releases.vue";
import ProojectDetails from "@/views/ProojectDetails.vue";
import ReleaseDetails from "@/views/ReleaseDetails.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/releases",
    name: "Releases",
    component: Releases,
  },
  {
    path: "/releases/:slug",
    name: "ReleaseDetails",
    component: ReleaseDetails,
    props: {
      type: String,
      required: true,
    },
  },
  {
    path: "/proojects/:slug",
    name: "ProojectDetails",
    component: ProojectDetails,
    props: {
      type: String,
      required: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
