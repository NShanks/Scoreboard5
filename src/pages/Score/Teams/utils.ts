import { Game } from 'types'

export const combineGames = (games:Game[], i: number) => {
    const teamGames = []

    if (games.length > 0) {
      teamGames.push(Object.values(games[0])[i])

      const teamName = Object.keys(games[0])[i]
      console.log(games[0][teamName])
  
      for (let x = 1; x < games.length; x++) {
        const nextGame = games[x][teamName]
  
        if (nextGame) teamGames.push(nextGame)
      }
    }
    return teamGames
}