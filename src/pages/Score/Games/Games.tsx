import Players from "pages/Score/Players";
import { TeamSheet } from "pages/Score/Players/Players"

interface GameProps {
  numberOfPlayers: number;
  players?: string[][];
}

interface GamesProps {
  numberOfGames: number;
  numberOfPlayers: number;
  gameData?: [string, number];
}

const Game = ({ numberOfPlayers, players }: GameProps) => (
  <div>
    <TeamSheet numberOfPlayers={numberOfPlayers} players={players}/>
  </div>
);

const Games = ({ numberOfGames, numberOfPlayers, gameData }: GamesProps) => {
  let players = undefined

  if (gameData) players = Object.entries(gameData[1])

  const playerNames = players ? players.slice(1).map((player) => {return player[0]}) : []
  
  const game = gameData ? <Game key={0} numberOfPlayers={players ? players.length - 1 : 0} players={players} /> : ''

  const gamePlaceholders = Array.from({ length: game ? numberOfGames - 1 : numberOfGames }, (_, i) => (
    <Game key={i+1} numberOfPlayers={numberOfPlayers} />
  ));

  const gameElements = [game, gamePlaceholders]
  return (
    <div>
      <Players numberOfPlayers={playerNames? playerNames.length : numberOfPlayers} playerNames={playerNames}/>
      <div className="flex gap-8 justify-center">{gameElements}</div>
    </div>
  );
};

export default Games;
