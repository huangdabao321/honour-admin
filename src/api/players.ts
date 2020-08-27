import request from "@/utils/request";
import { Player } from "./types";

export const getPlayers = (params: any) =>
  request({
    url: "/players",
    method: "get",
    params
  });

export const getPlayer = (id: number) =>
  request({
    url: "/players/" + id.toString(),
    method: "get"
  });

export const createPlayer = (data: any) =>
  request({
    url: "/players/",
    method: "post",
    data: data
  });

export const updatePlayer = (id: number, data: any) =>
  request({
    url: "/players/" + id.toString(),
    method: "put",
    data: data
  });

export const defaultPlayerData: Player = {
  id: 0,
  acountname: "",
  avatar: "",
  rank: 0,
  nickname: "",
  wanttopplay: [],
  winningstreak: 0,
  exp: 0,
  level: 0,
  bravepoints: 0
};
