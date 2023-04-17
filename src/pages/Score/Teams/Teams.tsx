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
      <div className="border-b-2 pb-2 items-center flex justify-between">
        <div className="text-3xl mx-auto translate-x-1/2">
          Team {teamNumber}
        </div>
        <div className="">
          Total Score
        </div>
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
