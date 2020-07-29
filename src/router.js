import Vue from "vue";
import Router from "vue-router";

import home from "@/views/home";
import about from "@/views/about";
import error from "@/views/error";
import coinDetail from "@/views/coinDetail";

Vue.use(Router);

export default new Router({
  mode: "history",

  routes: [
    {
      path: "/",
      name: "home",
      component: home
    },
    {
      path: "/about",
      name: "about",
      component: about
    },
    {
      path: "*",
      name: "error",
      component: error
    },
    {
      path: "/coin/:id",
      name: "coin-detail",
      component: coinDetail
    }
  ]
});
