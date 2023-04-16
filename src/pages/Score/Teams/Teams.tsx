import Games from "pages/Score/Games";

interface TeamProps {
  teamNumber: number;
  numberOfGames: number;
}

interface TeamsProps {
  numberOfTeams: number;
  numberOfGames: number;
}

const Team = ({ teamNumber, numberOfGames }: TeamProps) => {
  return (
    <div className="flex flex-col pl-5">
      <div className="mb-4 flex justify-center text-3xl">Team {teamNumber}</div>
      <Games numberOfGames={numberOfGames} />
    </div>
  );
};

const Teams = ({ numberOfTeams, numberOfGames }: TeamsProps) => {
  const teamElements = Array.from({ length: numberOfTeams }, (_, i) => (
    <Team key={i} teamNumber={i + 1} numberOfGames={numberOfGames} />
  ));

  return <div>{teamElements}</div>;
};

export default Teams;
