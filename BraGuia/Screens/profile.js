import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from "react";
import { getUserData } from "../Api/api";
import AltTopHeader from "../Components/altTopHeader";
import BottomNavigationBar from "../Components/bottomNav";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const UserPage = () => {
    const [userData, setUser] = useState({
      user_type: "",
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      date_joined: ""
    });

    const navigation = useNavigation();
    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getUserData();
          setUser(data);
        } catch (error) {
          console.log('Error:', error);
        }
      };
    
      fetchData();
    }, []);


  useFocusEffect(() => {
    setActiveTab(3); // Set the initial active tab when the component mounts
  });

  const [activeTab, setActiveTab] = useState(1);
  const handleTabPress = (index) => {
    switch (index) {
      case 0:
        navigation.navigate('Home');
        break;
      case 1:
        navigation.navigate('Trails');
        break;
      case 2:
        showConfirmationAlert();
        break;
      case 3:
        navigation.navigate('Account');
        break;
      default:
        navigation.navigate('Home');
        break;
    }
    setActiveTab(index);
  };

  const showConfirmationAlert = () => {
    Alert.alert(
      'Pretende ligar para os serviços de emergência?',
      '',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: callEmergency,
        },
      ],
      { cancelable: false }
    );
  };
  
  const callEmergency = () => {
    const phoneNumber = '112';
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AltTopHeader/>
      <View style={styles.container}>

      </View>
      <BottomNavigationBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    gap: 10,
  }
})

export default UserPage;