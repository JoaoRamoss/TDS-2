import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import logo from './images/logo.png'

const TopHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.whiteBox}>
        <Image
          source={logo}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  whiteBox: {
    paddingTop: '10%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: "35%",
    height: 50,
  },
});

export default TopHeader;
