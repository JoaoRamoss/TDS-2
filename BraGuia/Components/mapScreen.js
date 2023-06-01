import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

const MapScreen = ({ pins }) => {
  const calculateMiddleRegion = (pins) => {
    if (pins.length === 0) {
      return null;
    }

    // Find the minimum and maximum latitude and longitude values
    let minLatitude = pins[0].lat;
    let maxLatitude = pins[0].lat;
    let minLongitude = pins[0].lng;
    let maxLongitude = pins[0].lng;

    pins.forEach((pin) => {
      if (pin.lat < minLatitude) minLatitude = pin.lat;
      if (pin.lat > maxLatitude) maxLatitude = pin.lat;
      if (pin.lng < minLongitude) minLongitude = pin.lng;
      if (pin.lng > maxLongitude) maxLongitude = pin.lng;
    });

    // Calculate the center coordinates and the delta values for the initial region
    const centerLatitude = (minLatitude + maxLatitude) / 2;
    const centerLongitude = (minLongitude + maxLongitude) / 2;
    const latitudeDelta = Math.abs(maxLatitude - minLatitude) * 1.2; // Add some padding
    const longitudeDelta = Math.abs(maxLongitude - minLongitude) * 1.2; // Add some padding

    // Define the initial region based on the calculated values
    const initialRegion = {
      latitude: centerLatitude,
      longitude: centerLongitude,
      latitudeDelta,
      longitudeDelta,
    };

    return initialRegion;
  };

  const initialRegion = calculateMiddleRegion(pins);

  // Create an array of coordinates for the polyline
  const polylineCoordinates = pins.map((pin) => ({
    latitude: pin.lat,
    longitude: pin.lng,
  }));

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
      >
        <Polyline
          coordinates={polylineCoordinates}
          strokeColor="#FF0000" // Customize the stroke color
          strokeWidth={3} // Customize the stroke width
          pinColor="#d83349"
        />
        {pins.map((pin, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: pin.lat,
              longitude: pin.lng,
            }}
            title={`${pin.name}`}
            description={`Latitude: ${pin.lat}, Longitude: ${pin.lng}`}
            pinColor="#d83349"
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*1.5,
  },
});

export default MapScreen;
