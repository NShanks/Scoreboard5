import { useLocation } from "react-router-dom";
import Teams from "pages/Score/Teams";
import useDisplayTournament from "hooks/useDisplayTournament";

const Score = () => {
  const location = useLocation();
  const sheetData = location.state.sheetData;
  const data = useDisplayTournament('752505576671720088');

  console.log("end", data);

  return (
    <div>
      <div className="flex flex-row justify-center mb-4">
        <input placeholder="wz id 1" />
        <input placeholder="wz id 2" />
        <input placeholder="wz id 3" />
        <input placeholder="wz id 4 " />
      </div>
      <div className="flex flex-row justify-center mb-4">
        <form className="flex flex-col">
          <label>Multi 1</label>
          <input placeholder="Enter Multiplier" />
        </form>
        <form className="flex flex-col">
          <label>Multi 2</label>
          <input placeholder="Enter Multiplier" />
        </form>
        <form className="flex flex-col">
          <label>Multi 3</label>
          <input placeholder="Enter Multiplier" />
        </form>
        <form className="flex flex-col">
          <label>Multi 4</label>
          <input placeholder="Enter Multiplier" />
        </form>
      </div>
      <Teams
        numberOfTeams={sheetData.teams}
        numberOfGames={sheetData.games}
        numberOfPlayers={sheetData.playersPerTeam}
        gameData={data}
      />
    </div>
  );
};

export default Score;
