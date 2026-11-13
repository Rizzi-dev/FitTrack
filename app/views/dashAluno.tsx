import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import PersonalizarTreinoModal from "@/components/PersonalizarTreinoModal";
import TreineSeuJeitoModal from "@/components/TreineSeuJeitoModal";
import { DAY_LABELS, WEEK_ORDER, getTodayKey } from "@/constants/days";
import { getErrorMessage } from "@/services/api";
import { logout } from "@/services/authService";
import { callInstructor } from "@/services/instructorService";
import { getGyms, getMe, updateMe } from "@/services/userService";
import { createCustomWorkout, getMyWorkouts, saveMyWorkout } from "@/services/workoutService";
import { Gym, User, Workout, WorkoutPayload } from "@/services/types";

const DashboardAluno = () => {
  const router = useRouter();
  const todayKey = getTodayKey();
  const todayLabel = DAY_LABELS[todayKey];

  const [user, setUser] = useState<User | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWorkoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [isGymModalVisible, setGymModalVisible] = useState(false);
  const [isOtherWorkoutsModalVisible, setOtherWorkoutsModalVisible] = useState(false);
  const [isTreineSeuJeitoModalVisible, setTreineSeuJeitoModalVisible] = useState(false);

  const todayWorkout = useMemo(
    () => workouts.find((w) => w.day_of_week === todayKey) ?? null,
    [workouts, todayKey]
  );

  const sortedWorkouts = useMemo(
    () =>
      [...workouts].sort(
        (a, b) => WEEK_ORDER.indexOf(a.day_of_week) - WEEK_ORDER.indexOf(b.day_of_week)
      ),
    [workouts]
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [me, myWorkouts] = await Promise.all([getMe(), getMyWorkouts()]);
      setUser(me);
      setWorkouts(myWorkouts);
    } catch (error) {
      Alert.alert("Erro", getErrorMessage(error, "Não foi possível carregar seus dados."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const openGymModal = async () => {
    setGymModalVisible(true);
    try {
      setGyms(await getGyms());
    } catch (error) {
      Alert.alert("Erro", getErrorMessage(error, "Não foi possível carregar as academias."));
    }
  };

  const handleSelectGym = async (gym: Gym) => {
    try {
      setUser(await updateMe({ gym_id: gym.id }));
      setGymModalVisible(false);
    } catch (error) {
      Alert.alert("Erro", getErrorMessage(error, "Não foi possível trocar de academia."));
    }
  };

  const handleSaveWorkout = async (payload: WorkoutPayload) => {
    try {
      const saved = await saveMyWorkout(todayKey, payload);
      setWorkouts((list) => [...list.filter((w) => w.day_of_week !== todayKey), saved]);
      setWorkoutModalVisible(false);
      Alert.alert("Sucesso", "Treino atualizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", getErrorMessage(error, "Não foi possível salvar o treino."));
    }
  };

  const handleCallInstructor = async () => {
    try {
      await callInstructor();
      Toast.show({ type: "success", text1: "Notificação enviada ao instrutor" });
    } catch (error) {
      Toast.show({ type: "error", text1: getErrorMessage(error, "Não foi possível chamar o instrutor.") });
    }
  };

  const handleCustomWorkout = async ({ text, image }: { text: string; image: string | null }) => {
    try {
      await createCustomWorkout(text, image);
      setTreineSeuJeitoModalVisible(false);
      Alert.alert("Sucesso", "Seu treino foi enviado!");
    } catch (error) {
      Alert.alert("Erro", getErrorMessage(error, "Não foi possível enviar seu treino."));
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const shareWorkout = async () => {
    if (!todayWorkout) {
      Alert.alert("Erro", "Não há treino disponível para compartilhar.");
      return;
    }

    const filePath = `${FileSystem.cacheDirectory}treino_${todayKey}.json`;

    try {
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(todayWorkout, null, 2));

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filePath, {
          mimeType: "application/json",
          dialogTitle: "Salvar treino",
          UTI: "public.json", // Necessário para iOS
        });
      } else {
        Alert.alert("Erro", "Compartilhamento não está disponível neste dispositivo.");
      }
    } catch (error) {
      console.error("Erro ao compartilhar o treino:", error);
      Alert.alert("Erro", "Não foi possível compartilhar o arquivo de treino.");
    } finally {
      await FileSystem.deleteAsync(filePath, { idempotent: true });
    }
  };

  const renderWorkoutItem = ({ item }: { item: Workout }) => (
    <View style={styles.workoutItem}>
      <Text style={styles.workoutDay}>{DAY_LABELS[item.day_of_week]}</Text>
      <Text style={styles.workoutName}>{item.name}</Text>
      {item.exercises.map((exercise, index) => (
        <Text key={index} style={styles.workoutExercise}>
          - {exercise.machine}: {exercise.sets}
        </Text>
      ))}
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
        <Text style={styles.greeting}>Olá, {user?.name ?? "aluno"}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.date}>Hoje: {todayLabel}</Text>
      <Text style={styles.academia}>
        Academia Selecionada: {user?.gym?.name ?? "Nenhuma"}
      </Text>

      <View style={styles.workout}>
        <Text style={styles.treino}>Treino de Hoje: {todayWorkout?.name ?? "Descanso"}</Text>
        {todayWorkout?.exercises.map((exercise, index) => (
          <Text key={index} style={styles.exercicio}>
            - {exercise.machine}: {exercise.sets}
          </Text>
        ))}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={openGymModal}>
          <Ionicons name="swap-horizontal-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Mudar Academia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setWorkoutModalVisible(true)}>
          <Ionicons name="pencil-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Personalizar Treino</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCallInstructor}>
          <Ionicons name="person-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Chamar Instrutor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setOtherWorkoutsModalVisible(true)}>
          <Ionicons name="list-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Ver Outros Treinos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={shareWorkout}>
          <Ionicons name="download-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Fazer download deste treino</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setTreineSeuJeitoModalVisible(true)}>
          <Ionicons name="create-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Gostaria de treinar do seu jeito?</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isGymModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setGymModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Escolha sua Academia</Text>
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
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <PersonalizarTreinoModal
        isVisible={isWorkoutModalVisible}
        onClose={() => setWorkoutModalVisible(false)}
        dayLabel={todayLabel}
        initialWorkout={todayWorkout}
        onSave={handleSaveWorkout}
      />

      <Modal
        visible={isOtherWorkoutsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setOtherWorkoutsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Outros Treinos</Text>
            <FlatList
              data={sortedWorkouts}
              renderItem={renderWorkoutItem}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={<Text>Nenhum treino cadastrado.</Text>}
              style={styles.workoutList}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOtherWorkoutsModalVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TreineSeuJeitoModal
        visible={isTreineSeuJeitoModalVisible}
        onClose={() => setTreineSeuJeitoModalVisible(false)}
        onSubmit={handleCustomWorkout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000011",
    padding: 20,
    paddingTop: 100,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  date: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  academia: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 20,
  },
  workout: {
    marginBottom: 30,
  },
  treino: {
    fontSize: 18,
    color: "white",
    marginBottom: 10,
  },
  exercicio: {
    fontSize: 16,
    color: "#aaa",
    marginBottom: 5,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  button: {
    width: "48%",
    backgroundColor: "#1f1f1f",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalOptionText: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  workoutList: {
    maxHeight: 400,
  },
  workoutItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  workoutDay: {
    fontSize: 16,
    fontWeight: "bold",
  },
  workoutName: {
    fontSize: 15,
    marginBottom: 4,
  },
  workoutExercise: {
    fontSize: 14,
    color: "#555",
  },
});

export default DashboardAluno;