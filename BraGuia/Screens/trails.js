import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Alert, Linking } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getTrails } from '../Api/api';
import TopHeader from '../Components/topHeader';
import BottomNavigationBar from '../Components/bottomNav';

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

  const TrailListItem = ({ trail }) => {
    const MAX_DESCRIPTION_LENGTH = 150;

    const truncatedDescription =
      trail.trail_desc.length > MAX_DESCRIPTION_LENGTH
        ? trail.trail_desc.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
        : trail.trail_desc;

    return (
      <View style={styles.trailContainer}>
        <Image source={{ uri: trail.trail_img }} style={styles.trailImage} />
        <View style={styles.textWrapper}>
          <Text style={styles.name}>{trail.trail_name}</Text>
          <Text style={styles.whiteText}>{truncatedDescription}</Text>
          <View style={styles.moreInfo}>
            <Text style={styles.whiteText}>Duration: {trail.trail_duration} m</Text>
            <Text style={styles.whiteText}>Difficulty: {trail.trail_difficulty}</Text>
          </View>
        </View>
      </View>
    );
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
    marginTop: '18%',
  },
  trailContainer: {
    display: 'flex',
    gap: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    backgroundColor: '#2D2E32',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5
  },
  trailImage: {
    width: 100,
    height: 150,
    borderRadius: 5,
    alignSelf: 'center'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'gray',
    marginBottom: 5,
    marginTop: 5
  },
  name: {
    color: "#F9F9F9",
    fontWeight: '800'
  },
  textWrapper: {
    flex: 1,
    gap: 10
  },
  moreInfo: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    marginTop: '10%',
    color: '#F9F9F9'
  },
  whiteText: {
    color: '#F9F9F9'
  }
});

export default Trails;
