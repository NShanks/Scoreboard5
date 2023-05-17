import { useState } from 'react';
import Games from "pages/Score/Games";
import { Game, TeamData } from "types";
import { combineGames } from './utils'


interface TeamProps {
  teamNumber: number;
  numberOfGames: number;
  numberOfPlayers: number;
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
  teamGames,
}: TeamProps) => {
  const [totalScore, setTotalScore] = useState(0)
  return (
    <div className="flex flex-col pl-5 border-2 mb-2 p-2 mx-8 border-gray-500 rounded">
      <div className="border-b-2 pb-2 items-center flex justify-between">
        <div className="text-3xl mx-auto translate-x-1/2">
          Team {teamNumber + 1}
        </div>
        <div className="">
          {`Total Score: ${totalScore}`}
        </div>
      </div>
      <Games
        numberOfGames={numberOfGames}
        numberOfPlayers={numberOfPlayers}
        games={teamGames}
        setTotalScore={setTotalScore}
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
