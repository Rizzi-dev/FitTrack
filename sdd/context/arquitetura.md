# Arquitetura do app

## Stack

| Item | Versão / escolha |
|---|---|
| Runtime | Expo SDK 52, React Native 0.76, React 18.3 (New Architecture ligada) |
| Navegação | Expo Router 4 (rotas por arquivo, `typedRoutes`) |
| Linguagem | TypeScript `strict` (há `.js` legado permitido por `allowJs`) |
| HTTP | axios 1.x |
| Armazenamento local | AsyncStorage (somente o token JWT) |
| Feedback | `Alert` nativo + `react-native-toast-message` |
| Recursos nativos | expo-location, expo-image-picker (câmera), expo-file-system + expo-sharing |
| Testes | jest-expo (só existe o snapshot do template) |

## Pastas

```
app/
  _layout.tsx            Stack raiz, tema, <Toast />
  (tabs)/index.tsx       Login
  (tabs)/explore.tsx     Cadastro
  views/dashAluno.tsx    Painel do aluno
  views/dashInstrutor.tsx Painel do instrutor
components/              Modais (PersonalizarTreino, TreineSeuJeito) + restos do template
constants/days.ts        Dias da semana (chave da API ↔ rótulo PT)
services/
  api.ts                 axios: baseURL via env, Bearer token, 401 → login, getErrorMessage
  types.ts               Tipos espelhando o contrato da API
  authService.ts         login / register / logout
  userService.ts         /users/me, /gyms
  workoutService.ts      /workouts/me, /custom-workouts
  instructorService.ts   /instructor-calls, /instructors/me/students, /notifications
sdd/                     Este processo
```

## Fluxo de dados

```
Tela ──chama──▶ services/*Service.ts ──axios──▶ API
  ▲                                             │
  └──── estado local (useState) ◀── resposta ───┘
```

- Não há estado global (Redux/Context). Cada painel chama `GET /users/me` ao abrir.
- O token fica em AsyncStorage (`@fittrack:token`); o interceptor injeta `Authorization: Bearer`.
- Qualquer `401` (exceto no login) apaga o token e faz `router.replace('/')`.
- Mensagens de erro exibidas vêm de `getErrorMessage`, que lê `detail` da resposta.

## Configuração

| Variável | Uso | Padrão |
|---|---|---|
| `EXPO_PUBLIC_API_URL` | URL base da API | `http://127.0.0.1:3000` |

Copie `.env.example` para `.env` (o `.env` não é versionado).
