import React from 'react'
import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import TopHeader from '../Components/topHeader';
import BottomNavigationBar from '../Components/bottomNav';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const Trails = () => {

  const navigation = useNavigation();

  useFocusEffect(() => {
    setActiveTab(1); // Set the initial active tab when the component mounts
  });

  const [activeTab, setActiveTab] = useState(1);
  const handleTabPress = (index) => {

    switch(index) {
        case 0:
            navigation.navigate('Home');
            break;
        case 1: 
            navigation.navigate('Trails');
            break;
        default: 
            navigation.navigate('Home');
            break;
    }
    setActiveTab(index);
  };

  return (
    <View style={styles.container}>
        <TopHeader/>

        <BottomNavigationBar activeTab={activeTab} onTabPress={handleTabPress} />

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
  });
export default Trails