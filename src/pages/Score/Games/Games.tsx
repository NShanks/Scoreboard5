import Players from "pages/Score/Players";
import { TeamSheet } from "pages/Score/Players/Players"

interface GameProps {
  numberOfPlayers: number;
}

interface GamesProps {
  numberOfGames: number;
  numberOfPlayers: number;
  gameData?: any;
}

const Game = ({ numberOfPlayers }: GameProps) => (
  <div>
    <TeamSheet numberOfPlayers={numberOfPlayers} />
  </div>
);

const Games = ({ numberOfGames, numberOfPlayers }: GamesProps) => {
  const gameElements = Array.from({ length: numberOfGames }, (_, i) => (
    <Game key={i} numberOfPlayers={numberOfPlayers} />
  ));

  return (
    <div>
      <Players numberOfPlayers={numberOfPlayers} />
      <div className="flex gap-8 justify-center">{gameElements}</div>
    </div>
  );
};

export default Games;
