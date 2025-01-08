import { Image, StyleSheet, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// JSON estático para simular autenticação
const users = [
  { username: 'aluno', password: '1234', type: 'aluno' },
  { username: 'instrutor', password: '5678', type: 'instrutor' },
];

type RootStackParamList = {
  Home: undefined;
  MainDashboard: undefined;
  DashAluno: undefined;
  DashInstrutor: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Função para simular autenticação com o JSON estático
  const authenticateUser = (username: string, password: string) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    return user || null;
  };

  // Função para redirecionar para o dashboard correto
  const redirectToDashboard = (userType: string) => {
    if (userType === 'aluno') {
      navigation.navigate('dashAluno');
    } else if (userType === 'instrutor') {
      navigation.navigate('dashInstrutor');
    } else {
      Alert.alert('Erro', 'Tipo de usuário desconhecido');
    }
  };

  const handleLogin = () => {
    // Validação usando JSON estático
    const user = authenticateUser(username, password);
    if (user) {
      Alert.alert('Login bem-sucedido!', `Bem-vindo, ${user.username}!`);
      redirectToDashboard(user.type); // Redireciona com base no tipo de usuário
    } else {
      Alert.alert('Erro', 'Usuário ou senha incorretos');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/home_img.jpeg')}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Bem-vindo ao FitTrack</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">
            Alcance seus objetivos de forma inteligente e personalizada!
          </ThemedText>
          <ThemedText>
            Entre agora e transforme toda a sua rotina de treino com o FitTrack.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.loginContainer}>
          <ThemedText style={styles.stepContainer}>Faça seu login</ThemedText>
          <TextInput
            placeholder="Usuário"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button title="Entrar" onPress={handleLogin} />
        </ThemedView>
      </ParallaxScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 15,
  },
  reactLogo: {
    height: 500,
    width: 500,
    bottom: 0,
    top: 0,
    left: 0,
    position: 'absolute',
  },
  loginContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  input: {
    color: '#fff',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
