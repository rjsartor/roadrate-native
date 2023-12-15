import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuthTasks } from '../hooks/use-auth-tasks';

const Footer = () => {
  const { handleLogout } = useAuthTasks();

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgb(230, 230, 230)',
  },
  logoutButton: {
    backgroundColor: 'rgb(52, 110, 98)',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Footer;
