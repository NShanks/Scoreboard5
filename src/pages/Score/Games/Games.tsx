import Players from "pages/Score/Players";
import { Game, TeamData } from "types";
import { formatPlacement } from "./utils";

interface GameProps {
  numberOfPlayers: number;
  players?: string[][];
  place?: number;
  game?: TeamData;
  playerNames?: string[];
}

interface GamesProps {
  numberOfGames: number;
  numberOfPlayers: number;
  games: TeamData[];
}

const Round = ({ numberOfPlayers, players, place, game, playerNames }: GameProps) => {
  const playerElims = players ? players.slice(1).map((player) => {return player[1]}) : [0]

  const elimElements = Array.from({ length: playerNames?.length || numberOfPlayers }, (_, i) => (
    <div className="justify-center flex">{game && playerNames ? String(game[playerNames[i]]) : 0}</div>
  ));

  // *** Add multiplier ***
  let gameScore = 0 - Number(game?.placement)
  gameScore = game ? Object.values(game).reduce((acc, curr) => acc + Number(curr), gameScore) : 0
  
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

const Games = ({ numberOfGames, numberOfPlayers, games }: GamesProps) => {
  const playerNames = (games.length > 0 ? Object.keys(games[0]).filter(name => name !== 'placement').sort() : [])

  const playedGames = Array.from({ length: games.length }, (_, i) => (
    <Round key={i+1} numberOfPlayers={numberOfPlayers} place={Number(games[i].placement)} game={games[i]} playerNames={playerNames}/>
  ));

  const gamePlaceholders = Array.from({ length: numberOfGames-games.length }, (_, i) => (
    <Round key={i+1} numberOfPlayers={numberOfPlayers} />
  ));
  
  const gameElements = [playedGames, gamePlaceholders]

  return (
    <div>
      <Players numberOfPlayers={numberOfPlayers} playerNames={playerNames}/>
      <div className="flex gap-8 justify-center">{gameElements}</div>
    </div>
  );
};

export default Games;
