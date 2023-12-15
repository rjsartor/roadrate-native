import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PlateType } from '../types/plates.types';

interface PlateProps {
  plate: PlateType;
}

const Plate: React.FC<PlateProps> = ({ plate }) => {
  if (!plate) return <Text>Loading plate...</Text>;

  const karmaStyling = plate.karma > 0
    ? styles.plateWrapperPositive
    : plate.karma < 0
      ? styles.plateWrapperNegative
      : styles.plateWrapperNeutral;

  return (
    <View style={karmaStyling}>
      <View style={styles.plateContent}>
        <View style={styles.plateTitle}>
          <Text style={styles.plateId}>{plate.plateNumber}</Text>
        </View>
        <View style={styles.plateInfo}>
          <Text>State: {plate.plateState}</Text>
          <Text>Karma: {plate.karma || 0}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  plateWrapperPositive: {
    
  },
  plateWrapperNegative: {
    
  },
  plateWrapperNeutral: {
    
  },
  plateContent: {
    
  },
  plateTitle: {
    
  },
  plateId: {
    
  },
  plateInfo: {
    
  }
});

export default Plate;
