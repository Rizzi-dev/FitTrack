# 2026-11-12: Remoção de mocks e camada de API

- **Tasks:** TASK-001 (Concluída)
- **Specs tocadas:** SPEC-001, SPEC-002, SPEC-003 (escritas depois, a partir do código)

## Feito
- Leitura do projeto: Expo 52 + Expo Router, login e cadastro guardados no próprio celular (AsyncStorage), treinos e academias lidos de JSON.
- Removidos todos os dados fictícios (`datas/`, mocks do instrutor) e os serviços antigos.
- Criada a camada `services/` tipada com axios (Bearer, 401 → login, `getErrorMessage`).
- Painéis do aluno e do instrutor reescritos para a API; botão de sair adicionado nos dois.
- Correções: dia da semana dependente do idioma do aparelho, mutação de estado no modal de treino, `<Toast />` nunca exibido (`App.tsx` era ignorado), estilos `workoutItem*` ausentes.
- `README-BACKEND.md` com o contrato inicial.

## Decidido
- ADR-0002 (sem mocks), ADR-0005 (dias em inglês).

## Verificação
- `npx tsc --noEmit`: 38 erros → 2 (ambos do template, TASK-005).
- App **não** executado: a API não existe ainda.

## Pendente
- Validar contra a API real (TASK-002).
- O usuário de teste `teste@teste.com`, que estava sem commit em `datas/users.json`, foi apagado junto com a pasta.
