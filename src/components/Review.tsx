import React, { useState } from 'react';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet } from 'react-native';
import OwnerResponseForm from './forms/OwnerResponseForm';
import { useNavigation } from '@react-navigation/native';
import { useTimePassed } from '../hooks/use-time-passed';

const Review = ({ review, canClickPlate = true, userPlate = false }) => {
  const {
    _id,
    isPositive,
    ownerResponse,
    createdAt,
    plateId,
    plateNumber,
    plateState,
    message,
  } = review;

  const [showResponseForm, setShowResponseForm] = useState(false);
  const navigation = useNavigation();
  const { timePassed, dateString } = useTimePassed(createdAt);

  const handlePlateClick = () => {
    // @ts-ignore
    if (canClickPlate) navigation.navigate('Plate', { id: plateId });
  };

  return (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewTitle}>
          <Image
            style={styles.icon}
            source={{ uri: 'https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-green-512.png' }}
          />
          <TouchableOpacity
            onPress={handlePlateClick}
            disabled={!canClickPlate}
          >
            <Text>{plateNumber} {plateState}</Text>
          </TouchableOpacity>
          <Text>{timePassed}</Text>
        </View>
        {/* Your custom icons or components can replace this Text element */}
        <View style={styles.reviewRating}>
          {/* <Text>{ratingIcon}</Text> */}
        </View>
      </View>
      <Text>{message}</Text>
      {ownerResponse && (
        <View style={styles.ownerComment}>
          <Text>{userPlate ? 'Your' : 'Driver'} Response: {ownerResponse}</Text>
        </View>
      )}
      {!ownerResponse && userPlate && (
        <TouchableOpacity style={styles.responseButton} onPress={() => setShowResponseForm(prev => !prev)}>
          <Text style={styles.buttonText}>Leave a response</Text>
        </TouchableOpacity>
      )}
      {showResponseForm && <OwnerResponseForm reviewId={_id} />}
      <Text>{dateString}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewItem: {
    borderRadius: 8,
    margin: 15,
    padding: 10,
    backgroundColor: 'rgb(250, 250, 250)',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ownerComment: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    padding: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  responseButton: {
    backgroundColor: 'rgb(52, 110, 98)',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Review;
