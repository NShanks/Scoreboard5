import Players from "pages/Score/Players";
import { TeamSheet } from "pages/Score/Players/Players"

interface GameProps {
  numberOfPlayers: number;
  gameData?: any
}

interface GamesProps {
  numberOfGames: number;
  numberOfPlayers: number;
  gameData?: any;
}

const Game = ({ numberOfPlayers, gameData }: GameProps) => (
  <div>
    <TeamSheet numberOfPlayers={numberOfPlayers} gameData={gameData}/>
  </div>
);

const Games = ({ numberOfGames, numberOfPlayers, gameData }: GamesProps) => {
  const gameElements = Array.from({ length: numberOfGames }, (_, i) => (
    <Game key={i} numberOfPlayers={numberOfPlayers} gameData={gameData}/>
  ));

  return (
    <div>
      <Players numberOfPlayers={numberOfPlayers} />
      <div className="flex gap-8 justify-center">{gameElements}</div>
    </div>
  );
};

export default Games;
