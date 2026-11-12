# ADR-0001: SDD e divisão de responsabilidades entre repos

- **Status:** Aceita
- **Data:** 2026-11-12
- **Repos afetados:** ambos

## Contexto
O FitTrack tem dois repositórios (app Expo e API NestJS) desenvolvidos em paralelo, com ajuda de
agentes de IA. Sem uma fonte única, requisitos e contrato tendem a divergir (já aconteceu: o
contrato inicial supunha FastAPI na porta 8000, e a API é NestJS na 3000).

## Decisão
Os dois repos adotam Spec-Driven Development com a mesma estrutura em `sdd/`
(`context`, `decisions`, `logs`, `memory`, `prompts`, `specs`, `tasks`, `requirements`), e:
- **requisitos de produto (`RF`)** vivem no **front**;
- **contrato HTTP** vive no **back** (`sdd/specs/SPEC-000-contrato-api.md`);
- cada repo mantém seus próprios `RNF`, specs, tasks, logs e memória;
- ADRs que afetam os dois são duplicados com o mesmo número.

## Alternativas consideradas
- **Terceiro repo só de specs**: fonte única de verdade, mas mais um repo para manter sincronizado. Exagero para o tamanho atual.
- **Tudo duplicado nos dois repos**: simples de ler, mas diverge rápido.
- **Tudo no back**: o front ficaria sem os requisitos de tela perto do código.

## Consequências
- Mudança de contrato sempre começa no back.
- O `README-BACKEND.md` do front vira só um ponteiro para o `SPEC-000`.
- Links entre repos são textuais (`api:SPEC-003`), porque não há monorepo.
