import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlateType } from '../types/plates.types';
import AxiosService from '../services/AxiosService';
import ViewsNav from './ViewsNav';
import PlateSearchForm from './forms/PlateSearchForm';
import { StateCode } from './StateSelect';
import PlateTable from './PlateTable';
import { CommonStyles } from '../CommonStyles';

const ClaimPlate: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [plate, setPlate] = useState<PlateType | null | undefined>(null);
  const [error, setError] = useState<string>('');
  const [searchNumber, setSearchNumber] = useState<string>('');
  const [searchState, setSearchState] = useState<string>('');

  const getUserId = async () => {
    return await AsyncStorage.getItem('userId');
  };
 
  const registerPlate = async () => {
    try {
      const userId = await getUserId();
      const payload = { plateNumber: searchNumber, plateState: searchState, userId, isOwned: true };
      const response = await AxiosService.post(`plates`, payload);
      setSuccessMessage(`Congrats! Your plate ${searchNumber} - ${searchState} was registered.`);
      return response.data;
    } catch (err) {
      setError('Failed to register the plate. Please try again.');
    }
  };

  const claimPlate = async () => {
    try {
      const userId = await getUserId();
      const payload = { plateNumber: searchNumber, plateState: searchState, userId, isOwned: true };
      const response = await AxiosService.put(`plates/${userId}`, payload);
      setSuccessMessage(`Congrats! Your plate ${searchNumber} - ${searchState} was registered.`);
      return response.data;
    } catch (err) {
      setError('Failed to claim the plate. Please try again.');
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <ViewsNav />
      <Text style={CommonStyles.headerText}>Claim A Plate</Text>
      <PlateSearchForm
        searchNumber={searchNumber}
        searchState={searchState as StateCode}
        setSearchState={setSearchState}
        setSearchNumber={setSearchNumber}
        setPlate={setPlate}
        setSuccessMessage={setSuccessMessage}
        setError={setError}
      />
      <PlateTable 
        plate={plate}
        claimPlate={claimPlate}
        registerPlate={registerPlate}
        plateNumber={searchNumber}
        plateState={searchState}
        successMessage={successMessage}
      />
      {successMessage && <Text style={CommonStyles.notificationText}>{successMessage}</Text>}
      {error && <Text style={CommonStyles.errorText}>{error}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ClaimPlate;
