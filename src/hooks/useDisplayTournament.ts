import { useState, useEffect } from "react";

const getTournamentData = async (matchStringId: string, callback: (data: any) => void) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/retrieve/${matchStringId}/`, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const data = await response.json();

    if (!data) {
      throw new Error("No data returned");
    }

    callback(data);
  } catch (error) {
    console.error(error);
  }
};

const useDisplayTournament = (matchStringId: string) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    getTournamentData(matchStringId, setData);
  }, [matchStringId]);

  return data?.teams;
};

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


export default useDisplayTournament;
