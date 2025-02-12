import users from '@/datas/users.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = '@users';

// Carregar usuários do AsyncStorage na inicialização
const loadUsers = async () => {
  try {
    const storedUsers = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
  }
  return users; // Retorna os usuários do arquivo JSON se não houver dados no AsyncStorage
};

// Salvar usuários no AsyncStorage
const saveUsers = async (users) => {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Erro ao salvar usuários:', error);
  }
};

export const createUser = async (user) => {
  const users = await loadUsers();
  if (users.some(u => u.email === user.email)) {
    throw new Error('Usuário com este e-mail já existe');
  }
  const newUser = { ...user, id: Date.now().toString() };
  users.push(newUser);
  await saveUsers(users);
  return newUser;
};

export const getUserByEmail = async (email) => {
  const users = await loadUsers();
  return users.find(u => u.email === email);
};

export const updateUser = async (id, userData) => {
  const users = await loadUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    throw new Error('Usuário não encontrado');
  }
  users[index] = { ...users[index], ...userData };
  await saveUsers(users);
  return users[index];
};

export const deleteUser = async (id) => {
  const users = await loadUsers();
  const updatedUsers = users.filter(u => u.id !== id);
  await saveUsers(updatedUsers);
};

export const getUserType = async (email) => {
  const user = await getUserByEmail(email);
  return user ? user.user_type : null;
};