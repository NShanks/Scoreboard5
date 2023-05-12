import { useState } from "react";
import RenameModal from "Components/RenameModal";
import LoadModal from "Components/LoadModal";
import useModal from 'hooks/useModal'

export default function Home() {
  const { isModalOpen: isLoadModalOpen, openModal: openLoadModal, closeModal: closeLoadModal } = useModal();
  const { isModalOpen, closeModal, openModal} = useModal();

  return (
    <>
      <div className="">
        <RenameModal
          isOpen={isModalOpen}
          closeModal={closeModal}
        />
        <LoadModal
          isOpen={isLoadModalOpen}
          closeModal={closeLoadModal}
        />
        <div className="flex flex-row gap-2">
          <button
            className="border-2 border-black px-4 rounded-md"
            onClick={openModal}
          >
            Create
          </button>
          <button
            className="border-2 border-black px-4 rounded-md"
            onClick={openLoadModal}
          >
            Load
          </button>
          <button className="border-2 border-black px-4 rounded-md">
            Save
          </button>
          <button className="border-2 border-black px-4 rounded-md">
            Delete
          </button>
        </div>
      </div>
      <div className="text-3xl" id="tournamentContainer">
        tournament container
        <br></br>
        the goal of this is ot take a map and display it nicely i think
      </div>
    </>
  );
}
