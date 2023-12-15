import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ViewsNav = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadAccessToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setAccessToken(token);
    };

    loadAccessToken();
  }, []);

  const navigateTo = (screen: string) => {
    // @ts-ignore
    navigation.navigate(screen);
  };

  return (
    <View style={styles.navContainer}>
      <View style={styles.linkContainer}>
        {/* <TouchableOpacity onPress={() => navigateTo('Home')} style={styles.navLink}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity> */}
        {accessToken && (
          <>
            <TouchableOpacity onPress={() => navigateTo('ClaimPlate')} style={styles.navLink}>
              <Text style={styles.navText}>Claim Plate</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('MyPlates')} style={styles.navLink}>
              <Text style={styles.navText}>My Plates</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo('MyReviews')} style={styles.navLink}>
              <Text style={styles.navText}>My Reviews</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  navLink: {
    padding: 8,
    marginHorizontal: 5,
  },
  navText: {
    color: 'rgb(52, 110, 98)',
    fontSize: 16,
  },
});

export default ViewsNav;
