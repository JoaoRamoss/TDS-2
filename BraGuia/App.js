import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/homeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Trails from './Screens/trails';
import LoginScreen from './Screens/login';

export default function App() {

  const Stack = createStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name = "Login" component={LoginScreen}/>
        <Stack.Screen options={{ headerShown: false }} name = "Home" component={HomeScreen}/>
        <Stack.Screen options={{ headerShown: false}} name = "Trails" component={Trails}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
