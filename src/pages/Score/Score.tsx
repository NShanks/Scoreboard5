import { useEffect, useState, createContext } from "react";
import { useLocation } from "react-router-dom";
import Teams from "pages/Score/Teams";
import getTournamentData from "hooks/useDisplayTournament";
import { Game } from 'types'
import MultiplierModal from "Components/MultiplierModal";
import useModal from 'hooks/useModal'
import WzStringModal from "Components/WzStringModal/WzStringModal";

export const ScoreContext = createContext<{[key: string]: { [team_name: string]: number}}>({});

const Score = () => {
  const location = useLocation();
  const sheetData = location.state.sheetData;
  const [games, setGames] = useState<Game[]>([]);
  const [tournamentId, setTournamentId] = useState('');
  const [multipliers, setMultipliers] = useState<{[key: string]: string;}>({});
  const [matchStringList, setMatchStringList] = useState<string[]>([]);
  const [scores, setScores] = useState<{[key: string]: { [team_name: string]: number}}>({});
  const { isModalOpen: isMultiplierModalOpen, closeModal: closeMultiplierModal, openModal: openMultiplierModal } = useModal();
  const { isModalOpen: isWzStringModalOpen, closeModal: closeWzStringModal, openModal: openWzStringModal } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTournamentData(tournamentId);

      if (!data) return
      setGames((prevGames) => [...prevGames, data.teams])
      setMatchStringList(prevStrings => [...prevStrings, data.teams.match_string])
    }
    fetchData();
  }, [tournamentId]);

  useEffect(() => {
    if (games.length < 1) return

    const updatedScores = { ...scores };

    games.forEach((game) => {
      updatedScores[game.match_string] = {}

      Object.entries(game).forEach((team) => {
        if (team[0] === 'match_string') return

        const teamScore = typeof team[1] === 'object' ? team[1]['score'] : 0
        const placement = typeof team[1] === 'object' ? team[1]['placement'] : 0
        const multiplier = multipliers[placement] || 1

        updatedScores[game.match_string][team[0]] = Number(teamScore) * Number(multiplier)
      })
    })

    setScores(updatedScores)
  }, [games, multipliers])

  const handleRemoveGame = (matchString: string) => {
    const updatedGames = games.filter((game) => game.match_string !== matchString)
    const updatedScores = { ...scores }
    delete updatedScores[matchString]

    setGames(updatedGames)
    setScores(updatedScores)
  }

  const numberOfTeams = games.length > 0 ? Object.keys(games[0]).length : sheetData.teams

  return (
    <ScoreContext.Provider value={scores}>
      <div>
        <div className="flex flex-row justify-center mb-4">
          <div className="flex flex-row gap-8">
            <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white font-bold hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300" onClick={openWzStringModal}>
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">Matches</span>
            </button>
            <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white font-bold hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300" onClick={openMultiplierModal}>
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">Multipliers</span>
            </button>
          </div>
        </div>
        <WzStringModal setTournamentId={setTournamentId} isOpen={isWzStringModalOpen} closeModal={closeWzStringModal} matchStringList={matchStringList} setMatchStringList={setMatchStringList} handleRemoveGame={handleRemoveGame}/>
        <MultiplierModal multipliers={multipliers} setMultipliers={setMultipliers} isOpen={isMultiplierModalOpen} closeModal={closeMultiplierModal}/>
        <Teams
          numberOfTeams={numberOfTeams}
          numberOfGames={sheetData.games}
          numberOfPlayers={sheetData.playersPerTeam}
          games={games}
        />
      </div>
    </ScoreContext.Provider>
  );
};

export default Score;
