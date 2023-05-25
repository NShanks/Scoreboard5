import { useState, Dispatch, SetStateAction } from 'react'
import Modal from "Components/Modal";
import { formatPlacement } from "pages/Score/Games/utils";
import { Game } from 'types';

interface WzStringModalProps {    
    setTournamentId: React.Dispatch<React.SetStateAction<string>>
    isOpen: boolean
    closeModal: () => void
    matchStringList: string[]
    setMatchStringList: React.Dispatch<React.SetStateAction<string[]>>
    handleRemoveGame: (matchString: string) => void
}

const WzStringModal = ({ setTournamentId, isOpen, closeModal, matchStringList, setMatchStringList, handleRemoveGame }: WzStringModalProps) => {
    const [showWzMatchIds, setShowWzMatchIds] = useState<boolean>(!matchStringList)
    const handleRetrieveWzId = () => {
        const input = document.getElementById('wzMatchId') as HTMLInputElement
        setTournamentId(input.value)
        closeModal()
        setShowWzMatchIds(true)
    }

    const removeMatch = (matchString: string) => {
        setMatchStringList(matchStringList.filter((currWzId) => currWzId !== matchString))
        handleRemoveGame(matchString)
    }

    return (
        <>
            <Modal isOpen={true} closeModal={closeModal}>
                <div className="flex flex-col ">
                    <div className="flex flex-col items-center">
                        Match
                        <input id="wzMatchId" type="text" placeholder="Enter Tournament ID" defaultValue='752505576671720088' className="border-2 border-black-250 rounded-md"/>
                    </div>
                    <button className="relative px-5 py-2 font-medium text-white group mx-2 mt-4" onClick={handleRetrieveWzId}>
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-green-500 group-hover:bg-green-700 group-hover:skew-x-12"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-green-700 group-hover:bg-green-500 group-hover:-skew-x-12"></span>
                        <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-green-600 -rotate-12"></span>
                        <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-green-400 -rotate-12"></span>
                        <span className="relative">Submit</span>
                    </button> 
                    <button className="relative px-5 py-2 font-medium text-white group mx-2 mt-4" onClick={closeModal}>
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-green-500 group-hover:bg-green-700 group-hover:skew-x-12"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-green-700 group-hover:bg-green-500 group-hover:-skew-x-12"></span>
                        <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-green-600 -rotate-12"></span>
                        <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-green-400 -rotate-12"></span>
                        <span className="relative">Close</span>
                    </button> 
                    <div className="absolute w-56 sm:w-56 mt-72 sm:ml-60 sm:mt-0 ease-in-out duration-1000 z-50 bg-white rounded p-2 min-h-[208px] h-auto">
                        {showWzMatchIds && matchStringList.map((matchString) => (
                            <div id={matchString} className='flex flex-row justify-around hover:bg-red-500 rounded' onClick={ () => removeMatch(matchString) } role='button'>
                                <div>
                                    {matchString}
                                </div>
                            </div>
                        ))}
                    </div>    
                </div>
            </Modal>    
        </>
    )
}

export default WzStringModal;