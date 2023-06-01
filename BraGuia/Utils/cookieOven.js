import AsyncStorage from "@react-native-async-storage/async-storage";

const extractExpirationDate = (cookie) => {
    const expiresRegex = /expires=([^;]+)/;
    const match = cookie.match(expiresRegex);
  
    if (match && match[1]) {
      const expiresValue = match[1];
      const expiresTimestamp = Date.parse(expiresValue);
  
      if (!isNaN(expiresTimestamp)) {
        return new Date(expiresTimestamp);
      }
    }
  
    return null;
  };

// Function to check if stored cookies are valid
export const checkStoredCookiesValidity = async () => {
    try {
      const csrfToken = await AsyncStorage.getItem('csrftoken');
      const sessionId = await AsyncStorage.getItem('sessionid');
  
      if (csrfToken && sessionId) {
        // Get the expiration dates from the stored cookies (assuming expiration is stored in milliseconds)
        const csrfTokenExpiration = extractExpirationDate(csrfToken);
        const sessionIdExpiration = extractExpirationDate(sessionId);
  
        // Get the current date
        const currentDate = new Date();
  
        // Compare expiration dates with the current date
        if (csrfTokenExpiration > currentDate && sessionIdExpiration > currentDate) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking cookie validity:', error);
    }
  };
  
  export const formatLogoutCookie = async () => {
    const csrfToken = await AsyncStorage.getItem('csrftoken');
    const regex = /csrftoken=([^;]+)/;
    const match = csrfToken.match(regex);

    const result = match ? match[1] : null;

    return result;
  }

  export const cookieBakery = async () => {
    const csrfToken = await AsyncStorage.getItem('csrftoken');
    const regex = /csrftoken=([^;]+)/;
    const match = csrfToken.match(regex);

    const formattedcsrf = match ? match[1] : null;

    const sessionid = await AsyncStorage.getItem('sessionid');
    const regex2 = /sessionid=([^;]+)/;
    const match2 = sessionid.match(regex2);

    const formattedsession = match2 ? match2[1] : null;

    const finalOutput = 'csrftoken=' + formattedcsrf + ";sessionid=" + formattedsession;

    return finalOutput;
    
  }