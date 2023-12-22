import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { CommonStyles } from '../CommonStyles';

interface SearchByPlateProps {
  search: string;
  setSearch: (value: string) => void;
}

export const SearchByPlate: React.FC<SearchByPlateProps> = ({ search, setSearch }) => {
  return (
    <View style={styles.searchSection}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        style={CommonStyles.textInput}
        placeholder="Search by plate..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    padding: 10,
    width: '90%',
    alignSelf: 'center',
  },
});
