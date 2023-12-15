import { useEffect, useState } from 'react';
import AxiosService from '../services/AxiosService';
import { ReviewType } from '../types/reviews.types';

const useReviews = (reviewsUrl: string) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [plateFilter, setPlateFilter] = useState<string>('');

  const fetchReviews = async (url: string) => {
    try {
      const { data } = await AxiosService.get(url);
      setReviews(data as ReviewType[]);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };
  useEffect(() => {
    fetchReviews(reviewsUrl);
  }, [reviewsUrl]);

  const filteredReviews = reviews.filter(r => r.plateNumber.includes(plateFilter));

  return { 
    reviews: filteredReviews, 
    setReviews, 
    plateFilter,
    setPlateFilter
  };
};

export default useReviews;
