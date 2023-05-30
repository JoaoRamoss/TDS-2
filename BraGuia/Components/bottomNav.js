import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const BottomNavigationBar = ({ activeTab, onTabPress }) => {
    const tabs = ["Home", "Route", "Emergency", "Account"];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            activeTab === index && styles.activeTab,
          ]}
          onPress={() => onTabPress(index)}
        >
          <Icon
            name={tab === 'Home' ? 'home' : tab === 'Route' ? 'map' : tab === 'Emergency' ? 'star' : 'person'}
            size={24}
            color={activeTab === index ? '#d83349' : '#F9F9F9'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    width: '100%',
    backgroundColor: '#2D2E32',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {},
});

export default BottomNavigationBar;
