import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PlateType } from '../types/plates.types';
import Button from './Button'; // Assuming Button is a custom component with proper types defined
import Spacer from './Spacer';
import LicensePlate from './LicensePlate';

interface PlateTableProps {
  plate: PlateType | null | undefined;
  claimPlate: () => void;
  registerPlate: () => void;
  plateNumber: string;
  plateState: string;
  successMessage?: string;
}

const PlateTable: React.FC<PlateTableProps> = ({
  plate,
  claimPlate,
  registerPlate,
  plateNumber,
  plateState,
  successMessage,
}) => {
  const navigation = useNavigation();

  let plateAction;
  if (plate?.isOwned) {
    plateAction = (
      <>
        <Text style={styles.claimedText}>ALREADY CLAIMED</Text>
        {/* @ts-ignore */}
        <TouchableOpacity onPress={() => navigation.navigate('MyPlates')}>
          <Text style={styles.linkText}>My Plates</Text>
        </TouchableOpacity>
      </>
    );
  } else if (plate === undefined) {
    plateAction = (
      <Button
        onPress={registerPlate}
        disabled={!!successMessage}
        title="Register Plate"
      />
    );
  } else {
    plateAction = (
      <Button
        onPress={claimPlate}
        disabled={!!successMessage}
        title="Claim Plate"
      />
    );
  }

  if (plate === null) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Plate Information</Text>
      <Spacer height={2} />
      <LicensePlate plateNumber={plateNumber} plateState={plateState} style={{ height: 120, width: 240, alignSelf: 'center' }}  />
      <Spacer height={2} />
      <View style={styles.cardContent}>
        <Text style={styles.cardLabel}>License Plate:</Text>
        <Text style={styles.cardValue}>{plateNumber}</Text>

        <Text style={styles.cardLabel}>State:</Text>
        <Text style={styles.cardValue}>{plateState}</Text>
      </View>
      <Spacer height={2} />
      {plateAction}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    marginTop: 8,
  },
  cardLabel: {
    fontSize: 16,
    color: '#666',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '500',
  },
  claimedText: {
    textAlign: 'center',
    color: 'red',
  },
  linkText: {
    textAlign: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  successText: {
    textAlign: 'center',
    color: 'green',
  },
});

export default PlateTable;
