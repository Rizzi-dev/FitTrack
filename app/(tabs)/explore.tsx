import React, { useState } from 'react';
import { Image, View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { register } from '@/services/authService';
import { getErrorMessage } from '@/services/api';
import { Sex, UserType } from '@/services/types';

export default function UserRegistration() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState<Sex>('male');
  const [userType, setUserType] = useState<UserType>('student');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        sex,
        user_type: userType,
      });
      setName('');
      setEmail('');
      setPassword('');
      Alert.alert('Sucesso', 'Cadastro realizado! Faça login para continuar.');
      router.replace('/');
    } catch (error) {
      Alert.alert('Erro', getErrorMessage(error, 'Não foi possível realizar o cadastro. Tente novamente.'));
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
            style={styles.headerImage}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Cadastro de Usuário</ThemedText>
        </ThemedView>

        <ScrollView contentContainerStyle={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />


          <View style={styles.row}>
            <Text>Sexo:</Text>
            <Picker
              selectedValue={sex}
              style={styles.picker}
              onValueChange={(itemValue) => setSex(itemValue)}
            >
              <Picker.Item label="Masculino" value="male" />
              <Picker.Item label="Feminino" value="female" />
            </Picker>
          </View>

          <View style={styles.row}>
            <Text>Tipo de Usuário:</Text>
            <Picker
              selectedValue={userType}
              style={styles.picker}
              onValueChange={(itemValue) => setUserType(itemValue)}
            >
              <Picker.Item label="Aluno" value="student" />
              <Picker.Item label="Instrutor" value="instructor" />
            </Picker>
          </View>

          <Button title={loading ? 'Cadastrando...' : 'Cadastrar'} onPress={handleSubmit} disabled={loading} />
        </ScrollView>
      </ParallaxScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 500,
    width: 500,
    bottom: 0,
    top: 0,
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  picker: {
    height: 40,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  row: {
    marginBottom: 16,
  },
});