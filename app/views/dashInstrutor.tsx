import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import workouts from '@/datas/workouts.json';

// Simulação de dados de alunos e notificações
const mockStudents = [
  { id: '1', name: 'João Silva', lastWorkout: '2025-02-10' },
  { id: '2', name: 'Maria Oliveira', lastWorkout: '2025-02-11' },
];

const mockNotifications = [
  { id: '1', message: 'João Silva solicitou modificação no treino', date: '2025-02-11' },
  { id: '2', message: 'Maria Oliveira completou o treino de hoje', date: '2025-02-11' },
];

const DashboardInstrutor = () => {
  const [dayName, setDayName] = useState('');
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [isGymModalVisible, setGymModalVisible] = useState(false);
  const [isStudentsModalVisible, setStudentsModalVisible] = useState(false);
  const [isNotificationsModalVisible, setNotificationsModalVisible] = useState(false);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [selectedGym, setSelectedGym] = useState('Fit Center');
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const today = new Date();
    const currentDayName = today.toLocaleDateString('pt-BR', { weekday: 'long' }).toLowerCase();
    setDayName(currentDayName);
    const workoutPlan = workouts[currentDayName];
    setTodayWorkout(workoutPlan || null);

    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Permissão de localização é necessária para exibir a localização.');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    }
  };

  const renderStudentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => Alert.alert('Modificar Treino', `Modificar treino de ${item.name}`)}
    >
      <Text style={styles.listItemText}>{item.name}</Text>
      <Text style={styles.listItemSubtext}>Último treino: {item.lastWorkout}</Text>
    </TouchableOpacity>
  );

  const renderNotificationItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.message}</Text>
      <Text style={styles.listItemSubtext}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.date}>Hoje: {dayName.charAt(0).toUpperCase() + dayName.slice(1)}</Text>
      <Text style={styles.academia}>Academia Selecionada: {selectedGym}</Text>

      <View style={styles.workout}>
        <Text style={styles.treino}>Treino de Hoje: {todayWorkout?.treino || 'Descanso'}</Text>
        {todayWorkout?.exercicios?.map((exercicio, index) => (
          <Text key={index} style={styles.exercicio}>
            - {exercicio.maquina}: {exercicio.series}
          </Text>
        ))}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => setGymModalVisible(true)}>
          <Ionicons name="swap-horizontal-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Mudar Academia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setStudentsModalVisible(true)}>
          <Ionicons name="people-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Gerenciar Alunos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setNotificationsModalVisible(true)}>
          <Ionicons name="notifications-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Notificações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setProfileModalVisible(true)}>
          <Ionicons name="person-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Meu Perfil</Text>
        </TouchableOpacity>
      </View>

      {/* Exibir localização em tempo real */}
      <View style={styles.locationContainer}>
      <Text style={styles.locationText}>
                Sua localização atual é:
              </Text>
        <Text style={styles.locationText}>
          Latitude: {location?.latitude.toFixed(6) || "Obtendo..."}
        </Text>
        <Text style={styles.locationText}>
          Longitude: {location?.longitude.toFixed(6) || "Obtendo..."}
        </Text>
      </View>

      {/* Modal para Mudar Academia */}
      <Modal
        visible={isGymModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setGymModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha a Academia</Text>
            {['Fit Center', 'Power Gym', 'Elite Fitness'].map((gym) => (
              <TouchableOpacity
                key={gym}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedGym(gym);
                  setGymModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{gym}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.closeButton} onPress={() => setGymModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para Gerenciar Alunos */}
      <Modal
        visible={isStudentsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setStudentsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Gerenciar Alunos</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar aluno..."
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <FlatList
              data={mockStudents.filter(student =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              renderItem={renderStudentItem}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setStudentsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para Notificações */}
      <Modal
        visible={isNotificationsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setNotificationsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notificações</Text>
            <FlatList
              data={mockNotifications}
              renderItem={renderNotificationItem}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setNotificationsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para Perfil do Instrutor */}
      <Modal
        visible={isProfileModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Meu Perfil</Text>
            <Text style={styles.profileInfo}>Nome: João Instrutor</Text>
            <Text style={styles.profileInfo}>Email: joao@exemplo.com</Text>
            <Text style={styles.profileInfo}>Especialidade: Musculação</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setProfileModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000011',
    padding: 20,
    paddingTop: 100,
  },
  date: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  academia: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  workout: {
    marginBottom: 30,
  },
  treino: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  exercicio: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
    backgroundColor: '#1f1f1f',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalOptionText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  listItemText: {
    color: 'white',
    fontSize: 16,
  },
  listItemSubtext: {
    color: '#aaa',
    fontSize: 14,
  },
  profileInfo: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
  },
  locationContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
  },
  locationText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DashboardInstrutor;