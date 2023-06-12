import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  Linking,
  TouchableOpacity,
  TextInput, // Import TextInput
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getTrails } from '../Api/api';
import TopHeader from '../Components/topHeader';
import BottomNavigationBar from '../Components/bottomNav';
import { TrailListItem } from '../Components/trailComponent';

const Trails = () => {
  const [trails, setTrails] = useState([]);
  const [searchText, setSearchText] = useState(''); // State for search text
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

  const filterTrails = (trails, searchText) => {
    return trails.filter((trail) => {
      const trailName = trail.trail_name ? trail.trail_name.toLowerCase() : '';
      const trailDesc = trail.trail_desc ? trail.trail_desc.toLowerCase() : '';

      return trailName.includes(searchText.toLowerCase()) || trailDesc.includes(searchText.toLowerCase());
    });
  };
  

  const filteredTrails = filterTrails(trails, searchText); // Apply filtering
  return (
    <View style={styles.container}>
      <TopHeader />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <View style={styles.content}>
        <FlatList
          data={filteredTrails}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TrailListItem trail={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    paddingTop: 15,
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: "25%"
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    position: 'relative',
    marginBottom: Platform.OS === 'ios' ? '20%' : '15%',
    marginTop: '5%',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'gray',
    marginBottom: 5,
    marginTop: 5,
  },
});

export default Trails;
