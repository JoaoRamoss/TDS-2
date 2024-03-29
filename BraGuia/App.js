
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/homeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Trails from './Screens/trails';
import AccountPage from './Screens/accountScreen';
import LoginScreen from './Screens/login';
import UserPage from './Screens/profile'
import ContactScreen from './Screens/contactScreen';
import TrailDetails from './Screens/trailDetails';
import { MoreInfoScreen } from './Screens/moreInfo';
import History from './Screens/historyScreen';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name = "Login" component={LoginScreen}/>
        <Stack.Screen options={{ headerShown: false }} name = "Home" component={HomeScreen}/>
        <Stack.Screen options={{ headerShown: false }} name = "Trails" component={Trails}/>
        <Stack.Screen options={{ headerShown: false }} name = "Account" component={AccountPage}/>
        <Stack.Screen options={{ headerShown: false }} name = "Profile" component={UserPage}/>
        <Stack.Screen options={{ headerShown: false }} name = "Contact" component={ContactScreen}/>
        <Stack.Screen options={{ headerShown: false }} name = "TrailDetails" component={TrailDetails}/>
        <Stack.Screen options={{ headerShown: false }} name = "MoreInfo" component={MoreInfoScreen}/>
        <Stack.Screen options={{ headerShown: false }} name = "History" component={History}/>
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
