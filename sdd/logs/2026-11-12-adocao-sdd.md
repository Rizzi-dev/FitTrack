# 2026-11-12: Adoção do SDD nos dois repos

- **Tasks:** n/a (estrutura)
- **Repo par:** log de mesmo nome em `fittrack-api/sdd/logs/`

## Feito
- Criada a estrutura `sdd/` (context, decisions, logs, memory, prompts, specs, tasks, requirements) nos dois repos.
- Requisitos de produto RF-01..RF-14 extraídos do código atual; RF-15..18 no backlog.
- Specs SPEC-001..003 escritas a partir das telas implementadas.
- Contrato movido para `api:SPEC-000`; `README-BACKEND.md` virou ponteiro.

## Decidido
- ADR-0001 (divisão entre repos), ADR-0003 (erro `{detail}` mantido, back converte), ADR-0004 (porta 3000).

## Descoberto
- O back é **NestJS 12** (ESM, Vitest), não FastAPI como o contrato inicial supunha.
- O back está em `PERSONAL/fittrack-api/fittrack-api` e **não é um repo git**.

## Verificação
- Front: URL padrão alterada para `:3000` em `services/api.ts` e `.env.example`.

## Pendente
- Back: `git init` e decisão de banco/ORM (api:ADR-0006, Proposta).

## Regras dos agentes
- Regras obrigatórias adicionadas ao `AGENTS.md` (idênticas nos dois repos): ler o SDD antes do código, nunca assumir contexto, código como fonte da verdade, conhecimento só em arquivos do `sdd/`, código limpo e reutilizável, sem comentários desnecessários, sempre atualizar o SDD, deixar o projeto melhor, sem co-autoria nos commits e sem assinatura de IA em PRs.
- `CLAUDE.md` criado com `@AGENTS.md`, para o Claude Code carregar as mesmas regras.
- Aplicada a regra de comentários ao código de hoje: removidos comentários que só descreviam o óbvio em `services/types.ts`, `services/api.ts`, `constants/days.ts` e nos dois painéis. `tsc` segue com os 2 erros do template.
