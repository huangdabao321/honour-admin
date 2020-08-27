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
    },
    {
      path: "create",
      component: () => import("@/views/player/createPlayer.vue"),
      name: "createPlayer",
      meta: {
        title: "createPlayer",
        icon: "edit"
      }
    },
    {
      path: "edit/:id(\\d+)",
      component: () => import("@/views/player/edit.vue"),
      name: "editPlayer",
      meta: {
        title: "editPlayer",
        noCache: true,
        activeMenu: "/players/list",
        hidden: true
      }
    }
  ]
};
