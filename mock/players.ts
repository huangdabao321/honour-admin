import { Response, Request } from "express";
import { Player, Hero,IgetPlayersRequest } from "../src/api/types";
import { heros } from "./heros";
import faker from "faker";

faker.locale = "zh_CN";

const playerCount = 100;
const playerList: Player[] = [];

for (let i = 0; i < playerCount; i++) {
  playerList.push({
    id: i,
    acountname: faker.name.findName(),
    nickname: faker.name.findName(),
    avatar: faker.image.avatar(),
    exp: faker.random.number(10000),
    level: faker.random.number(30),
    rank: faker.random.number(200),
    wanttopplay: Array.from(getWanttoplay()),
    winningstreak: faker.random.number(10),
    bravepoints: faker.random.number(10)
  });
}

function getWanttoplay() {
  let wanttoplay: Set<Hero> = new Set();
  while (wanttoplay.size < 3) {
    wanttoplay.add(heros[faker.random.number(9)]);
  }
  return wanttoplay;
}


export const getPlayers = (req: IgetPlayersRequest, res: Response) => {
  const { acountname, nickname, page = 1, limit = 10 } = req.query;

  let mockList = playerList.filter((item )=> {
    if (acountname && item.acountname.indexOf(acountname) < 0) return false;
    if (nickname && item.nickname.indexOf(nickname) < 0) return false;
    return true;
  });

  const pageList = mockList.filter(
    (_, index) => index < limit * page && index >= limit * (page - 1)
  );
  return res.json({
      code: 20000,
      data:{
          total: pageList.length,
          players: pageList
      }
  })
};


export const getPlayer = (req: Request,res:Response)=>{
    const {id} = req.params
    for (const player of playerList) {
        if(player.id.toString() === id){
            return res.json({
                code:20000,
                data:{
                    player
                }
            })
        }
    }

    return res.json({
        code: 70001,
        message:'player not found'
    })
}

export const createPlayer = (req: Request,res: Response)=>{
    const {player} = req.body
    return res.json({
        code:20000,
        data:{
            player
        }
    })
}
