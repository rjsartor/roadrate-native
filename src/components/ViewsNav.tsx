import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuthTasks } from '../hooks/use-auth-tasks';

const ViewsNav = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigation = useNavigation();
  const { handleLogout } = useAuthTasks();

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
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigateTo('Home')}>
          <Image source={require('../../assets/road-rate.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        {accessToken && (
          <TouchableOpacity onPress={handleLogout} style={styles.logoutIcon}>
            <Icon name='sign-out' size={20} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.linkContainer}>
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
      <View style={styles.borderBottom} />
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    padding: 10,
    marginTop: 8,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  flexGrow: {
    flex: 1,
  },
  buttonImage: {
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  logoutIcon: {
    position: 'absolute',
    right: 10, // Adjust as needed
    top: 10, // Adjust as needed
  },
  navLink: {
    padding: 8,
    // marginHorizontal: 5,
  },
  navText: {
    color: 'rgb(52, 110, 98)',
    fontSize: 16,
  },
  borderBottom: {
    height: 1, // Height of the border
    backgroundColor: 'black', // Color of the border
    width: '75%', // Border length at 3/4 of its parent
    marginTop: 10,
    alignSelf: 'center', // Center the border within the navContainer
  },
});

export default ViewsNav;
