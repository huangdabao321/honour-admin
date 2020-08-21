import { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";

export const playerRoutes: RouteConfig = {
  path: "/players",
  component: Layout,
  redirect: "/player/list",
  meta: {
    title: "playerMgt", //i18n
    icon: "player" 
  },
  children: [
    {
      path: "list",
      component: () => import("@/views/player/list.vue"),
      name: "PlayerList",
      meta: {
        title: "playerList",
        icon: "list"
      }
    }
  ]
};
