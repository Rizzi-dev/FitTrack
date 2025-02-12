import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import workouts from "@/datas/workouts.json";
import gyms from "@/datas/gyms.json";
import PersonalizarTreinoModal from "@/components/PersonalizarTreinoModal";
import TreineSeuJeitoModal from "@/components/TreineSeuJeitoModal";

const DashboardAluno = () => {
  const [dayName, setDayName] = useState("");
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [selectedGym, setSelectedGym] = useState("Fit Center");
  const [isWorkoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [isGymModalVisible, setGymModalVisible] = useState(false);
  const [isOtherWorkoutsModalVisible, setOtherWorkoutsModalVisible] = useState(false);
  const [isTreineSeuJeitoModalVisible, setTreineSeuJeitoModalVisible] = useState(false);

  useEffect(() => {
    const today = new Date();
    const dayName = today.toLocaleDateString("pt-BR", { weekday: "long" }).toLowerCase();
    setDayName(dayName);
    updateTodayWorkout(dayName);
  }, []);

const updateTodayWorkout = (day) => {
  const workoutPlan = workouts[day];
  if (workoutPlan) {
    setTodayWorkout(workoutPlan);
  } else {
    setTodayWorkout({ treino: "Descanso", exercicios: [] });
  }
};

  // Compartilhar treino
  const shareWorkout = async () => {
    if (!todayWorkout) {
      Alert.alert("Erro", "Não há treino disponível para compartilhar.");
      return;
    }

    const workoutString = JSON.stringify(todayWorkout, null, 2);
    const fileName = `treino_${dayName}.json`;
    const filePath = `${FileSystem.cacheDirectory}${fileName}`;

    try {
      await FileSystem.writeAsStringAsync(filePath, workoutString);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(filePath, {
          mimeType: "application/json",
          dialogTitle: "Salvar treino",
          UTI: "public.json",
        });
        Alert.alert("Sucesso", "Arquivo de treino compartilhado com sucesso!");
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


  const renderWorkoutItem = ({ item: [day, workout] }) => (
    <View style={styles.workoutItem}>
      <Text style={styles.workoutDay}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
      <Text style={styles.workoutName}>{workout.treino}</Text>
      {workout.exercicios?.map((exercicio, index) => (
        <Text key={index} style={styles.workoutExercise}>
          - {exercicio.maquina}: {exercicio.series || "N/A"}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.date}>
        Hoje: {dayName.charAt(0).toUpperCase() + dayName.slice(1)}
      </Text>
      <Text style={styles.academia}>Academia Selecionada: {selectedGym}</Text>

      <View style={styles.workout}>
        <Text style={styles.treino}>
          Treino de Hoje: {todayWorkout?.treino || "Descanso"}
        </Text>
        {todayWorkout?.exercicios?.map((exercicio, index) => (
          <Text key={index} style={styles.exercicio}>
            - {exercicio.maquina}: {exercicio.series || "N/A"}
          </Text>
        ))}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => setGymModalVisible(true)}>
          <Ionicons name="swap-horizontal-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Mudar Academia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setWorkoutModalVisible(true)}>
          <Ionicons name="pencil-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Personalizar Treino</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setOtherWorkoutsModalVisible(true)}>
          <Ionicons name="list-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Ver Outros Treinos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={shareWorkout}>
          <Ionicons name="download-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Fazer Download</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => setTreineSeuJeitoModalVisible(true)}>
          <Ionicons name="create-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Treine do Seu Jeito</Text>
        </TouchableOpacity>
      </View>

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
  data={Object.entries(workouts)}
  renderItem={renderWorkoutItem}
  keyExtractor={([day]) => day}
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

      <PersonalizarTreinoModal
        isVisible={isWorkoutModalVisible}
        onClose={() => setWorkoutModalVisible(false)}
        dayName={dayName}
        initialWorkout={todayWorkout}
        onSave={(updatedWorkout) => {
          setTodayWorkout(updatedWorkout);
          setWorkoutModalVisible(false);
        }}
      />

      <TreineSeuJeitoModal
        visible={isTreineSeuJeitoModalVisible}
        onClose={() => setTreineSeuJeitoModalVisible(false)}
        onSubmit={(data) => {
          console.log("Dados do usuário:", data);
          setTreineSeuJeitoModalVisible(false);
        }}
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
});

export default DashboardAluno;