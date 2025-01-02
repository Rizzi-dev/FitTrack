import React, { useState } from 'react';
import { Image, View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import gyms from '@/datas/gyms.json';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type UserType = 'Aluno' | 'Instrutor';

const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  let remainder;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf[9])) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf[10])) return false;

  return true;
};

export default function UserRegistration() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [sex, setSex] = useState<string>('Masculino');
  const [userType, setUserType] = useState<UserType>('Aluno');
  const [selectedGym, setSelectedGym] = useState<string>(''); // Alteração aqui

  const handleSubmit = () => {
    if (!name || !email || !cpf || !selectedGym) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    if (!isValidCPF(cpf)) {
      Alert.alert('Erro', 'CPF inválido!');
      return;
    }

    const user = {
      name,
      email,
      cpf,
      sex,
      userType,
      gym: gyms.find((gym) => String(gym.id) === selectedGym)?.name, // Converte ID para string
    };

    console.log('Usuário cadastrado:', user);
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
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
      <Text style={styles.title}>Cadastro de Usuário</Text>

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
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      <View style={styles.row}>
        <Text>Sexo:</Text>
        <Picker
          selectedValue={sex}
          style={styles.picker}
          onValueChange={(itemValue) => setSex(itemValue)}
        >
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Feminino" value="Feminino" />
        </Picker>
      </View>

      <View style={styles.row}>
        <Text>Tipo de Usuário:</Text>
        <Picker
          selectedValue={userType}
          style={styles.picker}
          onValueChange={(itemValue) => setUserType(itemValue as UserType)}
        >
          <Picker.Item label="Aluno" value="Aluno" />
          <Picker.Item label="Instrutor" value="Instrutor" />
        </Picker>
      </View>

      <View style={styles.row}>
        <Text>Academia:</Text>
        <Picker
          selectedValue={selectedGym}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedGym(itemValue)}
        >
          {gyms.map((gym) => (
            <Picker.Item key={gym.id} label={gym.name} value={String(gym.id)} /> // Converte ID para string
          ))}
        </Picker>
      </View>

      <Button title="Cadastrar" onPress={handleSubmit} />
    </ScrollView>
    </ParallaxScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 500,
    width: '100%',
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  formContainer: {
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  }
});
