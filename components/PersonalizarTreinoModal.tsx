import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
} from "react-native";

interface Exercicio {
  maquina: string;
  series: string;
}

interface Workout {
  treino: string;
  exercicios: Exercicio[];
}

interface PersonalizarTreinoModalProps {
  isVisible: boolean;
  onClose: () => void;
  dayName: string;
  initialWorkout: Workout | null;
  onSave: (updatedWorkout: Workout) => void;
}

const PersonalizarTreinoModal: React.FC<PersonalizarTreinoModalProps> = ({
  isVisible,
  onClose,
  dayName,
  initialWorkout,
  onSave,
}) => {
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);

  useEffect(() => {
    setEditingWorkout(initialWorkout);
  }, [initialWorkout]);

  const addExercise = () => {
    if (editingWorkout) {
      const updatedWorkout = {
        ...editingWorkout,
        exercicios: [...editingWorkout.exercicios, { maquina: "", series: "" }],
      };
      setEditingWorkout(updatedWorkout);
    }
  };

  const removeExercise = (index: number) => {
    if (editingWorkout) {
      const updatedWorkout = {
        ...editingWorkout,
        exercicios: editingWorkout.exercicios.filter((_, i) => i !== index),
      };
      setEditingWorkout(updatedWorkout);
    }
  };

  const saveWorkout = () => {
    if (editingWorkout) {
      onSave(editingWorkout);
      Alert.alert("Sucesso", "Treino atualizado com sucesso!");
    }
  };

  if (!editingWorkout) {
    return null; // Evitar erros durante o carregamento
  }

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Personalize seu Treino</Text>
          <Text style={styles.subtitle}>Hoje: {dayName}</Text>

          <TextInput
            style={styles.input}
            value={editingWorkout.treino}
            onChangeText={(text) =>
              setEditingWorkout({ ...editingWorkout, treino: text })
            }
            placeholder="Nome do Treino"
          />

          {editingWorkout.exercicios.map((exercicio, index) => (
            <View key={index} style={styles.exercicioContainer}>
              <TextInput
                style={styles.input}
                value={exercicio.maquina}
                onChangeText={(text) => {
                  const updatedExercicios = [...editingWorkout.exercicios];
                  updatedExercicios[index].maquina = text;
                  setEditingWorkout({ ...editingWorkout, exercicios: updatedExercicios });
                }}
                placeholder="Nome do Exercício"
              />

              <TextInput
                style={styles.input}
                value={exercicio.series}
                onChangeText={(text) => {
                  const updatedExercicios = [...editingWorkout.exercicios];
                  updatedExercicios[index].series = text;
                  setEditingWorkout({ ...editingWorkout, exercicios: updatedExercicios });
                }}
                placeholder="Séries (ex: 4x10)"
              />

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeExercise(index)}
              >
                <Text style={styles.removeButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={addExercise}>
            <Text style={styles.buttonText}>Adicionar Exercício</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={saveWorkout}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  exercicioContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: "#FF5722",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  removeButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default PersonalizarTreinoModal;