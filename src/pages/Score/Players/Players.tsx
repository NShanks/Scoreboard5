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

interface TeamSheetProps {
  numberOfPlayers: number;
}

export const TeamSheet = ({ numberOfPlayers }: TeamSheetProps) => {
  const elimElements = Array.from({ length: numberOfPlayers }, (_, i) => (
    <Elims key={i} elims={i} />
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
          3rd
        </div>
      </div>
      <div>
        <div className="border-b-2 px-2 border-teal-400">Score</div>
        <div className="flex justify-center">
          100
        </div>
      </div>
  </div>
)}

const Player = ({ numberOfPlayers, player }: PlayerProps) => (
  <div className="justify-center flex">
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


  return (
    <div className="flex flex-row justify-center gap-8">
        {playerElements}
    </div>
  );
};

export default Players;
