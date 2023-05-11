import { useLocation } from "react-router-dom";
import Teams from "pages/Score/Teams";
import getTournamentData from "hooks/useDisplayTournament";
import { useEffect, useState } from "react";
import { Game } from 'types'
import MultiplierModal from "Components/MultiplierModal";

const Score = () => {
  const location = useLocation();
  const sheetData = location.state.sheetData;
  const [games, setGames] = useState<Game[]>([])
  const [tournamentId, setTournamentId] = useState('')
  // remove this later
  const [refetchTesting, setRefetchTesting] = useState<boolean>()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTournamentData(tournamentId);

      if (!data) return
      setGames((prevGames) => [...prevGames, data.teams])
    }
    fetchData();
  }, [tournamentId, refetchTesting]);


  const handleRetrieveWzId = (num: number) => {
    const input = document.getElementById(`wz${num}`) as HTMLInputElement
    setTournamentId(input.value)
    // remove this later
    setRefetchTesting(!refetchTesting)
  }

  const numberOfTeams = games.length > 0 ? Object.entries(games[0]).length : sheetData.teams

  const multipliers = {}

  return (
    <div>
      <div className="flex flex-row justify-center mb-4">
        <div className="flex flex-col">
          <input id="wz1" placeholder="Enter Tournament ID" defaultValue='752505576671720088'/>
          <button className="rounded border w-40" onClick={() => handleRetrieveWzId(1)}>Submit</button>
        </div>
        <div className="flex flex-col">
          <input id="wz2" placeholder="Enter Tournament ID" defaultValue='752505576671720089'/>
          <button className="rounded border w-40" onClick={() => handleRetrieveWzId(2)}>Submit</button>
        </div>
        <div className="flex flex-col">
          <input id="wz3" placeholder="Enter Tournament ID" defaultValue='752505576671720088'/>
          <button className="rounded border w-40" onClick={() => handleRetrieveWzId(3)}>Submit</button>
        </div>
        <div className="flex flex-col">
          <input id="wz4" placeholder="Enter Tournament ID" defaultValue='752505576671720088'/>
          <button className="rounded border w-40" onClick={() => handleRetrieveWzId(4)}>Submit</button>
        </div>
      </div>
      <MultiplierModal multipliers={multipliers}></MultiplierModal>
      <Teams
        numberOfTeams={numberOfTeams}
        numberOfGames={sheetData.games}
        numberOfPlayers={sheetData.playersPerTeam}
        games={games}
      />
    </div>
    
  );
};

export default Score;
