import Games from "pages/Score/Games";
import { Game, TeamData } from "types";

interface TeamProps {
  teamNumber: number;
  numberOfGames: number;
  numberOfPlayers: number;
  // team?: [string, TeamData];
  teamGames: TeamData[];
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
  teamGames
}: TeamProps) => {
  return (
    <div className="flex flex-col pl-5 border-2 mb-2 p-2 mx-8 border-gray-500 rounded">
      <div className="border-b-2 pb-2 items-center flex justify-between">
        <div className="text-3xl mx-auto translate-x-1/2">
          Team {teamNumber + 1}
        </div>
        <div className="">
          {`Total Score: ${'score'}`}
        </div>
      </div>
      <Games
        numberOfGames={numberOfGames}
        numberOfPlayers={numberOfPlayers}
        games={teamGames}
      />
    </div>
  );
};

const combineGames = (games:Game[], i: number) => {
  const teamGames = []
  if (games.length > 0) {
    teamGames.push(Object.values(games[0])[i])

    const firstGameUser = games.length > 0 ? Object.keys(Object.values(games[0])[i])[1] : ''

    for (let x = 1; x < games.length; x++) {
      const nextGame = Object.values(games[x]).filter(team => Object.keys(team).includes(firstGameUser))

      if (nextGame) teamGames.push(nextGame[0])
    }
  }
  return teamGames
}

const Teams = ({
  numberOfTeams,
  numberOfGames,
  numberOfPlayers,
  games,
}: TeamsProps) => {
  const teamElements = Array.from({ length: numberOfTeams }, (_, i) => {

  const teamGames = combineGames(games, i)

    return (
      <Team
        key={i}
        teamNumber={i}
        numberOfGames={numberOfGames}
        numberOfPlayers={numberOfPlayers}
        teamGames={teamGames}
      />
  )});

  return <div>{teamElements}</div>;
};

export default Teams;
