import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useReviews from '../hooks/use-reviews';
import ViewsNav from './ViewsNav';
import { SearchByPlate } from './SearchByPlate';
import ReviewList from './ReviewList';
import { theme } from '../theme';
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 2,
  },
  header: {
    fontSize: theme.fonts.headerSize,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
});
export default MyReviews;