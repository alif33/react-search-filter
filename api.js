// This would be how to call the api by using a POST method and accessing the access token from there.

require('dotenv').config()

const getToken = async () => {
  const response = await fetch(`https://api.vasttrafik.se/token?${process.env.REACT_APP_grant}=${process.env.REACT_APP_cred}`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${process.env.REACT_APP_API_SECRET_KEY}`
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
  console.log(data);
}

fetchData();