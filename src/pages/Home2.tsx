// import "./App.css";
import Modal from "../Components/Modal";
import LoadModal from "../Components/LoadModal";
import { finalTourney } from "../Components/Modal";
import "./Home2.css";
import { match } from "assert";

function sumArray(array: string | any[]){
    let sum = 0
    for (let i=0; i< array.length; i+=1 ){
        sum += array[i]
    }
    return sum
}

function testFunc(){
    console.log("test works")
}

export function displayTournament2(){
    let score = 0
    let tournamentContainer = document.getElementById('tournamentContainer') // everything but the buttons on top and navbar
    tournamentContainer!.innerHTML = ''
    let squad = document.createElement('squad') // this is the number of squads. used for determining the number of rows. everything should append in here
                                                // basically the section for all the squads aka each teamelement
    squad.id = 'squad'
    let multiplierList = document.createElement('multiplierList') // list of multis for each placement, this works
    multiplierList.id = 'multiplierList'
    let wzId = document.createElement('wzId') // spot to enter the match string and submit it, works
    let wzIdInput: any | Node;
    let amountofgames = 0
    amountofgames = finalTourney.get('games').size
    let wzIdSubmitButton: any | Node;
    let numTeams = 0

    for (let y = 0; y < finalTourney.get('games').size; y++){ // for the number of games, make a wz match id input and a submit game button
        wzIdInput = document.createElement('input')
        wzIdInput.type = 'input'
        wzIdInput.id = `wzIdInput${y+1}`
        wzIdInput.placeholder = `wz id for game ${y+1}`
        wzIdInput.value = "752505576671720088" // delete this when done testing
        wzId.append(wzIdInput)

        wzIdSubmitButton = document.createElement('button') // creating a new submit button next to the game ids instead
        wzIdSubmitButton.id = `updateGame${y+1}`
        wzIdSubmitButton.type = 'button'
        wzIdSubmitButton.innerHTML = `Submit Game ${y+1}`



        wzIdSubmitButton.onclick = () => { // When you click "submit game x " creating the game section
            // testFunc()
            const inputId = `wzIdInput${y+1}`; // Construct the ID of the corresponding input element
            const matchString = (document.getElementById(inputId) as HTMLInputElement).value; // Get the value of the input element using its ID

            // this is the start of the spot im lining up player elims, placement and score for each game
            let games = document.createElement(`game`) // this is where the elims, place and scores go
            games.id = `game${y+1}`

            // this is the start of the spot where im creating a teamList obj
            let playerTeam = '';
            let currentPlayer = '';
            let currentPlayerElims = 0;
            let currentPlayerTeamPlace = 0;

            type teamListType = {
                [key: string]: { [key: string]: { Elims: number, teamPlace: number } }
            }
            let teamList: teamListType = {
                // team_three: {
                //     'Shanks': { Elims: 4, teamPlace: 3 },
                //     'Dandro': { Elims: 5, teamPlace: 3 },
                //     'Brett': { Elims: 6, teamPlace: 3 }
                //   },
                //   team_four: {
                //     'Shanks': { Elims: 4, teamPlace: 3 },
                //     'Dandro': { Elims: 5, teamPlace: 3 },
                //     'Brett': { Elims: 6, teamPlace: 3 }
                //   }
            };

            (() => {
                fetch(`https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/${matchString}/it`)
                .then(response => response.json())
                .then(data => {
                    for (let n = 0; n < (data)['data']['allPlayers'].length; n++){
                        playerTeam = ((data)['data']['allPlayers'][n]['player']['team']) // this chunk of code creates the teamList obj i wanted
                        currentPlayer = (data)['data']['allPlayers'][n]['player']['username']
                        currentPlayerElims = (data)['data']['allPlayers'][n]['playerStats']['kills']
                        currentPlayerTeamPlace = (data)['data']['allPlayers'][n]['playerStats']['teamPlacement']
                        if (!(playerTeam in teamList)){
                            teamList[playerTeam] = { [currentPlayer]: { Elims: currentPlayerElims, teamPlace: currentPlayerTeamPlace } };
                        } else {
                            teamList[playerTeam][currentPlayer] = { Elims: currentPlayerElims, teamPlace: currentPlayerTeamPlace };
                        }
                    }
                    console.log(teamList)
                    numTeams = Object.keys(teamList).length;

                    for (let teamName in teamList) { // loop through each team in teamList and add their names to an input in a new row
                                                     // also want to add each of their elims to the page and add them together and multiply by multi
                                                     // THIS LOOPS TO CREATE EACH ROW
                                                     // NEXT STEP IN THE PROCESS: Create the green chunk. player elims and placement giving new score
                        let teamElement = document.createElement(`teamElement`) // The big pink box containing squads, games and scores
                        teamElement.innerText = `${teamName}`
                        squad?.append(teamElement) // squad is the container containing all the teamElements. should be called squads
                        let team = document.createElement('team')
                        team.id = teamName // team name is what is getting looped thru. will end up as team_whatever
                        let total = document.createElement('total') // box at the end adding up all the scores
                        total.id = `total${teamName}`
                        total.textContent = 'Total Score: '
                        let allScores: any[] = []
                        let playerName: HTMLInputElement;
                        let playerElims: HTMLInputElement;
                        // console.log(Object.values(teamList[teamName])[0].teamPlace)
                        for (let player in teamList[teamName]) { // looping through each player in each team
                            playerName = document.createElement('input');
                            playerName.type = 'input';
                            playerName.id = `${teamName}_${player}_score`;
                            playerName.value = player;
                            team.append(playerName);

                            playerElims = document.createElement('input')
                            playerElims.type = 'input';
                            playerElims.id = `${teamName}_${player}_elims`;
                            playerElims.value = teamList[teamName][player].Elims.toString();                            
                        }
                        teamElement.append(team) // appending each teams names and info to their pink box
                        teamElement.append(total) // total score section at the end to the pink box
                    }
                })
                .catch(error => console.log('error', error));
            })(); // end of api call
        } // end of wzId submit button onclick
        wzId.append(wzIdSubmitButton)
    } // end of the loop that creates each wzId input and submit game button. Runs 4 times in the example
    tournamentContainer?.append(wzId)

    for (let i = 1; i <= finalTourney.get('teams'); i++){ // for the number of teams, create a multiplier, defaulted to 1 bc most are 1
        let multiValue = document.createElement('input')
        let pTag = document.createElement('p')
        pTag.innerHTML = `multi ${i}`
        multiValue.type = 'input'
        multiValue.id = `place${i}`
        multiValue.value = '1'
        multiplierList.append(pTag)
        multiplierList.append(multiValue)
    }
    tournamentContainer?.append(multiplierList)
    tournamentContainer?.append(squad)

    // HERE -----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // HERE -----------------------------------------------------------------------------------------------------------------------------------------------------------------
    // HERE -----------------------------------------------------------------------------------------------------------------------------------------------------------------



    // for (let i = 1; i <= 11; i++){ // This creates the number of teams, a vertical stack, children of bracketContainer
    //     let teamElement = document.createElement(`teamElement`) 
    //     teamElement.innerText = `Team ${i}`
    //     squad?.append(teamElement) // CURRENT ONE WORKING
    //     let team = document.createElement('team') // this is where each team player name input should go
    //     team.id = 'team'
    //     let total = document.createElement('total')
    //     total.id = `total${i}`
    //     total.textContent = 'Total Score: '
    //     let allScores: any[] = []
    //     let playerName: any | Node




        // // these should be children of each team
        // // creating each player input
        // for (let x = 0; x < finalTourney.get('playersPerTeam'); x++){ // This creates the player name inputs in each vertical team line
        //     // // // console.log(`player${i}`)
        //     playerName = document.createElement('input')
        //     playerName.type = 'input'
        //     playerName.id = `player${x+1}`
        //     playerName.placeholder = `player ${x+1} input`
        //     playerName.value = "Shanks" // Get rid of this when done testing
        //     team.append(playerName)
        //     teamElement.append(team)
        // }

    //     // creating each game input necessary
    //     for (let y = 0; y < finalTourney.get('games').size; y++){ // This creates the game section
    //         // let gameInfo = document.createElement('div') // Need elims (editable input), placement(editable input), and a total score output (not editable)
    //         // let elims = document.createElement('input') //as HTMLInputElement
    //         let place = document.createElement('input')
    //         let games = document.createElement(`game`) // this is where the elims, place and scores go
    //         let elimSpot = document.createElement(`elims`) // this is where elims get stacked for the players 1-n
    //         let scoreSpot = document.createElement('score') as HTMLInputElement
    //         let scoreButton = document.createElement('button')
            
    //         allScores.push(0)
    //         // console.log(allScores)
    //         games.id = `game${y+1}`
            
    //         place.type = 'input'
    //         place.id = `placet${i}g${y+1}`
    //         place.placeholder = `g${y+1} placement`

    //         for (let ppt = 0; ppt < finalTourney.get('playersPerTeam'); ppt++){// this creates an elim input for each player ppt = players per team
    //             var elims = document.createElement('input') 
    //             elims.type = 'input'
    //             elims.id = `t${i}g${y+1}player${ppt+1}`
    //             elims.placeholder = `g${y+1} p${ppt+1} elims`
    //             elimSpot.append(elims)
    //             // games.append(elims)
    //             games.append(elimSpot)
    //         }

    //         // elims.type = 'input'
    //         // elims.id = `t${i}g${y+1}`
    //         // elims.placeholder = `elims for game ${y+1}`
            
    //         scoreSpot.id = `scoret${i}g${y+1}`
    //         scoreSpot.textContent = String(score)
    //         scoreButton.id = `scoreButtont${i}g${y+1}`
    //         scoreButton.type = 'button'
    //         scoreButton.innerHTML = 'Update Score'
    //         scoreButton.onclick = () => {
    //             let wzPlayerName = String(playerName.value);
    //             let matchString = String(wzIdInput.value);
    //             // console.log(String(wzIdInput.value))
    //             let wzPlayerElims = 0;
    //             let wzPlayerPlace = 0;

    //             // this is the start of the spot where im creating a teamList obj
    //             let playerTeam = '';
    //             let currentPlayer = '';
    //             type teamListType = {
    //                 [key : string]: string[],
    //             };
    //             let teamList: teamListType = {
    //                 // team_three : ['Shanks', 'Dandro_', 'BBBretty']
    //                 // team_four : ['Shanks', 'Dandro_', 'BBBretty']
    //             }; //this might not be the right spot for it but well see

    //             (() => {
    //                 // console.log("working")
    //                 fetch(`https://www.callofduty.com/api/papi-client/crm/cod/v2/title/mw/platform/battle/fullMatch/wz/${matchString}/it`)
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     for (let n = 0; n < (data)['data']['allPlayers'].length; n++){
    //                         if ((data)['data']['allPlayers'][n]['player']['username'] == wzPlayerName) {
    //                             // console.log(`found player number ${n}`)
    //                             // console.log((data)['data']['allPlayers'][n]['player']['username']) // Player in game name
    //                             wzPlayerElims = ((data)['data']['allPlayers'][n]['playerStats']['kills']) // Player kills
    //                             wzPlayerPlace = ((data)['data']['allPlayers'][n]['playerStats']['teamPlacement']) // Place
    //                             // console.log(`before wzPlayerElims is returned ${wzPlayerElims}`)
    //                             elims.value = String(wzPlayerElims)
    //                             place.value = String(wzPlayerPlace)
    //                             // console.log(`before wzPlayerElims is returned ${wzPlayerPlace}`)
    //                             // return [wzPlayerElims, wzPlayerPlace]
    //                             // console.log("first check")
    //                             continue
    //                         }
    //                         playerTeam = ((data)['data']['allPlayers'][n]['player']['team']) // this chunk of code creates the teamList obj i wanted
    //                         currentPlayer = (data)['data']['allPlayers'][n]['player']['username']
    //                         if (!(playerTeam in teamList)){
    //                             teamList[playerTeam] = [currentPlayer]
    //                         } else {
    //                             teamList[playerTeam].push(currentPlayer)
    //                         }
    //                     }
    //                 })
    //                 .catch(error => console.log('error', error));
    //             })();

    //             let specificScore = document.getElementById(`t${i}g${y+1}`) as HTMLInputElement
    //             let placeValue = (document.getElementById(`placet${i}g${y+1}`) as HTMLInputElement).value // What place the team came in
    //             let multiplier = (document.getElementById(`place${placeValue}`) as HTMLInputElement).value // Multiplier you get for your placement
    //             let totalScore = 0
    //             // console.log(`totalScore should be added together and is is ${totalScore}`)
    //             // console.log(`Final Score should be elims, ${Number(specificScore.value)} * placement multiplier, ${Number(multiplier)}`)
    //             score = (Number(specificScore.value)*(Number(multiplier)))
    //             allScores.splice(y,1,score)
    //             // console.log(`all scores is ${allScores}`)
    //             scoreSpot.textContent = String(score)
    //             totalScore = sumArray(allScores)
    //             // console.log(totalScore)
    //             total.textContent = 'Total Score: ' + totalScore
    //             // console.log(wzPlayerName)
    //             return score
    //         }
    //         // games.append(elims) // CURRENT ONE WORKING
    //         games.append(place) // CURRENT ONE WORKING
    //         games.append(scoreSpot)
    //         games.append(scoreButton)
    //         teamElement.append(games) // CURRENT ONE WORKING
    //         teamElement.append(total)

    //     }
    }
// }




export default function Home2() {
    return (
    <>
        <div className="buttonContainer">
            {/* <h1>Home</h1> */}
            <Modal />
            <LoadModal />
            <button className="saveBtn">Save</button>
            <button className="deleteBtn">Delete</button>
        </div>
        <div className="tournamentContainer" id="tournamentContainer">
            tournament container
            <br></br>
            the goal of this is ot take a map and display it nicely i think
        </div>
    </>
    )
}