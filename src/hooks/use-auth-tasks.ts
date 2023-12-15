import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth0, User } from 'react-native-auth0';
import { UserType } from '../types/auth.types';
import { findOrCreateUser } from '../auth/utils'; // Ensure this is compatible with React Native
import { useNavigation } from '@react-navigation/native';
import { AppNavigationPropType } from '../types/navigation.types';

interface AuthTasksReturn {
  isLoading: boolean;
  userInfo: UserType | null;
  user: User | null;
  handleLogin: () => void;
  handleLogout: () => void;
}

export const useAuthTasks = (): AuthTasksReturn => {
  const {
    isLoading,
    user,
    authorize, 
    clearSession,
  } = useAuth0();

  const navigation: AppNavigationPropType = useNavigation();

  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  // const [accessToken, setAccessToken] = useState<string | null>(null); // set in state or AsyncStorage?

  const handleLogin = async (): Promise<void> => {
    await authorize().then(async credentials => {
      if (credentials) {
        await AsyncStorage.setItem('accessToken', credentials?.accessToken);
        navigation.navigate('Home' as any)
      }
    });
  };

  const handleLogout = async () => {
    try {
        await clearSession(); 
    } catch (e) {
        console.error(e);
    }
  };

  const fetchUserInfo = useCallback(async () => {
    try {
      if (user && user.email) {
        const _user: UserType = await findOrCreateUser({
          email: user.email,
          username: user.nickname,
          name: `${user?.given_name} ${user?.family_name}`,
        });

        setUserInfo(_user);
        await AsyncStorage.setItem('user', JSON.stringify(_user));
        await AsyncStorage.setItem('userId', _user.id || "");
      }
    } catch (error) {
      console.error('Failed to fetch user information:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchUserInfo();
  }, [isLoading, user, fetchUserInfo]);

  return {
    handleLogin,
    handleLogout,
    isLoading,
    userInfo,
    user,
  };
};
