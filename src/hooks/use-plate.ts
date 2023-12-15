import { useEffect, useState } from 'react';
import { PlateType } from '../types/plates.types';
import { ReviewType } from '../types/reviews.types';
import { REACT_APP_API_BASE_URL } from '@env';

interface UsePlateReturnType {
  plate: PlateType | undefined;
  reviews: ReviewType[];
}

export const usePlate = (id: string): UsePlateReturnType => {
  const [plate, setPlate] = useState<PlateType | undefined>();
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plateResponse = await fetch(`${REACT_APP_API_BASE_URL}/plates/${id}`);
        const plateData: PlateType = await plateResponse.json();
        setPlate(plateData);

        const reviewResponse = await fetch(`${REACT_APP_API_BASE_URL}/reviews/plate/${id}`);
        const reviewData: ReviewType[] = await reviewResponse.json();
        setReviews(reviewData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return { plate, reviews };
};
