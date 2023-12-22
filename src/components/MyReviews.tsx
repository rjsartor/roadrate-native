import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useReviews from '../hooks/use-reviews';
import ViewsNav from './ViewsNav';
import { SearchByPlate } from './SearchByPlate';
import ReviewList from './ReviewList';
import { CommonStyles } from '../CommonStyles';

const MyReviews: React.FC = () => {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const fetchUserId = async () => {
      const retrievedUserId = await AsyncStorage.getItem('userId');
      setUserId(retrievedUserId || '');
    };

    fetchUserId();
  }, []);

  const { reviews, plateFilter, setPlateFilter } = useReviews(`reviews/${userId}`);

  return (
    <View style={CommonStyles.container}>
      <ViewsNav />
      <View style={CommonStyles.container}>
        <Text style={CommonStyles.headerText}>My Reviews</Text>
        <SearchByPlate search={plateFilter} setSearch={setPlateFilter} />
        <ReviewList reviews={reviews} canClickPlate={true} />
      </View>
    </View>
  );
};

export default MyReviews;