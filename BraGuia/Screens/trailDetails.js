import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AltTopHeader from '../Components/altTopHeader';
import BottomNavigationBar from '../Components/bottomNav';
import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { extractPinsFromEdges } from '../Utils/pinUtils';
import { createPinFromLocation } from '../Utils/locationUtils';
import MapScreen from '../Components/mapScreen';
import { useNavigation } from '@react-navigation/native';
import { generateGoogleMapsLink } from '../Utils/navigationUtils';
import { Linking } from 'react-native';
import { getUserData } from '../Api/api';

const TrailDetails = ({ route }) => {
  const [userType, setUserType] = useState('Standard');
  const [isLoadingStartRoute, setIsLoadingStartRoute] = useState(false); // Track loading state for the "Iniciar rota" button
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Track loading state for the "Mais" button

  const trail = route.params;
  const navigation = useNavigation();

  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const locationPin = await createPinFromLocation();
        const extractedPins = extractPinsFromEdges(trail.edges);

        // Prepend the locationPin to the extracted pins
        const allPins = [locationPin, ...extractedPins];
        setPins(allPins);
      } catch (error) {
        console.log('Error fetching pins: ' + error);
      }
    };

    fetchPins();
  }, []);

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
    Alert.alert('Pretende ligar para os serviços de emergência?', '', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: callEmergency,
      },
    ]);
  };

  const callEmergency = () => {
    const phoneNumber = '112';
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleStartRoutePress = (pins) => {
    setIsLoadingStartRoute(true); // Set loading state to true when "Iniciar rota" button is pressed

    // Simulate a delay to show the loading spinner
    setTimeout(() => {
      setIsLoadingStartRoute(false); // Set loading state to false after the delay

      const link = generateGoogleMapsLink(pins);
      Linking.openURL(link).catch((error) => {
        console.log('Error opening Google Maps link: ' + error);
      });
    }, 1500);
  };

  const handleMorePress = () => {
    setIsLoadingMore(true); // Set loading state to true when "Mais" button is pressed

    // Simulate a delay to show the loading spinner
    setTimeout(() => {
      setIsLoadingMore(false); // Set loading state to false after the delay

      navigation.navigate('MoreInfo', route.params);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapScreen pins={pins} toolbarEnabled={false} />
        {userType === 'Premium' && (
          <TouchableOpacity
            style={styles.startRouteButton}
            onPress={() => handleStartRoutePress(pins)}
            disabled={isLoadingStartRoute} // Disable the button while loading
          >
            {isLoadingStartRoute ? ( // Display the activity indicator when isLoadingStartRoute is true
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Iniciar rota</Text>
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.moreButton}
          onPress={handleMorePress}
          disabled={isLoadingMore} // Disable the button while loading
        >
          {isLoadingMore ? ( // Display the activity indicator when isLoadingMore is true
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Mais</Text>
          )}
        </TouchableOpacity>
      </View>
      <AltTopHeader />
      <BottomNavigationBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  startRouteButton: {
    position: 'absolute',
    width: '40%',
    bottom: '10%',
    left: 16,
    backgroundColor: 'rgba(216, 51, 73, 0.85)',
    borderRadius: 8,
    padding: 12,
  },
  moreButton: {
    position: 'absolute',
    bottom: '10%',
    right: 16,
    backgroundColor: 'rgba(45, 46, 50, 0.85)',
    borderRadius: 8,
    padding: 12,
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TrailDetails;
