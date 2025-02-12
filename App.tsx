import React from "react";
import { Toast } from "react-native-toast-message";
import { Slot } from "expo-router"; // Para uso com o Expo Router

export default function App() {
  return (
    <>
      <Slot /> {/* Gerencia as rotas com o Expo Router */}
      <Toast /> {/* Adiciona o componente Toast global */}
    </>
  );
}