import Players from "pages/Score/Players";
import { TeamData } from "types";
import { formatPlacement } from "./utils";

interface RoundProps {
  numberOfPlayers: number;
  place?: number;
  game?: TeamData;
  playerNames?: string[];
}

interface GamesProps {
  numberOfGames: number;
  numberOfPlayers: number;
  games: TeamData[];
}

const Round = ({ numberOfPlayers, place, game, playerNames }: RoundProps) => {
  const elimElements = Array.from({ length: playerNames?.length || numberOfPlayers }, (_, i) => (
    <div className="justify-center flex">{game && playerNames ? String(game[playerNames[i]]) : 0}</div>
  ));

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
          {game?.scoreWithMultiplier || 'tbd'}
        </div>
      </div>
  </div>
)};

const Games = ({ numberOfGames, numberOfPlayers, games }: GamesProps) => {
  const playerNames = (games.length > 0 ? Object.keys(games[0]).filter(name => name !== 'placement' && name !== 'score') : [])

  const gameElements = Array.from({ length: numberOfGames }, (_, i) => {
    return (
    <>
      {games.length > i ? (
        <Round key={i} numberOfPlayers={numberOfPlayers} place={Number(games[i].placement)} game={games[i]} playerNames={playerNames}/>
        ) : 
        <Round key={i} numberOfPlayers={numberOfPlayers}/>
      }
    </>
)})
  
  return (
    <div>
      <Players numberOfPlayers={numberOfPlayers} playerNames={playerNames}/>
      <div className="flex gap-8 justify-center flex-col lg:flex-row items-center">{gameElements}</div>
    </div>
  );
};

export default Games;
