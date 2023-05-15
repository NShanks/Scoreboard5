import Players from "pages/Score/Players";
import { Game, TeamData } from "types";
import { formatPlacement } from "./utils";

interface RoundProps {
  numberOfPlayers: number;
  players?: string[][];
  place?: number;
  game?: TeamData;
  playerNames?: string[];
  multiplier?: number
}

interface GamesProps {
  numberOfGames: number;
  numberOfPlayers: number;
  games: TeamData[];
  multipliers: {[key: string]: string}
}

const Round = ({ numberOfPlayers, players, place, game, playerNames, multiplier = 1 }: RoundProps) => {
  const playerElims = players ? players.slice(1).map((player) => {return player[1]}) : [0]

  const elimElements = Array.from({ length: playerNames?.length || numberOfPlayers }, (_, i) => (
    <div className="justify-center flex">{game && playerNames ? String(game[playerNames[i]]) : 0}</div>
  ));

  // *** Add multiplier ***
  let gameScore = 0 - Number(game?.placement)

  gameScore = game ? Object.values(game).reduce((acc, curr) => acc + Number(curr), gameScore) * multiplier : 0
  
  return (
  <div className="flex flex-row">
    <div>
        <div className="border-b-2 px-2 border-teal-400">Elims</div>
        <div className="flex flex-row gap-2">
          {elimElements}
        </div>
      </div>
      <div>
        <div className="border-b-2 px-2 border-teal-400">Place</div>
        <div className="flex justify-center">
          {place ? formatPlacement(place) : "tbd"} 
        </div>
      </div>
      <div>
        <div className="border-b-2 px-2 border-teal-400">Score</div>
        <div className="flex justify-center">
          {String(gameScore)}
        </div>
      </div>
  </div>
)};

const Games = ({ numberOfGames, numberOfPlayers, games, multipliers }: GamesProps) => {
  const playerNames = (games.length > 0 ? Object.keys(games[0]).filter(name => name !== 'placement').sort() : [])

  const gameElements = Array.from({ length: numberOfGames }, (_, i) => {
    return (
    <>
      {games.length > i ? (
        <Round key={i} numberOfPlayers={numberOfPlayers} place={Number(games[i].placement)} game={games[i]} playerNames={playerNames} multiplier={Number(multipliers[Number(games[i].placement)]) || undefined}/>
        ) : 
        <Round key={i} numberOfPlayers={numberOfPlayers} />
      }
    </>
)})
  
  return (
    <div>
      <Players numberOfPlayers={numberOfPlayers} playerNames={playerNames}/>
      <div className="flex gap-8 justify-center">{gameElements}</div>
    </div>
  );
};

export default Games;
