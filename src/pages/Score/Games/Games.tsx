import Players from "pages/Score/Players";

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
    <div className="flex flex-row items-center mb-4 gap-4">
      <div>Placement</div>
      <div>Score</div>
    </div>
    <Players numberOfPlayers={numberOfPlayers} />
  </div>
);

const Games = ({ numberOfGames, numberOfPlayers }: GamesProps) => {
  const gameElements = Array.from({ length: numberOfGames }, (_, i) => (
    <Game key={i} numberOfPlayers={numberOfPlayers} />
  ));

  return (
    <div className="flex flex-row gap-8 justify-center">{gameElements}</div>
  );
};

export default Games;
