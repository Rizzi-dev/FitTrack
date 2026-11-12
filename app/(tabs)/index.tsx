import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, TextInput, Button, Alert, KeyboardAvoidingView, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { login } from '@/services/authService';
import { getErrorMessage } from '@/services/api';

export default function HomeScreen() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Informe e-mail e senha.');
      return;
    }
    setLoading(true);
    try {
      const user = await login(email.trim().toLowerCase(), password);
      if (user.user_type === 'student') {
        router.replace('/views/dashAluno');
      } else if (user.user_type === 'instructor') {
        router.replace('/views/dashInstrutor');
      } else {
        Alert.alert('Erro', 'Tipo de usuário não reconhecido');
      }
    } catch (error) {
      Alert.alert('Erro', getErrorMessage(error, 'E-mail ou senha incorretos'));
    } finally {
      setLoading(false);
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
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} disabled={loading} />
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