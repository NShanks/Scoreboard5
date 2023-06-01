import { useContext, useState } from 'react';
import Games from "pages/Score/Games";
import { Game, TeamData } from "types";
import { combineGames } from './utils'
import { ScoreContext } from 'pages/Score/Score';


interface TeamProps {
  teamNumber: number;
  numberOfGames: number;
  numberOfPlayers: number;
  teamGames: TeamData[];
  teamName?: string
  scores?: {[key: string]: { [team_name: string]: number}}
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
  teamName,
  scores
}: TeamProps) => {
  let totalScore = 0

  if (scores && teamName) {
    Object.entries(scores).forEach((score) => {
      totalScore += score[1][teamName]
    })
  }

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

  const { match_string, ...teams } = games[0] || {}; 
  const teamNames = Object.keys(teams)
  const scores = useContext(ScoreContext)

  if (games.length > 0) {
    const teamElements = teamNames.map((teamName, i) => {
      const teamGames = combineGames(games, teamName, scores)

      return (
        <Team
        key={i}
        teamNumber={i}
        numberOfGames={numberOfGames}
        numberOfPlayers={numberOfPlayers}
        teamGames={teamGames}
        teamName={teamName}
        scores={scores}
      />
      )
    })

    return <div>{teamElements}</div>
  }

  const teamElements = Array.from({ length: numberOfTeams }, (_, i) => (
      <Team
        key={i}
        teamNumber={i}
        numberOfGames={numberOfGames}
        numberOfPlayers={numberOfPlayers}
        teamGames={[]}
      />
  ));

  return <div>{teamElements}</div>;
};

export default Teams;
