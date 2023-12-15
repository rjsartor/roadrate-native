import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

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
        style={styles.searchInput}
        placeholder="2073WE..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
