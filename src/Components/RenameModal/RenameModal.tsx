import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from "Components/Modal";

export let createdTourney = {};
export let finalTourney = new Map<any, any>();
let gamesMap = new Map<string, string>();

type Scoreboard = {
  name: string;
  teams: number;
  playersPerTeam: number;
  games: number;
  lowsToDrop: number;
  warzone: boolean;
  active: boolean;
};

function gameAdder(gameNum: any, emtpyStr: any) {
  gamesMap.set(gameNum, emtpyStr);
}

function tournamentCreator(tourneyInfo: object) {
  // testing to see if i can dynamically create games and put it into a dictionary
  let gameName = "";
  gamesMap.clear();
  for (let i = 1; i < Number(Object.values(tourneyInfo)[3]) + 1; i++) {
    gameName = "game" + i; // creates game1, game2, etc as strings
    // console.log(gameName)
    gameAdder(gameName, "");
  }
  // console.log("gamesMap: ")
  // console.log(gamesMap)
  finalTourney.set(
    Object.keys(createdTourney)[0],
    Object.values(createdTourney)[0]
  );
  finalTourney.set(
    Object.keys(createdTourney)[1],
    Object.values(createdTourney)[1]
  );
  finalTourney.set(
    Object.keys(createdTourney)[2],
    Object.values(createdTourney)[2]
  );
  finalTourney.set("games", gamesMap);
  finalTourney.set(
    Object.keys(createdTourney)[4],
    Object.values(createdTourney)[4]
  );
  finalTourney.set(
    Object.keys(createdTourney)[5],
    Object.values(createdTourney)[5]
  );
  // console.log(finalTourney)
}

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const RenameModal = ({ isOpen, closeModal }: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Scoreboard>();
  let newBox = document.getElementById("tournamentContainer"); // Getting a js variable attached to the html section

  const [tounrneyList, setTourneyList] = useState();
  const navigate = useNavigate();

  function addTournament() {
    setTourneyList(tounrneyList);
  }

  const onSubmit = handleSubmit((data) => {
    // Take the form data and make a little box with the relevant info
    // Add buttons to activate/edit each little box
    let temp; // creating a variable to attach the data to as a STRING
    temp = JSON.stringify(data); // filling temp with info as a STRING typeof(temp) = string
    createdTourney = JSON.parse(temp); // taking the temp STRING and making it a json OBJECT typeof(createdTourney) = object
    console.log(`You just created ${temp}`);
    closeModal();
    tournamentCreator(createdTourney);
    navigate("/score", { state: { sheetData: data } });
    // console.log(createdTourney)

    // let setActive = document.createElement('input')// Creating Buttons
    // setActive.type = 'button'
    // setActive.value = 'Set Active'
    // setActive.onclick = () => {alert("SETTING ACTIVE?!")}
    // let editTourney = document.createElement('input')
    // editTourney.type = 'button'
    // editTourney.value = 'Edit'
    // editTourney.onclick = () => {alert("EDITING?!")}
    // let delBtn = document.createElement('input')
    // delBtn.type = 'button'
    // delBtn.value = 'Delete'
    // delBtn.addEventListener("click", function() {this.parentElement?.remove()})

    // let div = document.createElement("div") // creating a new div to stick the json object into. this is the little box
    // div.append(temp) // appending the json string to the div to display on the page
    // div.append(setActive)
    // div.append(editTourney)
    // div.append(delBtn)
    // newBox?.append(div) // appending the div that has the json string to the js variable attached to the html section
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
                {/* GET RID OF VALUES WHEN YOU DONT NEED THEM AND THE "checked" PART OF THE CHECKBOX */}
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

export default RenameModal;
