import React, { FC } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import About from './About';
import { useAuthTasks } from '../hooks/use-auth-tasks';
import { SearchByPlate } from './SearchByPlate';
import ReviewList from './ReviewList';
import useReviews from '../hooks/use-reviews';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spacer from './Spacer';
import { theme } from '../theme';

const LandingPage: FC = () => {
  const { reviews, plateFilter, setPlateFilter } = useReviews('reviews');

  const { handleLogin } = useAuthTasks();

  return (
    <ScrollView style={styles.scrollView}>
     
      <ImageBackground 
        source={require('../../assets/fog.jpg')} 
        style={styles.landingContent}
        resizeMode="cover" // or "contain" if you want to see the whole image without cropping
      >
         <View style={styles.navbar}>
          <Icon name="sign-in" onPress={handleLogin}  size={30}/>
        </View>
        <Spacer height={2} />
        <Text style={styles.mainHeader}>RoadRate</Text>
        <Spacer height={2} />
        <Text style={styles.catchPhrase}>choose rate, not rage</Text>
        <Text style={styles.responsibly}>Responsibly rate drivers.</Text>
        <Text style={styles.anonymous}>100% anonymous.</Text>
        <View style={styles.aboutSection}>
          <About />
        </View>
      </ImageBackground>
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
    display: 'flex',
    alignItems: 'flex-end',
    paddingRight: 20,
    alignSelf: 'flex-end'
  },
  landingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 350,
    width: '100%',
  },
  mainHeader: {
    fontSize: 52,
    fontWeight: 'bold',
    color: 'rgb(52, 110, 98)',
  },
  catchPhrase: {
    fontSize: 18,
    fontStyle: 'italic',
    color:  theme.colors.primary,
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
