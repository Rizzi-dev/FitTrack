# ADR-0002: App consome só a API (sem mocks) com camada `services/` tipada

- **Status:** Aceita
- **Data:** 2026-11-12
- **Repos afetados:** front

## Contexto
O app guardava usuários (com senha em texto puro) no AsyncStorage e lia treinos e academias de
JSONs locais. O painel do instrutor tinha alunos, notificações e perfil fixos no código.

## Decisão
Remover todos os dados fictícios. As telas chamam apenas funções de `services/*Service.ts`, que
usam uma instância axios única (`services/api.ts`) com URL via env, Bearer token e tratamento
de 401. Os tipos ficam em `services/types.ts`, espelhando o `api:SPEC-000`.

## Alternativas consideradas
- **Manter mocks atrás de uma flag**: ajuda a desenvolver sem back, mas duplica dados e mascara divergências de contrato. Dados de desenvolvimento passam a vir do seed da API (api:TASK-009).
- **React Query / SWR**: cache e revalidação prontos, mas é dependência extra para um app com poucas telas. Pode ser revisto depois.

## Consequências
- O app não funciona sem a API rodando.
- Qualquer divergência entre `types.ts` e o contrato aparece como erro em tempo de execução: manter os dois sincronizados.
