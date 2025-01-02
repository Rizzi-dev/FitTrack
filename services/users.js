import api from "../services/api";

/**
 * Autentica o usuário com o backend.
 * @param {string} username - Nome de usuário.
 * @param {string} password - Senha do usuário.
 * @returns {Promise<boolean>} - Retorna true se a autenticação for bem-sucedida, false caso contrário.
 */
export const authenticateUser = async (username, password) => {
  try {
    const response = await fetch(`/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      return true;
    } else {
      console.error(`Erro na autenticação: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error('Erro ao conectar com o backend:', error);
    return false;
  }
};

// Função para criar um usuário
export const createUser = async (userData) => {
  try {
    const response = await api.post("/users/", userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Erro ao criar usuário");
  }
};

// Função para obter um usuário por ID
export const getUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Erro ao obter usuário");
  }
};

// Função para atualizar um usuário por ID
export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Erro ao atualizar usuário");
  }
};

// Função para deletar um usuário por ID
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Erro ao deletar usuário");
  }
};
