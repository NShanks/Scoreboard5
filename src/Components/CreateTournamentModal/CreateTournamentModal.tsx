import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from "Components/Modal";

type Scoreboard = {
  name: string;
  teams: number;
  playersPerTeam: number;
  games: number;
  lowsToDrop: number;
  warzone: boolean;
  active: boolean;
};

interface CreateTournamentModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const CreateTournamentModal = ({ isOpen, closeModal }: CreateTournamentModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Scoreboard>();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    closeModal();
    navigate("/score", { state: { sheetData: data } });
  });

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} closeModal={closeModal} onSubmit={onSubmit}>
          <div className="modal-content">
            <div className="flex justify-center text-2xl">
              Create Tournament
            </div>
            <div className="flex justify-center">
              <p className="w-1/2">
                The goal of this modal is to display a form to fill out to
                create a tournament. Will need info like warzone or not and some
                other info like the past tourney.
              </p>
            </div>
            <form onSubmit={onSubmit}>
              <div className="flex flex-row gap-4">
                <label htmlFor="name">Tournament Name:</label>
                <input
                  {...register("name", { required: true })}
                  id="name"
                  name="name"
                  type="string"
                  defaultValue={"default"}
                />
                {errors.teams && (
                  <div className="error">Enter the number of teams</div>
                )}
              </div>
              <div className="flex flex-row gap-4">
                <label htmlFor="teams">Teams:</label>
                <input
                  {...register("teams", { required: true })}
                  id="teams"
                  name="teams"
                  type="number"
                  defaultValue={"12"}
                />
                {errors.teams && (
                  <div className="error">Enter the number of teams</div>
                )}
              </div>
              <div className="flex flex-row gap-4">
                <label htmlFor="playersPerTeam">Players Per Team:</label>
                <input
                  {...register("playersPerTeam", { required: true })}
                  id="playersPerTeam"
                  name="playersPerTeam"
                  type="number"
                  defaultValue={"4"}
                />
                {errors.playersPerTeam && (
                  <div className="error">
                    Enter the number of players per team
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-4">
                <label htmlFor="games">Games:</label>
                <input
                  {...register("games", { required: true })}
                  id="games"
                  name="games"
                  type="number"
                  defaultValue={"4"}
                />
                {errors.games && (
                  <div className="error">Enter the number of games</div>
                )}
              </div>
              <div className="flex flex-row gap-4">
                <label htmlFor="lowsToDrop">Number of Low Games Dropped:</label>
                <input
                  {...register("lowsToDrop", { required: true })}
                  id="lowsToDrop"
                  name="lowsToDrop"
                  type="number"
                  defaultValue={"0"}
                />
                {errors.lowsToDrop && (
                  <div className="error">
                    Enter the number of low scoring games to drop
                  </div>
                )}
              </div>
              <div className="flex flex-row gap-4">
                <label htmlFor="warzone">Warzone</label>
                <input
                  {...register("warzone")}
                  id="warzone"
                  name="warzone"
                  type="checkbox"
                  defaultChecked
                />
              </div>
            </form>
            <div className="flex flex-row gap-4 mt-4">
              <button
                className="border-2 w-28 p-2 rounded border-black hover:border-blue-500 duration-150"
                onClick={onSubmit}
              >
                Submit
              </button>
              <button
                className="border-2 w-28 p-2 rounded border-black hover:border-blue-500 duration-150"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CreateTournamentModal;
