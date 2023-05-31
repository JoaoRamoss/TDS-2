import React from 'react';
import { View, Button, StyleSheet, Alert, Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import TopHeader from '../Components/topHeader';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BottomNavigationBar from '../Components/bottomNav';
import { useState } from 'react';
import { faUser, faHistory, faCog, faPhone } from '@fortawesome/free-solid-svg-icons';

const AccountPage = () => {
  const handleLogout = () => {
    // Handle logout logic
  };

  const navigation = useNavigation();

  useFocusEffect(() => {
    setActiveTab(0); // Set the initial active tab when the component mounts
  });

  const [activeTab, setActiveTab] = useState(0);
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
      <View style={styles.buttonRow}>
        <Button
          title="Perfil"
          onPress={() => {}}
          color="black"
        />
        <FontAwesomeIcon icon={faUser} size={24} style={styles.icon} />
      </View>

      <View style={styles.buttonRow}>
        <Button
          title="Histórico"
          onPress={() => {}}
          color="black"
        />
        <FontAwesomeIcon icon={faHistory} size={24} style={styles.icon} />
      </View>

      <View style={styles.buttonRow}>
        <Button
          title="Definições"
          onPress={() => {}}
          color="black"
        />
        <FontAwesomeIcon icon={faCog} size={24} style={styles.icon} />
      </View>

      <View style={styles.buttonRow}>
        <Button
          title="Contacte-nos"
          onPress={() => {}}
          color="black"
        />
        <FontAwesomeIcon icon={faPhone} size={24} style={styles.icon} />
      </View>

      <View style={[styles.logoutButton, styles.redButton]}>
        <Button
          title="Logout"
          onPress={handleLogout}
          color="red"
        />
      </View>
      <BottomNavigationBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginLeft: 10,
  },
  logoutButton: {
    marginTop: 40,
  },
  redButton: {
    backgroundColor: 'red',
    width: 150,
  },
});

export default AccountPage;
