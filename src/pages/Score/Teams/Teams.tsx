import Games from "pages/Score/Games";
import { Game, TeamData } from "types";

interface TeamProps {
  teamNumber: number;
  numberOfGames: number;
  numberOfPlayers: number;
  team?: [string, TeamData];
}

interface TeamsProps {
  numberOfTeams: number;
  numberOfGames: number;
  numberOfPlayers: number;
  games: Game[];
}

const Team = ({
  teamNumber,
  numberOfGames,
  numberOfPlayers,
  team,
}: TeamProps) => {
  let gameScore = 0 - Number(team?.[1].placement)
  gameScore = team ? Object.values(team?.[1]).reduce((acc, curr) => acc + Number(curr), gameScore) : 0

  return (
    <div className="flex flex-col pl-5 border-2 mb-2 p-2 mx-8 border-gray-500 rounded">
      <div className="border-b-2 pb-2 items-center flex justify-between">
        <div className="text-3xl mx-auto translate-x-1/2">
          Team {teamNumber}
        </div>
        <div className="">
          {`Total Score: ${gameScore}`}
        </div>
      </div>
      <Games
        numberOfGames={numberOfGames}
        numberOfPlayers={numberOfPlayers}
        // gameData={team}
      />
    </div>
  );
};

const Teams = ({
  numberOfTeams,
  numberOfGames,
  numberOfPlayers,
  games,
}: TeamsProps) => {
  const teamElements = Array.from({ length: numberOfTeams }, (_, i) => (
    <Team
      key={i}
      teamNumber={i + 1}
      numberOfGames={numberOfGames}
      numberOfPlayers={numberOfPlayers}
      team={games.length > 0 ? Object.entries(games[0])[i] : undefined}
    />
  ));

  return <div>{teamElements}</div>;
};

export default Teams;
