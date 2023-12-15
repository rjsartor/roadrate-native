import { StyleSheet, Button } from 'react-native';
import { theme } from './theme';

export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    padding: 10,
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 18,
    color: theme.colors.primary,
    padding: 6,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    width: 300,
    alignItems: 'center',
    elevation: 1, // for Android shadow
  },
  notificationText: {
    color: 'green',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 5,
  },
  errorText: {
    color: 'red', // Or any other color to indicate errors or warnings
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e4e6e8',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
    color: 'black',
  },
});
