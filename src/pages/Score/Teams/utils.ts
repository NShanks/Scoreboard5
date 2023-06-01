import { GameData } from 'types'

export const combineGames = (games:GameData[], teamName: string, scores: {[key: string]: { [team_name: string]: number}}) => {
    const teamGames = []

    const firstGame = games[0][teamName]
    const firstGameMatchString = String(games[0]['match_string']) || ''

    if (scores[firstGameMatchString] && scores[firstGameMatchString][teamName]) {
      firstGame.scoreWithMultiplier = scores[firstGameMatchString][teamName];
    }

    teamGames.push(firstGame)

    for (let x = 1; x < games.length; x++) {
      const nextGame = games[x][teamName]
      const nextGameMatchString = String(games[x].match_string)

      if (scores[nextGameMatchString] && scores[nextGameMatchString][teamName]) {
        nextGame.scoreWithMultiplier = scores[nextGameMatchString][teamName];
      }

      if (nextGame) teamGames.push(nextGame)
    }

    return teamGames
}