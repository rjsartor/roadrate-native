import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosService from '../../services/AxiosService';
import { usePlates } from '../../hooks/use-plates';
import StateSelect, { StateCode } from '../StateSelect';
import { Picker } from '@react-native-picker/picker';

interface ReviewFormProps {
  userId: string;
  initialFormData?: {
    plateNumber?: string;
    rating?: string;
    message?: string;
    plateState?: string;
  };
}

const ReviewForm: React.FC<ReviewFormProps> = ({ userId, initialFormData = {} }) => {
  const { plates: userPlates } = usePlates(userId);

  const [formData, setFormData] = useState({
    plateNumber: '',
    rating: '',
    message: '',
    plateState: '',
    ...initialFormData,
  });

  const [submitted, setSubmitted] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState('');

  // @ts-ignore
  const validPlates = userPlates.map(({ plateNumber, plateState }) => ({
    userPlateNumber: plateNumber,
    userPlateState: plateState,
  }));

  useEffect(() => {
    if (formData.plateState && formData.plateNumber) {
      const invalidPlate = validPlates.find((plate: any) => plate.userPlateNumber === formData.plateNumber && plate.userPlateState === formData.plateState);
      if (invalidPlate) {
        setInvalidMessage('You cannot review your own plate');
        setFormData(prevFormData => ({ ...prevFormData, plateState: '' }));
      }
    }
  }, [formData.plateState, formData.plateNumber]);

  const handleSubmit = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
  
      if (user) {
        const res = await AxiosService.post(`reviews`, {
          ...formData,
          plateNumber: formData.plateNumber.toUpperCase(),
          username: user.username,
          reviewerId: user.id,
        });
  
        if (res.status === 201) {
          setSubmitted(true);
          setFormData({
            plateNumber: '',
            rating: '',
            message: '',
            plateState: '',
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Submit A RoadRating:</Text>
      
      <Text>License Plate:</Text>
      <TextInput
        style={styles.input}
        placeholder="X90PL"
        value={formData.plateNumber}
        onChangeText={(text) => setFormData({ ...formData, plateNumber: text.toUpperCase() })}
        autoCapitalize="characters"
        maxLength={8}
      />

      <Text>Rating:</Text>
      <Picker
        selectedValue={formData.rating}
        onValueChange={(itemValue: any) =>
          setFormData({ ...formData, rating: itemValue })
        }>
        <Picker.Item label="Select" value="" />
        <Picker.Item label="Good" value="true" />
        <Picker.Item label="Bad" value="false" />
      </Picker>

      <Text>State:</Text>
      <StateSelect 
        state={formData.plateState as StateCode}
        setState={(state: string) => setFormData({ ...formData, plateState: state })}
      />

      <Text>Message:</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={4}
        placeholder="Be honest and objective!"
        value={formData.message}
        onChangeText={(text) => setFormData({ ...formData, message: text })}
      />

      <Button
        onPress={handleSubmit}
        title="Submit Review"
        disabled={!formData.plateNumber || !formData.plateState || !formData.rating || !formData.message}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default ReviewForm;
