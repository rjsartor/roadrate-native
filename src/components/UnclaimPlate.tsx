import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { PlateType } from '../types/plates.types';
import AxiosService from '../services/AxiosService';
import { CommonStyles } from '../CommonStyles';

type UnclaimStatus = 'idle' | 'warning' | 'success' | 'error';

const UnclaimPlate: React.FC<{ plate: PlateType }> = ({ plate }) => {
  const { userId, plateNumber, plateState } = plate;
  const [status, setStatus] = useState<UnclaimStatus>('idle');

  const toggleWarning = () => setStatus(status === 'warning' ? 'idle' : 'warning');

  const unClaimPlateClick = async () => {
    try {
      const response = await AxiosService.put(`plates/unclaim/${userId}`, {
        userId,
        plateNumber,
        plateState,
      });

      if (response.status === 204) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Unclaim this plate" onPress={toggleWarning} />
      {status === 'warning' && (
        <View style={styles.options}>
          <Text  style={CommonStyles.subHeaderText}>Are you sure?</Text>
          <View>
            <Button title="Yes" onPress={unClaimPlateClick} />
            <Button title="No" onPress={toggleWarning} />
          </View>
        </View>
      )}
      {status === 'success' && <Text>You successfully unclaimed this plate.</Text>}
      {status === 'error' && <Text>Failed to unclaim the plate. Please try again.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  options: {
  },
  buttonsDiv: {
  },
});

export default UnclaimPlate;
