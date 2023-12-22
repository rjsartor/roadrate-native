import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    width: '100%',
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
  labelText: {
    fontSize: 16,
    color: theme.colors.primary,
    padding: 6,
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
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#7a7c7e',
    borderRadius: 8,
    padding: 10,
    marginVertical: 14,
    fontSize: 16,
    color: 'black',
    width: '100%',
  },
});
