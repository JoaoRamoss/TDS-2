import React, { useState } from 'react';
import TopHeader from '../Components/topHeader';
import BottomNavigationBar from '../Components/bottomNav';
import { ImageBackground, StyleSheet, View, Text, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';


const HomeScreen = () => {
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
      <ImageBackground
        source={require('./images/background.png')}
        resizeMode="cover"
        style={styles.image}
      >
        <TopHeader />
        <View style={styles.overlay}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              Descubra os tesouros escondidos de Braga com a nossa aplicação de guia virtual! Explore a rica história da cidade, a sua deslumbrante arquitetura e a cultura vibrante, tudo na palma da sua mão. Com recomendações personalizadas e dicas de especialistas, irá experienciar o melhor de Braga como um local. Faça o download da aplicação agora e comece a sua aventura!
            </Text>
          </View>
        </View>
      </ImageBackground>
      <BottomNavigationBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  image: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Adjust the overlay color and opacity as desired
    justifyContent: 'center',
  },
  textContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: .9,
    margin: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
});

export default HomeScreen;
