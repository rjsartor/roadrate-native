import React, { FC } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import About from './About';
import { useAuthTasks } from '../hooks/use-auth-tasks';
import { SearchByPlate } from './SearchByPlate';
import ReviewList from './ReviewList';
import useReviews from '../hooks/use-reviews';

const LandingPage: FC = () => {
  const { reviews, plateFilter, setPlateFilter } = useReviews('reviews');

  const { handleLogin, handleLogout } = useAuthTasks();

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.navbar}>
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.navbar}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <View style={styles.landingContent}>
        <Text style={styles.mainHeader}>RoadRate</Text>
        <Text style={styles.catchPhrase}>choose rate, not rage</Text>
        <Text style={styles.responsibly}>Responsibly rate drivers.</Text>
        <Text style={styles.anonymous}>100% anonymous.</Text>
        <View style={styles.aboutSection}>
          <About />
        </View>
      </View>
      <SearchByPlate search={plateFilter} setSearch={setPlateFilter} />
      <ReviewList reviews={reviews} canClickPlate={true} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'transparent',
  },
  landingContent: {
    padding: 20,
    alignItems: 'center',
  },
  mainHeader: {
    fontSize: 52,
    fontWeight: 'bold',
    color: 'rgb(52, 110, 98)',
  },
  catchPhrase: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#f4f4f4d7',
  },
  responsibly: {
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.897)',
  },
  anonymous: {
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.897)',
  },
  aboutSection: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.164)',
  },
});


export default LandingPage;
