import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

import { DAY_LABELS, getTodayKey } from '@/constants/days';
import { getErrorMessage } from '@/services/api';
import { logout } from '@/services/authService';
import { getMyStudents, getNotifications } from '@/services/instructorService';
import { getGyms, getMe, updateMe } from '@/services/userService';
import { Gym, Notification, Student, User } from '@/services/types';

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('pt-BR') : '—';

const DashboardInstrutor = () => {
  const router = useRouter();
  const todayLabel = DAY_LABELS[getTodayKey()];

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isGymModalVisible, setGymModalVisible] = useState(false);
  const [isStudentsModalVisible, setStudentsModalVisible] = useState(false);
  const [isNotificationsModalVisible, setNotificationsModalVisible] = useState(false);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [isEditingProfile, setEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileSpecialty, setProfileSpecialty] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);

  const loadUser = useCallback(async () => {
    setLoading(true);
    try {
      setUser(await getMe());
    } catch (error) {
      Alert.alert('Erro', getErrorMessage(error, 'Não foi possível carregar seus dados.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
    getCurrentLocation();
  }, [loadUser]);

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

  const openGymModal = async () => {
    setGymModalVisible(true);
    try {
      setGyms(await getGyms());
    } catch (error) {
      Alert.alert('Erro', getErrorMessage(error, 'Não foi possível carregar as academias.'));
    }
  };

  const handleSelectGym = async (gym: Gym) => {
    try {
      setUser(await updateMe({ gym_id: gym.id }));
      setGymModalVisible(false);
    } catch (error) {
      Alert.alert('Erro', getErrorMessage(error, 'Não foi possível trocar de academia.'));
    }
  };

  const loadStudents = async (search?: string) => {
    try {
      setStudents(await getMyStudents(search));
    } catch (error) {
      Alert.alert('Erro', getErrorMessage(error, 'Não foi possível carregar os alunos.'));
    }
  };

  const openStudentsModal = () => {
    setStudentsModalVisible(true);
    loadStudents(searchTerm.trim() || undefined);
  };

  const openNotificationsModal = async () => {
    setNotificationsModalVisible(true);
    try {
      setNotifications(await getNotifications());
    } catch (error) {
      Alert.alert('Erro', getErrorMessage(error, 'Não foi possível carregar as notificações.'));
    }
  };

  const openProfileModal = () => {
    setProfileName(user?.name ?? '');
    setProfileSpecialty(user?.specialty ?? '');
    setEditingProfile(false);
    setProfileModalVisible(true);
  };

  const handleSaveProfile = async () => {
    if (!profileName.trim()) {
      Alert.alert('Erro', 'O nome não pode ficar vazio.');
      return;
    }
    try {
      setUser(
        await updateMe({ name: profileName.trim(), specialty: profileSpecialty.trim() || null })
      );
      setEditingProfile(false);
    } catch (error) {
      Alert.alert('Erro', getErrorMessage(error, 'Não foi possível atualizar o perfil.'));
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  const renderStudentItem = ({ item }: { item: Student }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.name}</Text>
      <Text style={styles.listItemSubtext}>Último treino: {formatDate(item.last_workout_at)}</Text>
    </View>
  );

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <View style={styles.listItem}>
      <Text style={[styles.listItemText, !item.read && styles.unread]}>{item.message}</Text>
      <Text style={styles.listItemSubtext}>{formatDate(item.created_at)}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá, {user?.name ?? 'instrutor'}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.date}>Hoje: {todayLabel}</Text>
      <Text style={styles.academia}>Academia Selecionada: {user?.gym?.name ?? 'Nenhuma'}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={openGymModal}>
          <Ionicons name="swap-horizontal-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Mudar Academia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openStudentsModal}>
          <Ionicons name="people-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Gerenciar Alunos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openNotificationsModal}>
          <Ionicons name="notifications-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Notificações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openProfileModal}>
          <Ionicons name="person-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Meu Perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Sua localização atual é:</Text>
        <Text style={styles.locationText}>
          Latitude: {location?.latitude.toFixed(6) ?? 'Obtendo...'}
        </Text>
        <Text style={styles.locationText}>
          Longitude: {location?.longitude.toFixed(6) ?? 'Obtendo...'}
        </Text>
      </View>

      <Modal
        visible={isGymModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setGymModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha a Academia</Text>
            <FlatList
              data={gyms}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={<Text>Nenhuma academia disponível.</Text>}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalOption} onPress={() => handleSelectGym(item)}>
                  <Text style={styles.modalOptionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setGymModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
              onSubmitEditing={() => loadStudents(searchTerm.trim() || undefined)}
              returnKeyType="search"
            />
            <FlatList
              data={students}
              renderItem={renderStudentItem}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={<Text>Nenhum aluno encontrado.</Text>}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setStudentsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
              data={notifications}
              renderItem={renderNotificationItem}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={<Text>Nenhuma notificação.</Text>}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setNotificationsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isProfileModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Meu Perfil</Text>
            {isEditingProfile ? (
              <>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Nome"
                  value={profileName}
                  onChangeText={setProfileName}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Especialidade"
                  value={profileSpecialty}
                  onChangeText={setProfileSpecialty}
                />
                <TouchableOpacity style={styles.editButton} onPress={handleSaveProfile}>
                  <Text style={styles.editButtonText}>Salvar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.profileInfo}>Nome: {user?.name}</Text>
                <Text style={styles.profileInfo}>Email: {user?.email}</Text>
                <Text style={styles.profileInfo}>Especialidade: {user?.specialty ?? '—'}</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => setEditingProfile(true)}>
                  <Text style={styles.editButtonText}>Editar Perfil</Text>
                </TouchableOpacity>
              </>
            )}
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  unread: {
    fontWeight: 'bold',
  },
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