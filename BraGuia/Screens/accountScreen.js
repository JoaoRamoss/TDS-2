import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Linking, Button } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import TopHeader from '../Components/topHeader';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BottomNavigationBar from '../Components/bottomNav';
import { useState } from 'react';
import { faUser, faHistory, faCog, faPhone } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../Api/api';
import { useEffect } from 'react';
import { getUserData } from '../Api/api';

const AccountPage = () => {

  const [userType, setUserType] = useState('Standard');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData();
        setUserType(data.user_type);
      } catch (error) {
        console.log('Error:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleLogout = () => {
    logout().then(navigation.navigate("Login"));
  };


  const navigation = useNavigation();

  useFocusEffect(() => {
    setActiveTab(3); // Set the initial active tab when the component mounts
  });

  const handleProfilePress = () => {
    navigation.navigate("Profile");
  }

  const handleContactPress = () => {
    navigation.navigate("Contact")
  }

  const handleHistoryPress = () => {
    navigation.navigate("History")
  }

  const [activeTab, setActiveTab] = useState(3);
  const handleTabPress = (index) => {
    switch(index) {
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
    <View style={styles.container}>
      <TopHeader/>
      <TouchableOpacity
        style={styles.button}
        onPress={handleProfilePress}
      >
        <View style={styles.buttonContent}>
          <FontAwesomeIcon icon={faUser} size={24} style={styles.icon} />
          <Text style={styles.buttonText}>Perfil</Text>
          
        </View>
      </TouchableOpacity>

      { userType === 'Premium' &&
      <TouchableOpacity
        style={styles.button}
        onPress={handleHistoryPress}
      >
        <View style={styles.buttonContent}>
          <FontAwesomeIcon icon={faHistory} size={24} style={styles.icon} />
          <Text style={styles.buttonText}>Histórico</Text>
          
        </View>
      </TouchableOpacity>
      }

      <TouchableOpacity
        style={styles.button}
        onPress={() => {}}
      >
        <View style={styles.buttonContent}>
          <FontAwesomeIcon icon={faCog} size={24} style={styles.icon} />
          <Text style={styles.buttonText}>Definições</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleContactPress}
      >
        <View style={styles.buttonContent}>
          <FontAwesomeIcon icon={faPhone} size={24} style={styles.icon} />
          <Text style={styles.buttonText}>Contacte-nos</Text>
          
        </View>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}>
          <View style={styles.logoutButtonContent}><Text style={styles.logoutButtonText}>Logout</Text></View>
        </TouchableOpacity>
      <BottomNavigationBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  button: {
    marginBottom: 20,
    backgroundColor: '#2D2E32',
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '70%',
    borderRadius: 5
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  icon: {
    color: 'white',
    marginRight: 15
  },
  logoutButton: {
    marginTop: '40%',
    backgroundColor: '#d83349',
    width: 150,
    alignSelf: 'center',
    borderRadius: 5
  },
  logoutButtonContent: {
    alignSelf: 'center',
    margin: '5%'
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    fontWeight: 'bold'
  }
});

export default AccountPage;
