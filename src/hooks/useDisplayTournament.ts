import { useEffect, useState } from "react";
import { finalTourney } from "Components/RenameModal/RenameModal";

const sumArray = (array: string | any[]) => {
  let sum = 0;
  for (let i = 0; i < array.length; i += 1) {
    sum += array[i];
  }
  return sum;
};

const getTournamentData = async (matchStringId: string) => {
  try {
    console.log('ran')
    const response = await fetch(`http://127.0.0.1:8000/api/retrieve/${matchStringId}/`, {
      method: 'GET'
    })
    console.log(response)
    if (!response) {
      throw new Error("Error fetching data");
    }

    const data = await response.json();
    if (!data) {
      throw new Error("No data returned");
    }
    console.log('retrieve', data)
    return data;
    // Do something with the data
  } catch (error) {
    console.error(error);
  }

  // try {
  //   const response = await fetch(
  //     `https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/${matchStringId}/it`
  //   );
  //   if (!response) {
  //     throw new Error("Error fetching data");
  //   }

  //   const data = await response.json();
  //   if (!data) {
  //     throw new Error("No data returned");
  //   }

  //   return data.data.allPlayers;
  //   // Do something with the data
  // } catch (error) {
  //   console.error(error);
  // }
};

const useDisplayTournament = async (matchStringId: string) => {
  const [data, setData] = useState<[]>();

  useEffect(() => {
    getTournamentData(matchStringId)
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTournamentData]);

  if (!data) return;
  return
  // const gameData = data?.reduce((acc: any, game: any) => {
  //   const team = game.player.team;

  //   if (!acc[team]) {
  //     acc[team] = {
  //         name: team,
  //         players: [
  //           {
  //             name: game.player.username,
  //             kills: game.playerStats.kills,
  //             teamPlacement: game.playerStats.teamPlacement
  //           },
  //         ],
  //     };
  //   } else {
  //     const player = {
  //       name: game.player.username,
  //       kills: game.playerStats.kills,
  //       teamPlacement: game.playerStats.teamPlacement
  //     };

  //     acc[team].players.push(player);
  //   }

  //   return acc;
  // }, {});

  // const gameDataArray = {gameData: Object.values(gameData), warzoneMatchString: matchStringId};

  // try {
  //   const response = await fetch('http://127.0.0.1:8000/api/create/', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json'},
  //     body: JSON.stringify(gameDataArray)
  //   })
  //   console.log('useDisplayTournament line 82: \n', response.json())
  // } catch (error) { // Add actual error in the future
  //   console.log('useDisplayTournament line 84', error)
  // }
  // console.log(gameDataArray)
  // return gameDataArray;
};

// const displayTournament = () => {
//   let score = 0;

//   let tournamentContainer = document.getElementById("tournamentContainer");
//   tournamentContainer!.innerHTML = "";

//   let squad = document.createElement("squad"); // this is the number of squads. used for determining the number of rows. everything should append in here
//   squad.id = "squad";
//   let multiplierList = document.createElement("multiplierList");
//   multiplierList.id = "multiplierList";
//   let wzId = document.createElement("wzId");
//   let wzIdInput: any | Node;
//   let amountofgames = 0;
//   amountofgames = finalTourney.get("games").size;
//   // console.log(amountofgames)

//   for (let y = 0; y < finalTourney.get("games").size; y++) {
//     // for the number of games, make a wz game id input
//     wzIdInput = document.createElement("input");
//     wzIdInput.type = "input";
//     wzIdInput.id = `wzIdInput${y + 1}`;
//     wzIdInput.placeholder = `wz id for game ${y + 1}`;
//     wzId.append(wzIdInput);
//   }
//   tournamentContainer?.append(wzId);

//   for (let i = 1; i <= finalTourney.get("teams"); i++) {
//     // for the number of teams, create a multiplier, defaulted to 1 bc most are 1
//     let multiValue = document.createElement("input");
//     let pTag = document.createElement("p");
//     pTag.innerHTML = `multi ${i}`;
//     multiValue.type = "input";
//     multiValue.id = `place${i}`;
//     multiValue.value = "1";
//     multiplierList.append(pTag);
//     multiplierList.append(multiValue);
//   }
//   tournamentContainer?.append(multiplierList);
//   tournamentContainer?.append(squad);

//   // HERE -----------------------------------------------------------------------------------------------------------------------------------------------------------------
//   // HERE -----------------------------------------------------------------------------------------------------------------------------------------------------------------
//   // HERE -----------------------------------------------------------------------------------------------------------------------------------------------------------------

//   for (let i = 1; i <= finalTourney.get("teams"); i++) {
//     // This creates the number of teams, a vertical stack, children of bracketContainer
//     let teamElement = document.createElement(`teamElement`);
//     teamElement.innerText = `Team ${i}`;
//     squad?.append(teamElement); // CURRENT ONE WORKING
//     let team = document.createElement("team"); // this is where each team player name input should go
//     team.id = "team";
//     let total = document.createElement("total");
//     total.id = `total${i}`;
//     total.textContent = "Total Score: ";
//     let allScores: any[] = [];
//     let playerName: any | Node;

