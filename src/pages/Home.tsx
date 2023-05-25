import CreateTournamentModal from "Components/CreateTournamentModal";
import LoadModal from "Components/LoadModal";
import useModal from 'hooks/useModal'

export default function Home() {
  const { isModalOpen: isLoadModalOpen, openModal: openLoadModal, closeModal: closeLoadModal } = useModal();
  const { isModalOpen, closeModal, openModal} = useModal();

  return (
    <div className="flex justify-center">
      <CreateTournamentModal
        isOpen={isModalOpen}
        closeModal={closeModal}
      />
      <LoadModal
        isOpen={isLoadModalOpen}
        closeModal={closeLoadModal}
      />
      <div className="flex flex-col gap-2">
        <button
          className="border-2 border-black px-4 rounded-md h-44 text-9xl w-96 hover:bg-lime-400"
          onClick={openModal}
        >
          Create
        </button>
        <button
          className="border-2 border-black px-4 rounded-md h-44 text-9xl w-96 hover:bg-lime-400"
          onClick={openLoadModal}
        >
          Load
        </button>
        <button className="border-2 border-black px-4 rounded-md h-44 text-9xl w-96 hover:bg-lime-400">
          Save
        </button>
        <button className="border-2 border-black px-4 rounded-md h-44 text-9xl w-96 hover:bg-lime-400">
          Delete
        </button>
      </div>
    </div>
  );
}
