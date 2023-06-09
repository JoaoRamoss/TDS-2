import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scaleFontSize = (size) => {
  const newSize = size * width/414;  // 414 is a reference iPhone 11 Pro Max width.
  return newSize;
};

export const TrailListItem = ({ trail }) => {
    const navigation = useNavigation();
    const MAX_DESCRIPTION_LENGTH = 150;

    const truncatedDescription =
      trail.trail_desc.length > MAX_DESCRIPTION_LENGTH
        ? trail.trail_desc.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
        : trail.trail_desc;

    const handleTrailPress = () => {
      // Navigate to a different page when a trail item is clicked
      navigation.navigate('TrailDetails', trail);
    };

    return (
      <TouchableOpacity style={styles.trailContainer} onPress={handleTrailPress}>
        <Image source={{ uri: trail.trail_img }} style={styles.trailImage} />
        <View style={styles.textWrapper}>
          <Text style={styles.name}>{trail.trail_name}</Text>
          <Text style={styles.whiteText}>{truncatedDescription}</Text>
          <View style={styles.moreInfo}>
            <Text style={styles.whiteText}>Duração: {trail.trail_duration} m</Text>
            <Text style={styles.whiteText}>Dificuldade: {trail.trail_difficulty}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
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

      name: {
        color: "#F9F9F9",
        fontWeight: '800',
        fontSize: scaleFontSize(16)
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
        color: '#F9F9F9',
        fontSize: scaleFontSize(14)
      }
  });