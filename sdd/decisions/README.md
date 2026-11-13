# Decisões (ADRs)

Um ADR registra uma decisão que afeta mais de uma spec ou que seria cara de desfazer.
ADRs que afetam os dois repos são escritos **nos dois**, com o mesmo número e título.

| ADR | Título | Status | Repos |
|---|---|---|---|
| [0001](ADR-0001-sdd-entre-repos.md) | SDD e divisão de responsabilidades entre repos | Aceita | front + back |
| [0002](ADR-0002-camada-api.md) | App consome só a API (sem mocks) com camada `services/` tipada | Aceita | front |
| [0003](ADR-0003-formato-de-erro.md) | Formato de erro `{ detail }` em PT | Aceita | front + back |
| [0004](ADR-0004-porta-e-url-da-api.md) | API na porta 3000; URL do app via env | Aceita | front + back |
| [0005](ADR-0005-dias-da-semana.md) | Dias da semana como chave em inglês | Aceita | front + back |

No repo `fittrack-api` existem também os ADRs só do back: 0006 (Postgres + Drizzle), 0007 (Zod), 0008 (JWT sem refresh), todos em **Proposta**.

Modelo: [_template.md](_template.md)
