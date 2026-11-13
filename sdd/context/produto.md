# Produto: FitTrack

App de academia que conecta **alunos** e **instrutores** da mesma academia.

## Perfis

| Perfil | Valor do `user_type` | Objetivo |
|---|---|---|
| Aluno | `student` | Saber o que treinar hoje, ajustar o treino e pedir ajuda |
| Instrutor | `instructor` | Acompanhar os alunos da academia e responder chamadas |

## Jornadas principais

**Aluno**
1. Cadastra-se e faz login.
2. Escolhe a academia em que treina.
3. Abre o app e vê o **treino do dia** (ou "Descanso").
4. Ajusta o treino do dia, vê o plano da semana, exporta o treino em JSON.
5. Durante o treino, toca em **Chamar instrutor**.
6. Pode enviar um "**Treine do seu jeito**" (descrição + foto).

**Instrutor**
1. Cadastra-se, faz login e escolhe a academia.
2. Recebe **notificações** (ex.: aluno chamou).
3. Consulta a lista de **alunos** da academia (com busca).
4. Mantém o próprio **perfil** (nome, especialidade).

## Estado atual (2026-11-12)

- O app não tem mais nenhum dado falso; todas as telas consomem a API ([ADR-0002](../decisions/ADR-0002-camada-api.md)).
- A API ainda **não existe**: o `fittrack-api` é só o projeto NestJS recém-criado.
- Sem testes automatizados de tela; a validação até agora foi só a checagem de tipos (`tsc`).
