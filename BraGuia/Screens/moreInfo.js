import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AltTopHeader from '../Components/altTopHeader';
import BottomNavigationBar from '../Components/bottomNav';
import { getMediaList } from '../Utils/edgeUtils';
import Icon from 'react-native-vector-icons/FontAwesome';

export const MoreInfoScreen = ({ route }) => {
  const trail = route.params;
  const media = getMediaList(trail.edges);
  console.log(media);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState(1);
  const [isPlaying, setIsPlaying] = useState([]);

  useFocusEffect(() => {
    setActiveTab(1); // Set the initial active tab when the component mounts
  });

  useEffect(() => {
    // Pause all videos when the component is loaded
    setIsPlaying(Array(media.length).fill(false));

    return () => {
      // Pause all videos when the component is unmounted
      setIsPlaying(Array(media.length).fill(false));
    };
  }, [media.length]);

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

  const showConfirmationAlert = ({ trail }) => {
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

  const handleVideoPress = (index) => {
    setIsPlaying((prevIsPlaying) => {
      const newIsPlaying = [...prevIsPlaying];
      newIsPlaying[index] = !newIsPlaying[index];
      return newIsPlaying;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{trail.trail_name}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {media.map((mediaItem, index) => (
          <View key={index} style={styles.mediaContainer}>
            {mediaItem.media_type === 'I' ? (
              <Image source={{ uri: mediaItem.media_file }} style={[styles.image, { height: Dimensions.get('window').width / 1.5 * 9 / 16 }]} />
            ) : (
              <TouchableOpacity onPress={() => handleVideoPress(index)}>
                <View style={styles.videoContainer}>
                  <Video
                    source={{ uri: mediaItem.media_file }}
                    style={styles.video}
                    resizeMode="contain"
                    isLooping
                    shouldPlay={isFocused && isPlaying[index]}
                    useNativeControls={false} // Disable default video controls
                  />
                  {!isPlaying[index] && (
                    <TouchableOpacity
                      style={styles.playButton}
                      onPress={() => handleVideoPress(index)}
                    >
                      <Icon name="play" size={30} color="#fff" />
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      <AltTopHeader />
      <BottomNavigationBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
  },
  name: {
    marginTop: '20%',
    fontWeight: 'bold',
    marginBottom: '10%',
    fontSize: 25,
  },
  mediaContainer: {
    marginRight: 10,
    marginLeft: 10,
  },
  image: {
    width: Dimensions.get('window').width / 2,
    resizeMode: 'contain',
  },
  videoContainer: {
    aspectRatio: 16 / 9,
    width: Dimensions.get('window').width / 1.5, // Adjust the width as needed
    position: 'relative',
  },
  video: {
    flex: 1,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
