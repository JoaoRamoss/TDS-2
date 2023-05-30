const BASE_URL = 'https://c5a2-193-137-92-29.eu.ngrok.io'

import axios from 'axios';

export const login = async (user, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username: user,
      password: password,
    });

    // Handle the response data here
    console.log(response.data);

    // Return the response if needed
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    throw error;
  }
};


  