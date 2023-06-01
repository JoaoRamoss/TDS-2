import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AltTopHeader from '../Components/altTopHeader';
import { useFocusEffect } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import BottomNavigationBar from '../Components/bottomNav';

const ContactScreen = () => {

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
    <View style={styles.container}>
      <AltTopHeader/>
      <Text style={styles.text}>João Silva: <Text style={styles.regularText}>PG50495@alunos.uminho.pt</Text></Text>
      <Text style={styles.text}>André Nunes: <Text style={styles.regularText}>A85635@alunos.uminho.pt</Text></Text>
      <Text style={styles.text}>Marco Sampaio: <Text style={styles.regularText}>PG47447@alunos.uminho.pt</Text></Text>
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
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  regularText: {
    fontWeight: 'normal',
  },
});

export default ContactScreen;
