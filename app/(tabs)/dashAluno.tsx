import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import workouts from "@/datas/workouts.json";
import gyms from "@/datas/gyms.json"; // Adicione este arquivo
import TreineSeuJeitoModal from "@/components/TreineSeuJeitoModal";

const DashboardAluno = () => {
  const [dayName] = useState(
    new Date().toLocaleDateString("pt-BR", { weekday: "long" }).toLowerCase()
  );
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [selectedGym, setSelectedGym] = useState("Fit Center");
  const [isGymModalVisible, setGymModalVisible] = useState(false);
  const [isWorkoutModalVisible, setWorkoutModalVisible] = useState(false);
  const [isCustomWorkoutModalVisible, setCustomWorkoutModalVisible] =
    useState(false);
  const [customWorkout, setCustomWorkout] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    const workoutPlan = workouts[dayName as keyof typeof workouts];
    setTodayWorkout(workoutPlan);
  }, [dayName]);

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
        {todayWorkout?.exercicios.map((exercicio, index) => (
          <Text key={index} style={styles.exercicio}>
            - {exercicio.maquina}: {exercicio.series}
          </Text>
        ))}
      </View>

      <View style={styles.buttons}>
        {/* Mudar Academia */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setGymModalVisible(true)}
        >
          <Ionicons name="swap-horizontal-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Mudar Academia</Text>
        </TouchableOpacity>

        {/* Personalizar Treino */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setWorkoutModalVisible(true)}
        >
          <Ionicons name="pencil-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Personalizar Treino</Text>
        </TouchableOpacity>

        {/* Chamar Instrutor */}
        <TouchableOpacity style={styles.button}>
          <Ionicons name="person-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Chamar Instrutor</Text>
        </TouchableOpacity>

        {/* Ver Outros Treinos */}
        <TouchableOpacity style={styles.button}>
          <Ionicons name="list-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Ver Outros Treinos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.lastButton}
                  onPress={() => setModalVisible(true)}><TreineSeuJeitoModal
                  visible={isModalVisible}
                  onClose={() => setModalVisible(false)}
                  onSubmit={(data) => {
                    console.log("Texto:", data.text);
                    console.log("Imagem URI:", data.image);
                  }}
                />
          <Ionicons name="id-card-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Gostaria de treinar do seu jeito?</Text>
        </TouchableOpacity>
      </View>

      {/* Modal para Mudar Academia */}
      <Modal visible={isGymModalVisible} transparent animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Escolha sua Academia</Text>
          <FlatList
            data={gyms}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setSelectedGym(item.name);
                  setGymModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.modalClose}
            onPress={() => setGymModalVisible(false)}
          >
            <Text style={styles.modalCloseText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal para Personalizar Treino */}
      <Modal visible={isWorkoutModalVisible} transparent animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Personalize seu Treino</Text>
          {todayWorkout?.exercicios.map((exercicio, index) => (
            <View key={index} style={styles.modalOption}>
              <TextInput
                style={styles.input}
                defaultValue={`${exercicio.series}`}
                onChangeText={(text) => {
                  const updatedWorkout = { ...todayWorkout };
                  updatedWorkout.exercicios[index].series = text;
                  setTodayWorkout(updatedWorkout);
                }} 
              />
            </View>
          ))}
          <TouchableOpacity
            style={styles.modalSave}
            onPress={() => {
              // Salvar alterações no workouts.json
              setWorkoutModalVisible(false);
            }}
          >
            <Text style={styles.modalSaveText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal para Treino Customizado */}
      <Modal
        visible={isCustomWorkoutModalVisible}
        transparent
        animationType="slide"
      >
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Invente seu próprio treino!</Text>
          <Text style={styles.modalText}>
            "O treino perfeito é aquele que combina com você. Vamos criar algo
            único?"
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Descreva seu treino..."
            value={customWorkout}
            onChangeText={setCustomWorkout}
          />
          <TouchableOpacity
            style={styles.modalSave}
            onPress={() => {
              setCustomWorkoutModalVisible(false);
              console.log(customWorkout); // Aqui será enviado ao backend
            }}
          >
            <Text style={styles.modalSaveText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  lastButton: {
    width: "100%",
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
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    color: "white",
    marginBottom: 10,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalText: {
    color: "white",
    marginBottom: 20,
  },
  modalSave: {
    backgroundColor: "#1f1f1f",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalSaveText: {
    color: "white",
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default DashboardAluno;
