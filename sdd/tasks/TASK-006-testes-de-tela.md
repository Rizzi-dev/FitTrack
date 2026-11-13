# TASK-006: Testes de tela para os critérios de aceite

- **Status:** A fazer
- **Origem:** SPEC-001, SPEC-002, SPEC-003
- **Estimativa:** G

## Objetivo
Cobrir os CAs com testes automatizados usando jest-expo + React Native Testing Library, com a API mockada **só no teste** (ex.: `axios-mock-adapter` ou MSW).

## Passos
- [ ] Instalar `@testing-library/react-native`
- [ ] Teste de `getErrorMessage` (detail string, lista, sem resposta)
- [ ] Teste de `getTodayKey` com datas fixas
- [ ] Testes de tela: SPEC-001 CA-1, CA-5; SPEC-002 CA-2, CA-5, CA-6; SPEC-003 CA-3, CA-5
- [ ] Trocar `"test": "jest --watchAll"` por `jest` (e `test:watch` separado)

## Definição de pronto
- [ ] `npm test` verde
