import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './app/(tabs)/index'; // Tela de login
import DashboardAluno from './app/(tabs)/dashAluno'; // Tela inicial para alunos
import DashInstrutor from './app/(tabs)/dashInstrutor'; // Tela inicial para instrutores

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="DashAluno" component={DashboardAluno} options={{ title: 'Dashboard Aluno' }} />
        <Stack.Screen name="DashInstrutor" component={DashInstrutor} options={{ title: 'Dashboard Instrutor' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
