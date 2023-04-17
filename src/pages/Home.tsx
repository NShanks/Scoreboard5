import { useState } from "react";
import RenameModal from "Components/RenameModal";
import LoadModal from "Components/LoadModal";

export default function Home() {
  const [isLoadModalOpen, setIsLoadModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <div className="">
        <RenameModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
        <LoadModal
          isOpen={isLoadModalOpen}
          closeModal={() => setIsLoadModalOpen(false)}
        />
        <div className="flex flex-row gap-2">
          <button
            className="border-2 border-black px-4 rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            Create
          </button>
          <button
            className="border-2 border-black px-4 rounded-md"
            onClick={() => setIsLoadModalOpen(true)}
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
