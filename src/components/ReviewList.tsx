import React from 'react';
import { Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import Review from './Review';
import { ReviewType } from '../types/reviews.types';


interface ReviewListProps {
  reviews: ReviewType[] | null;
  canClickPlate?: boolean;
  userPlate?: boolean | undefined;
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews, canClickPlate = false, userPlate = false }) => {
  if (!reviews) return <ActivityIndicator size="large" />;
  if (!reviews.length) return <Text style={styles.noReviewsText}> No reviews yet for this plate</Text>;

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <Review
          review={item}
          canClickPlate={canClickPlate}
          userPlate={userPlate}
        />
      )}
      keyExtractor={(item) => item._id}
      style={styles.reviewList}

    />
  );
};


const styles = StyleSheet.create({
  reviewList: {
    padding: 15,
    maxWidth: '100%',
    backgroundColor: 'rgb(250, 250, 250)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  noReviewsText: {
    textAlign: 'center',
    color: 'grey',
    marginTop: 20,
    fontSize: 16,
  },
});


export default ReviewList;
