import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { login } from '../Api/api';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { checkStoredCookiesValidity } from '../Utils/cookieOven';

import logoImage from './images/logo.png';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkCookiesAndNavigate = async () => {
      if (await checkStoredCookiesValidity() === true) {
        navigation.navigate("Home");
      }
    };

    checkCookiesAndNavigate();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setUsername('');
      setPassword('');
    }, [])
  );

  const handleLogin = () => {
    setIsLoading(true);
    Keyboard.dismiss();

    login(username, password)
      .then((responseData) => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        //inform user of error
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          selectionColor="rgba(216, 51, 73, 0.7)"
          placeholder="Nome de utilizador"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          selectionColor="rgba(216, 51, 73, 0.7)"
          placeholder="Palavra-passe"
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
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: '30%',
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
