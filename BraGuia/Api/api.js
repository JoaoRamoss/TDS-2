import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatLogoutCookie, cookieBakery } from '../Utils/cookieOven';

const BASE_URL = 'https://c5a2-193-137-92-29.eu.ngrok.io'


export const login = async (user, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      "username": user,
      "password": password,
    }, {withCredentials: false});

    //Handle Regex for cookie extraction
    const cookies = response.headers['set-cookie'][0];
    const regex1 = /csrftoken=.*?Lax, /;
    const regex2 = /sessionid=.*?Lax$/;

    //Extract cookies
    const csrftoken = cookies.match(regex1)[0];
    const sessionid = cookies.match(regex2)[0];
    
    //Locally store cookies
    await AsyncStorage.setItem('csrftoken', csrftoken);
    await AsyncStorage.setItem('sessionid', sessionid);

    return response.data;
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("As credenciais fornecidas não são válidas");
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
    throw error;
  }
};

export const getTrails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trails`);
    //console.log(response.data[0].edges[0].edge_start.pin_lat);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = async() => {
  try {
    const cookie = await formatLogoutCookie();
    const headers = {
      "csrftoken": cookie
    };
    const response = await axios.post(`${BASE_URL}/logout`, {headers, withCredentials: false});
    console.log("Succesfully logged out!");
  }
  catch (error){
    console.log(error.message);
  }
  try {
    await AsyncStorage.removeItem('csrftoken');
    await AsyncStorage.removeItem('sessionid');
    console.log('Cookies deleted successfully.');
  } catch (error) {
    console.error('Error deleting cookies:', error);
  }
}


export const getUserData = async () => {
  try {
    const cookie = await cookieBakery();
    const headers = {
      'Cookie': cookie
    };
    const response = await axios.get(`${BASE_URL}/user`, {headers});
    return response.data;
  }
  catch(error) {
    console.log("error: " + error.message);
  }
}


  