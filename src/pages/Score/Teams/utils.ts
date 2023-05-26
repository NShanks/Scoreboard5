import { GameData } from 'types'

export const combineGames = (games:GameData[], teamName: string) => {
    const teamGames = []

    teamGames.push(games[0][teamName])

    for (let x = 1; x < games.length; x++) {
      const nextGame = games[x][teamName]

      if (nextGame) teamGames.push(nextGame)
    }

    return teamGames
}