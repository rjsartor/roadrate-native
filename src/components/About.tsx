import React, { useState, FC } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useAuthTasks } from '../hooks/use-auth-tasks';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spacer from './Spacer';

const About: FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { handleLogin } = useAuthTasks();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.aboutButton} onPress={() => setModalOpen(true)}>
        <Text>Learn More</Text>
      </TouchableOpacity>
      <Modal
        visible={modalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalOpen(false)}
            >
              <Icon name="times" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalHeader}>About RoadRate</Text>
            <Spacer height={2} />
            <Text style={styles.paragraph}>RoadRate was designed for the over 300 million drivers, passengers, and pedestrians in United States to leave anonymous reviews and messages for the owners of any vehicles. Look up your plate today and see what people are saying about your driving!</Text>
            <View style={styles.aboutSection}>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.registerLink}>Sign up now!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modal: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '80%',
    maxHeight: '75%',
  },
  modalHeader: {
    fontSize: 24,
    color: 'rgb(52, 110, 98)',
    marginBottom: 10,
  },
  container: {
    alignItems: 'center',
  },
  aboutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.164)',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: 'whitesmoke',
    borderWidth: 1,
  },
  aboutSection: {
    alignItems: 'center',
  },
  paragraph: {
    // textAlign: 'justify',
    marginBottom: 10,
  },
  registerLink: {
    color: 'rgb(52, 110, 98)',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default About;
