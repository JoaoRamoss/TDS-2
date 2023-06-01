import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import Pin from '../Model/pin';

export const createPinFromLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Location permission denied.');
    }

    return new Promise((resolve, reject) => {
      let subscription;

      const handleLocationUpdate = (location) => {
        const { coords } = location;
        const { latitude, longitude, altitude } = coords;
        const name = 'Localização atual'

        const pin = new Pin(name, latitude, longitude, altitude);
        resolve(pin);
      };

      const handleLocationError = (error) => {
        console.warn('Error getting location:', error);
        reject(error);
      };

      subscription = Location.watchPositionAsync({}, handleLocationUpdate, handleLocationError);

      return () => {
        if (subscription) {
          subscription.remove();
        }
      };
    });
  } catch (error) {
    console.warn('Error requesting location:', error);
    throw error;
  }
};
