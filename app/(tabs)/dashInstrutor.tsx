import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import workouts from '@/datas/workouts.json';

const DashboardInstrutor = () => {
  const [dayName] = useState(new Date().toLocaleDateString('pt-BR', { weekday: 'long' }).toLowerCase());
  const [todayWorkout, setTodayWorkout] = useState(null);

  useEffect(() => {
    // Carregar o treino do dia atual
    const workoutPlan = workouts[dayName as keyof typeof workouts];
    setTodayWorkout(workoutPlan);
  }, [dayName]);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>Hoje: {dayName.charAt(0).toUpperCase() + dayName.slice(1)}</Text>
      <Text style={styles.academia}>Academia Selecionada: Fit Center</Text>

      <View style={styles.workout}>
        <Text style={styles.treino}>Treino de Hoje: {todayWorkout?.treino || 'Descanso'}</Text>
        {todayWorkout?.exercicios.map((exercicio, index) => (
          <Text key={index} style={styles.exercicio}>
            - {exercicio.maquina}: {exercicio.series}
          </Text>
        ))}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="swap-horizontal-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Mudar Academia</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="pencil-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Personalizar Treino</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="person-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Chamar Instrutor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="list-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Ver Outros Treinos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.lastButton}>
          <Ionicons name="id-card-outline" size={24} color="white" />
          <Text style={styles.buttonText}>Gostaria de treinar do seu jeito?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000011',
    padding: 20,
    paddingTop: 100, // Adicionado espaço superior para empurrar os itens para baixo
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
  lastButton: {
    width: '100%',
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
  },
});

export default DashboardInstrutor;
