import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from "react";
import { getUserData } from "../Api/api";
import AltTopHeader from "../Components/altTopHeader";
import BottomNavigationBar from "../Components/bottomNav";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const UserPage = () => {
    const [userData, setUser] = useState({});

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
    

  const [formattedDate, setFormattedDate] = useState('');
  useEffect(() => {
    const formatDate = () => {
      const date = new Date(userData.date_joined);

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;

      setFormattedDate(formattedDate);
    };

    formatDate();
  }, [userData.date_joined]);


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
        <Text style={{fontWeight: 800}}>User Type: <Text style={{fontWeight: 400}}>{userData.user_type}</Text></Text>
        <Text style={{fontWeight: 800}}>Username: <Text style={{fontWeight: 400}}>{userData.username}</Text></Text>
        <Text style={{fontWeight: 800}}>First Name: <Text style={{fontWeight: 400}}>{userData.first_name}</Text></Text>
        <Text style={{fontWeight: 800}}>Last Name: <Text style={{fontWeight: 400}}>{userData.last_name}</Text></Text>
        <Text style={{fontWeight: 800}}>Email: <Text style={{fontWeight: 400}}>{userData.email}</Text></Text>
        <Text style={{fontWeight: 800}}>Date Joined: <Text style={{fontWeight: 400}}>{formattedDate}</Text></Text>
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