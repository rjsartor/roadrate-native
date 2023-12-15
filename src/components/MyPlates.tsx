import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { usePlates } from '../hooks/use-plates';
import { PlateType } from '../types/plates.types';
import ViewsNav from './ViewsNav';
import { CommonStyles } from '../CommonStyles';

const MyPlatesList: React.FC = () => {
  const navigation = useNavigation();

  const getUserId = async () => {
    return await AsyncStorage.getItem('userId');
  };

  const [userId, setUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchUserId = async () => {
      const retrievedUserId = await getUserId();
      setUserId(retrievedUserId);
    };

    fetchUserId();
  }, []);

  const { plates } = usePlates(userId || '');

  const myPlateClick = (plate: PlateType) => {
    // @ts-ignore
    navigation.navigate('Plate', { id: plate.id });
  };

  const totalPlates = plates.length === 0
    ? 'No plates associated'
    : `Total Plates Owned: ${plates.length}`;

    const renderItem = ({ item }: { item: PlateType }) => (
      <TouchableOpacity style={CommonStyles.button} onPress={() => myPlateClick(item)}>
        <Text>{item.plateNumber} - {item.plateState}</Text>
      </TouchableOpacity>
    );
  
    return (
      <View style={CommonStyles.container}>
        <ViewsNav />
        <Text style={CommonStyles.headerText}>My Plates</Text>
        <Text style={CommonStyles.subHeaderText}>{totalPlates}</Text>

        <FlatList
          data={plates}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
};


export default MyPlatesList;
