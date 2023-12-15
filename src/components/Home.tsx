import React, { FC, useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthTasks } from '../hooks/use-auth-tasks';
import ViewsNav from './ViewsNav';
import useReviews from '../hooks/use-reviews';
import ReviewForm from './forms/ReviewForm';
import { SearchByPlate } from './SearchByPlate';
import ReviewList from './ReviewList';

const Home: FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [submitReview, setSubmitReview] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const userJSON = await AsyncStorage.getItem('user');
      setUser(userJSON ? JSON.parse(userJSON) : null);
    };

    loadUser();
  }, []);

  const { reviews, plateFilter, setPlateFilter } = useReviews('reviews');
  
  const { isLoading } = useAuthTasks();

  if (isLoading) {
    return <Text>Authenticating...</Text>;
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <ViewsNav />
      <View>
        <Text>Hey there, {user?.username}</Text>
      </View>
      <Button
        title="New Review"
        onPress={() => setSubmitReview(prev => !prev)}
      />
      {submitReview && <ReviewForm userId={user?.id || ''} />}
      <SearchByPlate search={plateFilter} setSearch={setPlateFilter} />
      <ReviewList reviews={reviews} canClickPlate={true} />
    </ScrollView>
  );
};

export default Home;
