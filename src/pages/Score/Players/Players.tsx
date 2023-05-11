interface PlayersProps {
  numberOfPlayers: number;
  playerNames: string[]
}
const Players = ({ numberOfPlayers, playerNames }: PlayersProps) => {
  const playerElements = Array.from({ length: numberOfPlayers }, (_, i) => (
    <div className="justify-center flex">{playerNames.length > 0 ? playerNames[i] : 'TBD'}</div>
  ));


  return (
    <div className="flex flex-row justify-center gap-8">
        {playerElements}
    </div>
  );
};

export default Players;
