import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import OwnerResponseForm from './forms/OwnerResponseForm';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import getTimestampDisplay from '../utils/time.util';
import LicensePlate from './LicensePlate';
import Spacer from './Spacer';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const timestampDisplay = getTimestampDisplay(createdAt);

  const ratingIcon = isPositive === 'true' ? <Icon name='thumbs-up' size={30} /> : <Icon name='thumbs-down' size={30} />;

  const handlePlateClick = () => {
    // @ts-ignore
    if (canClickPlate) navigation.navigate('Plate', { id: plateId });
  };

  return (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewTitle}>
          {/* <Image
            style={styles.icon}
            source={{ uri: 'https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-green-512.png' }}
          /> */}
          {canClickPlate && <TouchableOpacity
            onPress={handlePlateClick}
            disabled={!canClickPlate}
            style={styles.plateTouchable}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <LicensePlate plateNumber={plateNumber} plateState={plateState} style={{ width: 200, height: 100 }} />
            </View>
          </TouchableOpacity>}
        </View>
        <Text>{ratingIcon}</Text>
      </View>
      <Spacer height={2} />
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.timePassed}>{timestampDisplay}</Text>
      {ownerResponse && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseLabel}>{userPlate ? 'Your' : 'Driver'} Response: </Text>
          <Text style={styles.responseText}>{ownerResponse}</Text>
        </View>
      )}
      
      {!ownerResponse && userPlate && (
        <TouchableOpacity style={styles.responseButton} onPress={() => setShowResponseForm(prev => !prev)}>
          <Text style={styles.buttonText}>Leave a response</Text>
        </TouchableOpacity>
      )}
      {showResponseForm && <OwnerResponseForm reviewId={_id} />}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  plateTouchable: {
    width: 200,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timePassed: {
    fontSize: 14,
    color: '#6C757D',
    fontStyle: 'italic',
  },
  message: {
    fontSize: 20,
    color: theme.colors.primary,
    marginTop: 4,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 12,
    color: '#ADB5BD',
    alignSelf: 'flex-end',
  },
  responseButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  ownerComment: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    padding: 5,
  },
  reviewItem: {
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: { height: 1, width: 0 },
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  thumbsUp: {
    fontSize: 24,
    color: 'red',
  },
  responseContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  responseLabel: {
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 4,
  },
  responseText: {
    color: theme.colors.primary,
    fontStyle: 'italic',
  },
});

export default Review;
