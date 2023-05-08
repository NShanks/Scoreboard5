import Players from "pages/Score/Players";
import { TeamSheet } from "pages/Score/Players/Players"
import { Game } from "types";

interface GameProps {
  numberOfPlayers: number;
  players?: string[][];
}

interface GamesProps {
  numberOfGames: number;
  numberOfPlayers: number;
  games: Game[];
}

const Round = ({ numberOfPlayers, players }: GameProps) => (
  <div>
    <TeamSheet numberOfPlayers={numberOfPlayers} players={players}/>
  </div>
);

const Games = ({ numberOfGames, numberOfPlayers, games }: GamesProps) => {
  let players = undefined

  // console.log(games)

  // if (gameData) players = Object.entries(gameData[1])

  // const playerNames = players ? players.slice(1).map((player) => {return player[0]}) : []
  
  // const game = gameData ? <Game key={0} numberOfPlayers={players ? players.length - 1 : 0} players={players} /> : ''

  const gamePlaceholders = Array.from({ length: numberOfGames }, (_, i) => (
    <Round key={i+1} numberOfPlayers={numberOfPlayers} />
  ));

  // const gameElements = [game, gamePlaceholders]
  return (
    <div>
      <Players numberOfPlayers={numberOfPlayers}/>
      <div className="flex gap-8 justify-center">{gamePlaceholders}</div>
    </div>
  );
};

export default Games;
