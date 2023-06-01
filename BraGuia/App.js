
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/homeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Trails from './Screens/trails';
import AccountPage from './Screens/accountScreen';
import LoginScreen from './Screens/login';
import UserPage from './Screens/profile'

export default function App() {

  const Stack = createStackNavigator();


  // <Stack.Screen options={{ headerShown: false }} name = "Login" component={LoginScreen}/> <- Login (Temporarily disabled)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name = "Login" component={LoginScreen}/>
        <Stack.Screen options={{ headerShown: false }} name = "Home" component={HomeScreen}/>
        <Stack.Screen options={{ headerShown: false }} name = "Trails" component={Trails}/>
        <Stack.Screen options={{ headerShown: false }} name = "Account" component={AccountPage}/>
        <Stack.Screen options={{ headerShown: false }} name = "Profile" component={UserPage}/>
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
