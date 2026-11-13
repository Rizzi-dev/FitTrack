# TASK-001: Remover mocks e criar camada de API

- **Status:** Concluída (2026-11-12)
- **Origem:** ADR-0002
- **Estimativa:** G

## Objetivo
Fazer o app depender só da API, sem nenhum dado fictício.

## Passos
- [x] Apagar `datas/` (users, gyms, workouts), `services/users.js`, `services/userService.js`, `services/api.js`, `App.tsx`
- [x] Criar `services/api.ts`, `types.ts`, `authService.ts`, `userService.ts`, `workoutService.ts`, `instructorService.ts`
- [x] Criar `constants/days.ts` (ADR-0005)
- [x] Ligar login, cadastro e os dois painéis aos serviços
- [x] `<Toast />` no `app/_layout.tsx`
- [x] Corrigir mutação de estado no `PersonalizarTreinoModal`
- [x] `expo-file-system` declarado; `expo-permissions` removido
- [x] `.env.example` e `.env` no `.gitignore`
- [x] Contrato escrito (hoje em api:SPEC-000)

## Definição de pronto
- [x] `tsc` sem erros novos (38 → 2, os 2 restantes são do template: TASK-005)
- [ ] Validado contra API real: TASK-002
