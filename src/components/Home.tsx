import React, { FC, useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthTasks } from '../hooks/use-auth-tasks';
import ViewsNav from './ViewsNav';
import useReviews from '../hooks/use-reviews';
import ReviewForm from './forms/ReviewForm';
import { SearchByPlate } from './SearchByPlate';
import ReviewList from './ReviewList';
import { CommonStyles } from '../CommonStyles';
import Spacer from './Spacer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../theme';

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

  const renderSubmitReviewButton = () => {
    const iconName = submitReview ? 'minus' : 'plus';
    return (
      <View style={Styles.buttonContainer}>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => setSubmitReview(prev => !prev)}
        >
          <Text style={{ color: '#fff' }}>
            {submitReview ? 'Close Review' : 'New Review'}
          </Text>
          <Icon name={iconName} size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <ViewsNav />
      <View>
        <Text style={CommonStyles.subHeaderText}>Hey there, {user?.username}!</Text>
      </View>
      <Spacer height={2} />
      {renderSubmitReviewButton()}
      {
        submitReview ? (
          <ReviewForm userId={user?.id || ''} />
        ) : (
          <View style={CommonStyles.container}>
            <SearchByPlate search={plateFilter} setSearch={setPlateFilter} />
            <ReviewList reviews={reviews} canClickPlate={true} />
          </View>
        )
      }
    </ScrollView>
  );
};

export default Home;

const Styles = StyleSheet.create({
  // ... other styles
  buttonContainer: {
    alignItems: 'center', // Center the button horizontally
    marginTop: 10, // Add some space above the button
  },
  button: {
    flexDirection: 'row', // Arrange icon and text in a row
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 25, // Circular edges
    gap: 10,
        // Include other styling as needed...
  },
  // ... other styles
});
