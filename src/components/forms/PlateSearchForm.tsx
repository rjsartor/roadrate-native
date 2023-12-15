import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AxiosService from '../../services/AxiosService';
import { PlateType } from '../../types/plates.types';
import StateSelect, { StateCode } from '../StateSelect';
import { CommonStyles } from '../../CommonStyles';
import Button from '../Button';

interface PlateSearchFormProps {
  searchState: StateCode;
  setSearchState: (value: StateCode) => void;
  searchNumber: string;
  setSearchNumber: (state: string) => void;
  setSuccessMessage: (message: string) => void;
  setError: (message: string) => void;
  setPlate: (p: PlateType) => void;
}

const PlateSearchForm: React.FC<PlateSearchFormProps> = ({ 
  setSuccessMessage,
  setPlate,
  setError,
  searchState,
  setSearchState,
  searchNumber,
  setSearchNumber,
}) => {
  const fetchPlate = async () => {
    try {
      const response = await AxiosService.get(`plates/`, {
        params: { state: searchState, number: searchNumber },
      });
      const [plate] = response.data as PlateType[];
      setPlate(plate);
    } catch (err) {
      setError('Failed to search for the plate. Please try again.');
    }
  };

  return (
    <View>
      <Text style={CommonStyles.subHeaderText}>Search a Valid Plate by State</Text>
      <TextInput
        value={searchNumber}
        onChangeText={(text) => setSearchNumber(text.toUpperCase())}
        style={CommonStyles.textInput}
        placeholder="Search Plate Numbers"
      />
      <StateSelect state={searchState} setState={setSearchState} />
      <Button
        title="Search"
        onPress={() => {
          setSuccessMessage('');
          fetchPlate();
        }}
        disabled={!searchNumber || !searchState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Styles for your container
  },
  input: {
    // Styles for your input field
  },
});

export default PlateSearchForm;
