import Games from "pages/Score/Games";

interface TeamProps {
  teamNumber: number;
  numberOfGames: number;
  numberOfPlayers: number;
  gameData?: any;
}

interface TeamsProps {
  numberOfTeams: number;
  numberOfGames: number;
  numberOfPlayers: number;
  gameData?: any;
}

const Team = ({
  teamNumber,
  numberOfGames,
  numberOfPlayers,
  gameData,
}: TeamProps) => {
  return (
    <div className="flex flex-col pl-5 border-2 mb-2 p-2 mx-8 border-gray-500 rounded">
      <div className="mb-4 flex justify-center text-3xl border-b-2 pb-2">
        Team {teamNumber}
      </div>
      <Games
        numberOfGames={numberOfGames}
        numberOfPlayers={numberOfPlayers}
        gameData={gameData}
      />
    </div>
  );
};

const Teams = ({
  numberOfTeams,
  numberOfGames,
  numberOfPlayers,
  gameData,
}: TeamsProps) => {
  const teamElements = Array.from({ length: numberOfTeams }, (_, i) => (
    <Team
      key={i}
      teamNumber={i + 1}
      numberOfGames={numberOfGames}
      numberOfPlayers={numberOfPlayers}
      gameData={gameData}
    />
  ));

  return <div>{teamElements}</div>;
};

export default Teams;
