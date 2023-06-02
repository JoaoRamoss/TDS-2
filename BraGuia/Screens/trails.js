import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert, Linking, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getTrails } from '../Api/api';
import TopHeader from '../Components/topHeader';
import BottomNavigationBar from '../Components/bottomNav';
import { TrailListItem } from '../Components/trailComponent';

const Trails = () => {
  const [trails, setTrails] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTrails();
        setTrails(data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();
  }, []);

  useFocusEffect(() => {
    setActiveTab(1); // Set the initial active tab when the component mounts
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
      <TopHeader />
      <View style={styles.content}>
        <FlatList
          data={trails}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TrailListItem trail={item}/>}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
      </View>
      <BottomNavigationBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingBottom: 15,
    paddingTop: 15
  },
  content: {
    flex: 1,
    position: 'relative',
    marginBottom: '15%',
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
});

export default Trails;
