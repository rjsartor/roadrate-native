import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AxiosService from '../services/AxiosService';
import { PlateType } from '../types/plates.types';

export const usePlates = (userId: string): { plates: PlateType[] } => {
  const [plates, setPlates] = useState<PlateType[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchPlates = async () => {
      try {
        const response = await AxiosService.get<PlateType[]>(`plates/user/${userId}`);

        if (response.data) {
          setPlates(response.data);
          await AsyncStorage.setItem('hasPlates', JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Error fetching plates:", error);
      }
    };

    fetchPlates();
  }, [userId]);

  return { plates };
};
