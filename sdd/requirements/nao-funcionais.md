# Requisitos não funcionais do app

| ID | Requisito | Como verificar |
|---|---|---|
| RNF-01 | Rodar em iOS, Android e web (Expo) | Abrir as 3 plataformas no smoke test |
| RNF-02 | Todo texto exibido ao usuário em português (pt-BR), inclusive erros vindos da API (`detail`) | Revisão de PR |
| RNF-03 | URL da API configurável por ambiente (`EXPO_PUBLIC_API_URL`), nunca fixa no código | `grep` por URLs em `services/` |
| RNF-04 | Token de sessão guardado só no dispositivo; nada de senha armazenada localmente. Meta: migrar para `expo-secure-store` (TASK-003) | Revisão de `services/api.ts` |
| RNF-05 | O dia da semana vem de `Date.getDay()`, nunca do nome do dia no idioma do aparelho | `constants/days.ts` |
| RNF-06 | Toda chamada à API mostra estado de carregamento e trata erro com mensagem amigável | Critérios de aceite das specs |
| RNF-07 | Requisições com timeout de 15 s | `services/api.ts` |
| RNF-08 | `tsc --noEmit` sem erros novos (meta: zero erros, TASK-005) | `npx tsc --noEmit` |
| RNF-09 | Sem dados fictícios no código de produção; dados de desenvolvimento vêm do seed da API | `grep -ri mock app components services` |
