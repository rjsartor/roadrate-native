import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosService from '../../services/AxiosService';

interface OwnerResponseFormProps {
  reviewId: string;
  fetchReviews?: () => void;
}

export const OwnerResponseForm: React.FC<OwnerResponseFormProps> = ({ reviewId, fetchReviews }) => {
  const [ownerResponse, setOwnerResponse] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    try {
      const response = await AxiosService.put(`reviews/${reviewId}`, {
        ownerResponse,
      });

      if (response.status === 200) {
        setIsSubmitted(true);
        AsyncStorage.removeItem('submitResponse');
        if (fetchReviews) fetchReviews();
      } else {
        setError('Unable to save your response. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.submitResponse}>
      {isSubmitted ? (
        <Text>Thanks. Your response was saved.</Text>
      ) : (
        <>
          <View style={styles.form}>
            <Text>Leave a Response</Text>
            <TextInput
              value={ownerResponse}
              onChangeText={setOwnerResponse}
              style={styles.textArea}
              placeholder="Your response"
              multiline
            />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
          {error && <Text style={styles.error}>{error}</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  submitResponse: {
  },
  form: {
  },
  textArea: {
  },
  error: {
  },
});

export default OwnerResponseForm;
