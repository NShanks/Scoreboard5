import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Teams from "pages/Score/Teams";
import getTournamentData from "hooks/useDisplayTournament";
import { Game } from 'types'
import MultiplierModal from "Components/MultiplierModal";
import useModal from 'hooks/useModal'

const Score = () => {
  const location = useLocation();
  const sheetData = location.state.sheetData;
  const [games, setGames] = useState<Game[]>([])
  const [tournamentId, setTournamentId] = useState('')
  // remove this later
  const [refetchTesting, setRefetchTesting] = useState<boolean>()

  const { isModalOpen,  closeModal, openModal} = useModal();

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

  const [multipliers, setMultipliers] = useState<{[key: string]: string;}>({})

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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openModal}>Multipliers</button>
        <a href="#_" className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white font-bold hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
          <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">Multipliers</span>
        </a>
      </div>
      <MultiplierModal multipliers={multipliers} setMultipliers={setMultipliers} isOpen={isModalOpen} closeModal={closeModal}/>
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
