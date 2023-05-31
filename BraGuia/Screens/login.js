import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Image, TextInput, Button, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { login } from '../Api/api';

import logoImage from './images/logo.png'; // Import the logo image

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);

    login(username, password)
      .then((responseData) => {
        // Handle the response data
        // console.log(responseData);
      })
      .catch((error) => {
        // Handle any errors
        // console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonLoading]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: windowWidth * 0.5,
    resizeMode: 'contain',
    marginBottom: '30%' 
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#d83349',
    borderRadius: 5,
    marginTop: '10%',
    paddingVertical: 10,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonLoading: {
    width: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
