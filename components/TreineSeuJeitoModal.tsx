import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TreineSeuJeitoModal = ({ visible, onClose, onSubmit }) => {
  const [customText, setCustomText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('É necessário conceder permissão à câmera para usar esta funcionalidade.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    onSubmit({ text: customText, image: selectedImage });
    setCustomText('');
    setSelectedImage(null);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Inspire-se e crie seu próprio treino!
          </Text>
          <TextInput
            placeholder="Descreva seu treino..."
            style={styles.input}
            value={customText}
            onChangeText={setCustomText}
          />
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
          )}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={handlePickImage}>
              <Ionicons name="camera-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Capturar Imagem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Ionicons name="save-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close-circle-outline" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  previewImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f1f1f',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
  },
  closeButton: {
    marginTop: 10,
  },
});

export default TreineSeuJeitoModal;
