import { Image, StyleSheet, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { authenticateUser } from '@/services/users';

type RootStackParamList = {
  Home: undefined;
  MainDashboard: undefined;
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

  const handleLogin = async () => {
    try {
      const isAuthenticated = await authenticateUser(username, password);
      if (isAuthenticated) {
        Alert.alert('Login bem-sucedido!', 'Bem-vindo ao FitTrack!');
        navigation.navigate('MainDashboard');
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Houve um problema na autenticação. Tente novamente.');
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
