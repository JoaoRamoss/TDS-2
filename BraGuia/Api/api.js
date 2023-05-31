import axios from 'axios';
const BASE_URL = 'https://c5a2-193-137-92-29.eu.ngrok.io'


export const login = async (user, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      "username": user,
      "password": password,
    });

    // Return the response if needed
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("As credenciais fornecidas não são válidas");
    throw error;
  }
};

export const getTrails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trails`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.log('Error status:', error.response.status);
      console.log('Error data:', error.response.data);
      console.log('Error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made, but no response was received
      console.log('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an error
      console.log('Error message:', error.message);
    }
  }
};



  