import React, { useState, FC } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useAuthTasks } from '../hooks/use-auth-tasks';

const About: FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { handleLogin } = useAuthTasks();

  const CloseButton: FC = () => {
    return (
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalOpen(false)}>
        <Text>X</Text>
      </TouchableOpacity>
    );
  };

  const AboutModal: FC<{ title: string }> = ({ title }) => {
    return (
      <Modal
        visible={modalOpen}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalHeader}>{title}</Text>
            <AboutSection />
          </View>
        </View>
      </Modal>
    );
  };

  const AboutSection: FC = () => {
    return (
      <View style={styles.aboutSection}>
        {/* <Image source={icon} style={styles.icon} /> */}
        <Text style={styles.paragraph}>RoadRate was designed for the over 220 million drivers...</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.registerLink}>Start your journey with RoadRate today!</Text>
        </TouchableOpacity>
        <CloseButton />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.aboutButton} onPress={() => setModalOpen(true)}>
        <Text>Learn More</Text>
      </TouchableOpacity>
      {modalOpen && <AboutModal title="About RoadRate" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  aboutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.164)',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: 'whitesmoke',
    borderWidth: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 3,
    width: '80%',
    maxHeight: '75%',
  },
  modalHeader: {
    fontSize: 24,
    color: 'rgb(52, 110, 98)',
    marginBottom: 10,
  },
  aboutSection: {
    alignItems: 'center',
  },
  paragraph: {
    textAlign: 'justify',
    marginBottom: 10,
  },
  registerLink: {
    color: 'rgb(52, 110, 98)',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: 'rgb(52, 110, 98)',
    borderWidth: 1,
  },
});

export default About;
