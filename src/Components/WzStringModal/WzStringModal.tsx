import { useState, Dispatch, SetStateAction } from 'react'
import Modal from "Components/Modal";
import { formatPlacement } from "pages/Score/Games/utils";

interface WzStringModalProps {
    multipliers: {[key: string]: string}
    setTournamentId: Dispatch<SetStateAction<string>>
    isOpen: boolean
    closeModal: () => void
}

const WzStringModal = ({ multipliers, setTournamentId, isOpen, closeModal }: WzStringModalProps) => {

    return (
        <>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <div className="flex flex-col ">
                    <div className="flex flex-col items-center">
                        Match
                        <input id="wzMatchId" type="text" className="border-2 border-black-250 rounded-md"/>
                    </div>
                    <button className="relative px-5 py-2 font-medium text-white group mx-2 mt-4" onClick={closeModal}>
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
                </div>
            </Modal>    
        </>
    )
}

export default WzStringModal;