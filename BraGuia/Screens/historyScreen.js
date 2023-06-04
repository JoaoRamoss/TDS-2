import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert, Linking, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getTrails } from '../Api/api';
import AltTopHeader from '../Components/altTopHeader';
import BottomNavigationBar from '../Components/bottomNav';
import { TrailListItem } from '../Components/trailComponent';
import { getData, clearStorage } from '../Database/database';

const History = () => {
  const [trails, setTrails] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setTrails(data);
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

  const handleClearHistory = () => {
    try {
        clearStorage();
        setTrails([]);
    }
    catch(error){
        console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <AltTopHeader />
      <View style={styles.content}>
        <FlatList
          data={trails}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TrailListItem trail={item}/>}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
      </View>
      <BottomNavigationBar activeTab={activeTab} onTabPress={handleTabPress} />
      {trails.length > 0 ?
        <TouchableOpacity style={styles.clearButton} onPress={handleClearHistory}>
            <Text style={styles.clearButtonText}>Limpar Histórico</Text>
        </TouchableOpacity> :

        <Text style={styles.vazio}>O histórico está vazio.</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingBottom: 19,
    paddingTop: 15
  },
  content: {
    flex: 1,
    position: 'relative',
    marginBottom: '7%',
    marginTop: '25%',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'gray',
    marginBottom: 5,
    marginTop: 5
  },
  clearButton: {
    backgroundColor: '#d83349',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 5,
    width: '40%',
    justifyContent: 'center',
    marginBottom: '15%'
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  vazio: {
    color: 'gray',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: '100%',
    fontSize: 15
  }
});

export default History;
