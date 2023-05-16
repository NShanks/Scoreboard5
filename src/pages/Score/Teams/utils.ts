import { Game } from "types"

export const combineGames = (games:Game[], i: number) => {
    const teamGames = []
    if (games.length > 0) {
      teamGames.push(Object.values(games[0])[i])
  
      const firstGameUser = games.length > 0 ? Object.keys(Object.values(games[0])[i])[1] : ''
  
      for (let x = 1; x < games.length; x++) {
        const nextGame = Object.values(games[x]).filter(team => Object.keys(team).includes(firstGameUser))
  
        if (nextGame) teamGames.push(nextGame[0])
      }
    }
    return teamGames
}