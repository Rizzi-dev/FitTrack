# TASK-003: Guardar token com expo-secure-store

- **Status:** A fazer
- **Origem:** RNF-04
- **Estimativa:** P

## Objetivo
Tirar o JWT do AsyncStorage (texto puro) e guardar no Keychain/Keystore.

## Passos
- [ ] `npx expo install expo-secure-store`
- [ ] Trocar `getToken`/`setToken`/`clearToken` em `services/api.ts`
- [ ] Na web (sem SecureStore), cair para AsyncStorage
- [ ] Remover a chave antiga do AsyncStorage na primeira execução

## Definição de pronto
- [ ] SPEC-001 CA-4, CA-6, CA-7 continuam passando
