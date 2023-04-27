import { formatPlacement } from "./utils";

interface PlayerProps {
  numberOfPlayers: number;
  player: string
}

interface PlayersProps {
  numberOfPlayers: number;
  playerNames?: string[]
}

interface ElimsProps {
  elims: number;
}

interface TeamSheetProps {
  numberOfPlayers: number;
  players?: string[][]
}

export const TeamSheet = ({ numberOfPlayers, players }: TeamSheetProps) => {
  const playerElims = players ? players.slice(1).map((player) => {return player[1]}) : [0]

  const elimElements = Array.from({ length: numberOfPlayers }, (_, i) => (
    <Elims key={i} elims={Number(playerElims[i]) || 0} />
  ));
  
  console.log(players)
  // *** Add multipliter ***
  const totalScore = players ? players.slice(1).map((player) => {
    return player[1]
  }).reduce((acc: any, curr) => acc + curr, 0) : 'N/A'
  
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
          {players ? formatPlacement(Number(players[0][1])) : "tbd"} 
        </div>
      </div>
      <div>
        <div className="border-b-2 px-2 border-teal-400">Score</div>
        <div className="flex justify-center">
          {String(totalScore)}
        </div>
      </div>
  </div>
)}

const Player = ({ numberOfPlayers, player }: PlayerProps) => (
  <div className="justify-center flex">
    {player}
  </div>
);

const Elims = ({ elims }: ElimsProps) => (
  <div className="justify-center flex">{elims}</div>
);

const Players = ({ numberOfPlayers, playerNames }: PlayersProps) => {
  const playerElements = Array.from({ length: numberOfPlayers }, (_, i) => (
    <Player key={i} numberOfPlayers={numberOfPlayers} player={playerNames ? playerNames[i] : 'TBD'} />
  ));


  return (
    <div className="flex flex-row justify-center gap-8">
        {playerElements}
    </div>
  );
};

export default Players;
