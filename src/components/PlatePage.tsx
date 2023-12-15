import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { PlateType } from '../types/plates.types';
import { ReviewType } from '../types/reviews.types';
import { UserType } from '../types/auth.types';
import ViewsNav from './ViewsNav';
import Plate from './Plate';
import ReviewList from './ReviewList';
import ReviewForm from './forms/ReviewForm';
import UnclaimPlate from './UnclaimPlate';
import { usePlate } from '../hooks/use-plate';
import { useRoute, RouteProp } from '@react-navigation/native';

interface PlatePageRouteParams {
  id: string;
}

export const PlatePage: React.FC = () => {
  const route = useRoute<RouteProp<{ params: PlatePageRouteParams }, 'params'>>();
  const { id } = route.params;
  const { plate, reviews }: { plate?: PlateType, reviews: ReviewType[] } = usePlate(id);
  const [userPlate, setIsUserPlate] = useState<boolean | null>(null);
  const [submitReview, setSubmitReview] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userJSON = await AsyncStorage.getItem('user');
      const user: UserType | null = userJSON ? JSON.parse(userJSON) : null;
      if (plate && user) {
        setIsUserPlate(plate.userId === user.id);
      }
    };

    fetchUser();
  }, [plate]);

  if (!plate) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={styles.container}>
      <ViewsNav />
      <Plate plate={plate} />
      <ReviewList reviews={reviews} userPlate={userPlate} />
      <UnclaimPlate plate={plate} />
      {!userPlate && (
        <>
          <Button
            title="New Review"
            onPress={() => setSubmitReview(prev => !prev)}
          />
          {submitReview && (
            <ReviewForm 
              userId={plate.userId as string} 
              initialFormData={{ 
                plateNumber: plate.plateNumber,
                plateState: plate.plateState, 
              }}
            />
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
  }
});

export default PlatePage;
