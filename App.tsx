import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Auth0Provider} from 'react-native-auth0';
import LandingPage from './src/components/Landing';
import Home from './src/components/Home';
import ClaimPlate from './src/components/ClaimPlate';
import MyPlatesList from './src/components/MyPlates';
import About from './src/components/About';
import MyReviews from './src/components/MyReviews';
import PlatePage from './src/components/PlatePage';
import { REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_DOMAIN } from '@env';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['app.roadrate.roadrate-mobile.auth0://'],
  config: {
    screens: {
      Home: 'dev-plmqd3rcezf6z2qx.us.auth0.com/ios/app.roadrate.roadrate-mobile/Home',
    },
  },
};

const App = () => {
  return (
    <Auth0Provider domain={REACT_APP_AUTH0_DOMAIN} clientId={REACT_APP_AUTH0_CLIENT_ID}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="LandingPage">
          <Stack.Screen name="LandingPage" component={LandingPage} />
          {/* <Stack.Screen name="LoginForm" component={LoginForm} /> */}
          <Stack.Screen name="ClaimPlate" component={ClaimPlate} />
          <Stack.Screen name="MyPlates" component={MyPlatesList} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="MyReviews" component={MyReviews} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Plate" component={PlatePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Auth0Provider>
  );
};

export default App;
