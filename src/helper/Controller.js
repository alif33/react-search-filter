const getToken = async () => {
    const response = await fetch('https://api.vasttrafik.se/token?grant_type=client_credentials', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic QUNqVjFvWEhOM3NrblUzY3RTT3ltMHdtMzBzYTpmZm1mbVBmTU5URUQ3YXlRaEplZkp4TDd2Xzhh'
      }
    });
    const data = await response.json();
    return data.access_token;
  }
  
  const fetchData = async () => {
    const token = await getToken();
    const response = await fetch('https://api.vasttrafik.se/ts/v1/traffic-situations', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    const list = data.flatMap(item => item.affectedLines);
    // setList(list);
    const affectedStopPoints = data.flatMap(item => item.affectedStopPoints);
    // setAffectedStopPoints(affectedStopPoints);

    // setTrafficInfos(data);
    // setBaseData(data);

    return {
      data, list, affectedStopPoints
    }
}

export default fetchData;