interface PlayerProps {
  numberOfPlayers: number;
  player: number;
}

interface PlayersProps {
  numberOfPlayers: number;
}

interface ElimsProps {
  elims: number;
}

const Player = ({ numberOfPlayers, player }: PlayerProps) => (
  <div className="justify-center flex border-r-2 border-teal-400">
    {player + 1}
  </div>
);

const Elims = ({ elims }: ElimsProps) => (
  <div className="justify-center flex">{elims + 1}</div>
);

const Players = ({ numberOfPlayers }: PlayersProps) => {
  const playerElements = Array.from({ length: numberOfPlayers }, (_, i) => (
    <Player key={i} numberOfPlayers={numberOfPlayers} player={i} />
  ));
  const elimElements = Array.from({ length: numberOfPlayers }, (_, i) => (
    <Elims key={i} elims={i} />
  ));

  return (
    <div className="flex flex-row">
      <div className="border-b-2 border-teal-400">
        <div className="border-b-2 px-2 border-teal-400">Player</div>
        {playerElements}
      </div>
      <div className="border-b-2 border-teal-400">
        <div className="border-b-2 px-2 border-teal-400">Elims</div>
        {elimElements}
      </div>
    </div>
  );
};

export default Players;
