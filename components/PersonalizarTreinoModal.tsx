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

import { Exercise, WorkoutPayload } from "@/services/types";

interface PersonalizarTreinoModalProps {
  isVisible: boolean;
  onClose: () => void;
  dayLabel: string;
  initialWorkout: WorkoutPayload | null;
  onSave: (updatedWorkout: WorkoutPayload) => Promise<void>;
}

const EMPTY_WORKOUT: WorkoutPayload = { name: "", exercises: [] };

const PersonalizarTreinoModal: React.FC<PersonalizarTreinoModalProps> = ({
  isVisible,
  onClose,
  dayLabel,
  initialWorkout,
  onSave,
}) => {
  const [editingWorkout, setEditingWorkout] = useState<WorkoutPayload>(EMPTY_WORKOUT);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setEditingWorkout(
        initialWorkout
          ? { name: initialWorkout.name, exercises: initialWorkout.exercises.map((e) => ({ ...e })) }
          : EMPTY_WORKOUT
      );
    }
  }, [initialWorkout, isVisible]);

  const addExercise = () => {
    setEditingWorkout((w) => ({ ...w, exercises: [...w.exercises, { machine: "", sets: "" }] }));
  };

  const removeExercise = (index: number) => {
    setEditingWorkout((w) => ({ ...w, exercises: w.exercises.filter((_, i) => i !== index) }));
  };

  const updateExercise = (index: number, field: keyof Exercise, value: string) => {
    setEditingWorkout((w) => ({
      ...w,
      exercises: w.exercises.map((e, i) => (i === index ? { ...e, [field]: value } : e)),
    }));
  };

  const saveWorkout = async () => {
    if (!editingWorkout.name.trim()) {
      Alert.alert("Erro", "Informe o nome do treino.");
      return;
    }
    setSaving(true);
    try {
      await onSave({
        name: editingWorkout.name.trim(),
        exercises: editingWorkout.exercises.filter((e) => e.machine.trim()),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalTitle}>Personalize seu Treino</Text>
          <Text style={styles.subtitle}>Hoje: {dayLabel}</Text>

          <TextInput
            style={styles.input}
            value={editingWorkout.name}
            onChangeText={(text) => setEditingWorkout((w) => ({ ...w, name: text }))}
            placeholder="Nome do Treino"
          />

          {editingWorkout.exercises.map((exercise, index) => (
            <View key={index} style={styles.exercicioContainer}>
              <TextInput
                style={styles.input}
                value={exercise.machine}
                onChangeText={(text) => updateExercise(index, "machine", text)}
                placeholder="Nome do Exercício"
              />

              <TextInput
                style={styles.input}
                value={exercise.sets}
                onChangeText={(text) => updateExercise(index, "sets", text)}
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

          <TouchableOpacity style={styles.saveButton} onPress={saveWorkout} disabled={saving}>
            <Text style={styles.buttonText}>{saving ? "Salvando..." : "Salvar"}</Text>
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