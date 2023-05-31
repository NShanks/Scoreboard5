const getTournamentData = async (matchStringId: string) => {
  if (!matchStringId) return

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/retrieve/${matchStringId}/`, {
      method: 'GET'
    })

    if (!response.ok) {
      console.log('did not make it')
      throw new Error("Error fetching data");
    }

    const data = await response.json();

    if (!data) {
      throw new Error("No data returned");
    }

    return data
  } catch (error) {
    console.error(error);
  }
};

export default getTournamentData;
