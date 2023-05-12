import { useState, Dispatch, SetStateAction } from 'react'
import Modal from "Components/Modal";
import { formatPlacement } from "pages/Score/Games/utils";

interface MultiplierModalProps {
    multipliers: {[key: string]: string}
    setMultipliers: Dispatch<SetStateAction<{ [key: string]: string; }>>
    isOpen: boolean
    closeModal: () => void
}

const MultiplierModal = ({ multipliers, setMultipliers, isOpen, closeModal }: MultiplierModalProps) => {
    const [showMultipliers, setShowMultipliers] = useState<boolean>(!multipliers)
    const addMultis = () => {
        const placement = document.getElementById(`multiplierPlacement`) as HTMLInputElement
        const multiplier = document.getElementById(`multiplier`) as HTMLInputElement

        setMultipliers(prevMultipliers => ({
            ...prevMultipliers,
            [placement.value]: multiplier.value
          }));

        setShowMultipliers(true)
    }
    const addMultiAndClose = () => {
        addMultis()
        closeModal()
    }


    return (
        <>
            <Modal isOpen={isOpen} closeModal={closeModal} onSubmit={ () => console.log()}>
                <div className="flex flex-col ">
                    <div className="flex flex-col items-center">
                        Placement
                        <input id="multiplierPlacement" type="text" className="border-2 border-black-250 rounded-md"/>
                    </div>
                    <div className="flex flex-col items-center">
                        Multiplier
                        <input id="multiplier" type="text" className="border-2 border-black-250 rounded-md"/>
                    </div>
                    <button className="relative px-5 py-2 font-medium text-white group mx-2 mt-4" onClick={addMultis}>
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-green-500 group-hover:bg-green-700 group-hover:skew-x-12"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-green-700 group-hover:bg-green-500 group-hover:-skew-x-12"></span>
                        <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-green-600 -rotate-12"></span>
                        <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-green-400 -rotate-12"></span>
                        <span className="relative">Submit & Add More</span>
                    </button>
                    <button className="relative px-5 py-2 font-medium text-white group mx-2 mt-4" onClick={addMultiAndClose}>
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-green-500 group-hover:bg-green-700 group-hover:skew-x-12"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-green-700 group-hover:bg-green-500 group-hover:-skew-x-12"></span>
                        <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-green-600 -rotate-12"></span>
                        <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-green-400 -rotate-12"></span>
                        <span className="relative">Submit & Close</span>
                    </button>
                    <button className="relative px-5 py-2 font-medium text-white group mx-2 mt-4" onClick={closeModal}>
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-green-500 group-hover:bg-green-700 group-hover:skew-x-12"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-green-700 group-hover:bg-green-500 group-hover:-skew-x-12"></span>
                        <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-green-600 -rotate-12"></span>
                        <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-green-400 -rotate-12"></span>
                        <span className="relative">Cancel</span>
                    </button>
                    <div className="absolute w-56 sm:w-24 mt-72 sm:ml-60 sm:mt-0 ease-in-out duration-1000 z-50">
                        <div className="bg-white rounded p-2 min-h-[208px] h-auto">
                            {showMultipliers && Object.keys(multipliers).map((key) => (
                                <div className='flex flex-row justify-around'>
                                    <div>
                                        {formatPlacement(Number(key))}:
                                    </div>
                                    <div>
                                        {multipliers[key]} 
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>    
                </div>
            </Modal>    
        </>
    )
}

export default MultiplierModal;