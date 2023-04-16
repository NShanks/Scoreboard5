interface GameProps {}

interface GamesProps {
  numberOfGames: number;
}

const Game = ({}: GameProps) => (
  <div>
    <div className="flex flex-row items-center mb-4 gap-4">
      <div>Placement</div>
      <div>Score</div>
    </div>
    <div className="flex flex-row gap-4">
      <div className="flex flex-col">
        <div>Player</div>
        <div className="justify-center flex border-2">1</div>
        <div className="justify-center flex">2</div>
        <div className="justify-center flex">3</div>
        <div className="justify-center flex">4</div>
      </div>
      <div className="flex flex-col">
        <div>Elims</div>
        <div className="justify-center flex">1</div>
        <div className="justify-center flex">2</div>
        <div className="justify-center flex">3</div>
        <div className="justify-center flex">4</div>
      </div>
    </div>
  </div>
);

const Games = ({ numberOfGames }: GamesProps) => {
  const gameElements = Array.from({ length: numberOfGames }, (_, i) => (
    <Game key={i} />
  ));

  return <div className="flex flex-row gap-4">{gameElements}</div>;
};

export default Games;
