import { Game } from 'types'

export const combineGames = (games:Game[], i: number) => {
    const teamGames = []

    if (games.length > 0) {
      teamGames.push(Object.values(games[0].game)[i])

      const firstGameUser = Object.keys(Object.values(games[0].game)[i])[1]
  
      for (let x = 1; x < games.length; x++) {
        const nextGame = Object.values(games[x].game).filter(team => Object.keys(team).includes(firstGameUser))
  
        if (nextGame) teamGames.push(nextGame[0])
      }
    }
    return teamGames
}