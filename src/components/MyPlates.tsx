import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { usePlates } from '../hooks/use-plates';
import { PlateType } from '../types/plates.types';
import ViewsNav from './ViewsNav';
import { CommonStyles } from '../CommonStyles';
import LicensePlate from './LicensePlate';

const MyPlates: React.FC = () => {
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
      <View style={{ marginBottom: 20, justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => myPlateClick(item)}>
          <LicensePlate plateNumber={item.plateNumber} plateState={item.plateState} style={{ height: 100, width: 200 }} />
        </TouchableOpacity>
      </View>
    );
  
    return (
      <View style={{ 
        flex: 1,
      }}>
        <ViewsNav />
        <Text style={CommonStyles.headerText}>My Plates</Text>
        <Text style={CommonStyles.subHeaderText}>{totalPlates}</Text>
        <FlatList
          data={plates}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          style={{ marginTop: 8, width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
        />
      </View>
    );
};


export default MyPlates;
