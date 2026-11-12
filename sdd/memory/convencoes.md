# Convenções do app

> Regras gerais (comentários, commits, PRs, fonte da verdade) ficam no `AGENTS.md` da raiz; aqui ficam só os padrões técnicos.

- **Chamadas HTTP só em `services/*Service.ts`.** Telas nunca importam `axios` nem `api` direto.
- **Tipos da API em `services/types.ts`**, espelhando `api:SPEC-000` campo a campo (snake_case, inglês).
- **Texto de UI em português**; identificadores e campos de API em inglês.
- **Erros:** `Alert.alert('Erro', getErrorMessage(error, '<fallback PT>'))`; para ações rápidas, `Toast.show`.
- **Navegação pós-login/logout com `router.replace`**, para não deixar o login no histórico.
- **Dia da semana:** sempre `getTodayKey()` / `DAY_LABELS` de `constants/days.ts`.
- **Atualizar estado sem mutação:** `setX(prev => ...)` com `map`/`filter`, nunca `arr[i].campo = ...`.
- Imports com alias `@/` (raiz do projeto).
