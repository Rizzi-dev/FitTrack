import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, Alert, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as Permissions from 'expo-permissions';

import workouts from "@/datas/workouts.json";
import gyms from "@/datas/gyms.json";
import PersonalizarTreinoModal from "@/components/PersonalizarTreinoModal";
import TreineSeuJeitoModal from "@/components/TreineSeuJeitoModal";
import Toast from "react-native-toast-message";

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
           mimeType: 'application/json',
           dialogTitle: 'Salvar treino',
           UTI: 'public.json' // Isso é necessário para iOS
         });
         Alert.alert("Sucesso", "Arquivo de treino compartilhado com sucesso!");
       } else {
         Alert.alert("Erro", "Compartilhamento não está disponível neste dispositivo.");
       }
     } catch (error) {
       console.error("Erro ao compartilhar o treino:", error);
       Alert.alert("Erro", "Não foi possível compartilhar o arquivo de treino.");
     } finally {
       // Limpar o arquivo temporário
       await FileSystem.deleteAsync(filePath, { idempotent: true });
     }
   };

   const renderWorkoutItem = ({ item: [day, workout] }) => (
       <View style={styles.workoutItem}>
         <Text style={styles.workoutDay}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
         <Text style={styles.workoutName}>{workout.treino}</Text>
         {workout.exercicios.map((exercicio, index) => (
           <Text key={index} style={styles.workoutExercise}>
             - {exercicio.maquina}: {exercicio.series}
           </Text>
         ))}
       </View>
     );

 const requestPermissions = async () => {
   const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY_WRITE_ONLY);
   if (status !== 'granted') {
     Alert.alert('Permissão necessária', 'É necessário permitir acesso ao armazenamento para salvar os arquivos.');
     return false;
   }
   return true;
 };

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
       <TouchableOpacity
         style={styles.button}
         onPress={() => {
           Toast.show({
             type: "success",
             text1: "Notificação enviada ao instrutor", // Mensagem principal
           });
         }}
       >
         <Ionicons name="person-outline" size={24} color="white" />
         <Text style={styles.buttonText}>Chamar Instrutor</Text>
       </TouchableOpacity>

        {/* Ver Outros Treinos */}
        <TouchableOpacity style={styles.button} onPress={() => setOtherWorkoutsModalVisible(true)}>
          <Ionicons name="list-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Ver Outros Treinos</Text>
        </TouchableOpacity>

        {/* Botão de Download */}
        <TouchableOpacity style={styles.button} onPress={shareWorkout}>
          <Ionicons name="download-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Fazer download deste treino</Text>
        </TouchableOpacity>

          <TouchableOpacity
                  style={styles.button}
                  onPress={() => setTreineSeuJeitoModalVisible(true)}
                >
                  <Ionicons name="create-outline" size={24} color="white" />
                  <Text style={styles.buttonText}>Gostaria de treinar do seu jeito?</Text>
          </TouchableOpacity>

      </View>

      {/* Modal para Mudar Academia */}
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
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setSelectedGym(item.name);
                    setGymModalVisible(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setGymModalVisible(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para Personalizar Treino */}
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
                    keyExtractor={(item) => item[0]}
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
  onSubmit={async (data) => {
    try {
      const { text, image } = data;

      // Diretório local do aplicativo
      const directoryPath = `${FileSystem.documentDirectory}TreineSeuJeito/`;

      // Certifique-se de que o diretório existe
      const dirInfo = await FileSystem.getInfoAsync(directoryPath);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(directoryPath, { intermediates: true });
      }

      // Salvar o texto em um arquivo
      const textFilePath = `${directoryPath}texto.txt`;
      await FileSystem.writeAsStringAsync(textFilePath, text);

      // Fazer o download da imagem (se existir) e copiá-la para o diretório
      if (image) {
        const imageFileName = image.split('/').pop(); // Extrair o nome da imagem
        const imageFilePath = `${directoryPath}${imageFileName}`;
        await FileSystem.copyAsync({
          from: image,
          to: imageFilePath,
        });
      }

      Alert.alert("Sucesso", "Texto e imagem armazenados localmente!");
      setTreineSeuJeitoModalVisible(false);
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      Alert.alert("Erro", "Ocorreu um problema ao salvar os dados.");
    }
  }}
/>;

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