//     // these should be children of each team
//     // creating each player input
//     for (let x = 0; x < finalTourney.get("playersPerTeam"); x++) {
//       // This creates the player name inputs in each vertical team line
//       // // // console.log(`player${i}`)
//       playerName = document.createElement("input");
//       playerName.type = "input";
//       playerName.id = `player${x + 1}`;
//       playerName.placeholder = `player ${x + 1} input`;
//       team.append(playerName);
//       teamElement.append(team);
//     }

//     // creating each game input necessary
//     for (let y = 0; y < finalTourney.get("games").size; y++) {
//       // This creates the game section
//       // let gameInfo = document.createElement('div') // Need elims (editable input), placement(editable input), and a total score output (not editable)
//       // let elims = document.createElement('input') //as HTMLInputElement
//       let place = document.createElement("input");
//       let games = document.createElement(`game`); // this is where the elims, place and scores go
//       let elimSpot = document.createElement(`elims`); // this is where elims get stacked for the players 1-n
//       let scoreSpot = document.createElement("score") as HTMLInputElement;
//       let scoreButton = document.createElement("button");

//       allScores.push(0);
//       // console.log(allScores)
//       games.id = `game${y + 1}`;

//       place.type = "input";
//       place.id = `placet${i}g${y + 1}`;
//       place.placeholder = `g${y + 1} placement`;

//       for (let ppt = 0; ppt < finalTourney.get("playersPerTeam"); ppt++) {
//         // this creates an elim input for each player ppt = players per team
//         var elims = document.createElement("input");
//         elims.type = "input";
//         elims.id = `t${i}g${y + 1}player${ppt + 1}`;
//         elims.placeholder = `g${y + 1} p${ppt + 1} elims`;
//         elimSpot.append(elims);
//         // games.append(elims)
//         games.append(elimSpot);
//       }

//       // elims.type = 'input'
//       // elims.id = `t${i}g${y+1}`
//       // elims.placeholder = `elims for game ${y+1}`

//       scoreSpot.id = `scoret${i}g${y + 1}`;
//       scoreSpot.textContent = String(score);
//       scoreButton.id = `scoreButtont${i}g${y + 1}`;
//       scoreButton.type = "button";
//       scoreButton.innerHTML = "Update Score";
//       scoreButton.onclick = () => {
//         let wzPlayerName = String(playerName.value);
//         let matchString = String(wzIdInput.value);
//         // console.log(String(wzIdInput.value))
//         let wzPlayerElims = 0;
//         let wzPlayerPlace = 0;
//         (() => {
//           // console.log("working")
//           fetch(
//             `https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/${matchString}/it`
//           )
//             .then((response) => response.json())
//             .then((data) => {
//               for (let n = 0; n < data["data"]["allPlayers"].length; n++) {
//                 if (
//                   data["data"]["allPlayers"][n]["player"]["username"] ==
//                   wzPlayerName
//                 ) {
//                   // console.log(`found player number ${n}`)
//                   // console.log((data)['data']['allPlayers'][n]['player']['username']) // Player in game name
//                   wzPlayerElims =
//                     data["data"]["allPlayers"][n]["playerStats"]["kills"]; // Player kills
//                   wzPlayerPlace =
//                     data["data"]["allPlayers"][n]["playerStats"][
//                       "teamPlacement"
//                     ]; // Place
//                   // console.log(`before wzPlayerElims is returned ${wzPlayerElims}`)
//                   elims.value = String(wzPlayerElims);
//                   place.value = String(wzPlayerPlace);
//                   // console.log(`before wzPlayerElims is returned ${wzPlayerPlace}`)
//                   // return [wzPlayerElims, wzPlayerPlace]
//                   // console.log("first check")
//                   continue;
//                 }
//                 // continue
//                 // console.log("second check")
//               }
//               console.log("third check");
//             })
//             .catch((error) => console.log("error", error));
//         })();
//         // console.log(`after wzPlayerElims is returned ${wzPlayerElims}`)
//         // console.log(`after wzPlayerElims is returned ${wzPlayerPlace}`)

//         let specificScore = document.getElementById(
//           `t${i}g${y + 1}`
//         ) as HTMLInputElement;
//         let placeValue = (
//           document.getElementById(`placet${i}g${y + 1}`) as HTMLInputElement
//         ).value; // What place the team came in
//         let multiplier = (
//           document.getElementById(`place${placeValue}`) as HTMLInputElement
//         ).value; // Multiplier you get for your placement
//         let totalScore = 0;
//         // console.log(`totalScore should be added together and is is ${totalScore}`)
//         // console.log(`Final Score should be elims, ${Number(specificScore.value)} * placement multiplier, ${Number(multiplier)}`)
//         score = Number(specificScore.value) * Number(multiplier);
//         allScores.splice(y, 1, score);
//         // console.log(`all scores is ${allScores}`)
//         scoreSpot.textContent = String(score);
//         totalScore = sumArray(allScores);
//         // console.log(totalScore)
//         total.textContent = "Total Score: " + totalScore;
//         // console.log(wzPlayerName)
//         return score;
//       };
//       // games.append(elims) // CURRENT ONE WORKING
//       games.append(place); // CURRENT ONE WORKING
//       games.append(scoreSpot);
//       games.append(scoreButton);
//       teamElement.append(games); // CURRENT ONE WORKING
//       teamElement.append(total);
//     }
//   }
// };

export default useDisplayTournament;
