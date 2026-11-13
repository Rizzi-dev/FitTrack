# SDD: FitTrack (front-end mobile)

Este repo segue **Spec-Driven Development**: nenhuma mudança de comportamento entra no código
sem antes existir um requisito, uma spec aprovada e uma task que aponte para ela.

O FitTrack tem dois repositórios que trabalham juntos:

| Repo | Caminho local | Papel | É dono de |
|---|---|---|---|
| **FitTrack** (este) | `PERSONAL/FitTrack` | App mobile Expo / React Native | Requisitos de produto, specs de tela |
| **fittrack-api** | `PERSONAL/fittrack-api/fittrack-api` | API NestJS | **Contrato da API**, specs de endpoint |

Veja [context/cross-repo.md](context/cross-repo.md) e [decisions/ADR-0001-sdd-entre-repos.md](decisions/ADR-0001-sdd-entre-repos.md).

> **Regras obrigatórias** para agentes e devs (ler SDD antes do código, código como fonte da verdade, sem comentários excessivos, sem co-autoria/assinatura de IA etc.) estão no `AGENTS.md` da raiz.

## Fluxo

```
requirements  →  specs  →  tasks  →  código + testes  →  logs
   (o quê)       (como     (passos     (implementação)    (o que
                 se comporta) pequenos)                    aconteceu)

decisions: registra escolhas que afetam mais de uma spec (ADRs)
context:   o que é preciso saber antes de mexer em qualquer coisa
memory:    fatos e armadilhas aprendidos durante o trabalho (para humanos e agentes)
prompts:   prompts reutilizáveis para conduzir cada etapa com um agente de IA
```

1. **Requisito**: descreva a necessidade em [requirements/](requirements/) (`RF-xx` funcional, `RNF-xx` não funcional).
2. **Spec**: escreva ou atualize uma spec em [specs/](specs/) ligada aos requisitos, com critérios de aceite verificáveis. Status `Rascunho` → `Aprovada`.
3. **Mudou a API?** Atualize **primeiro** o contrato no repo do back (`sdd/specs/SPEC-000-contrato-api.md`) e só depois a spec de tela daqui.
4. **Tasks**: quebre a spec em tasks em [tasks/](tasks/) (uma task = um PR pequeno).
5. **Implementação**: código e testes seguindo a task. Ao terminar, marque a task como `Concluída`.
6. **Log**: registre a sessão em [logs/](logs/) (`AAAA-MM-DD-assunto.md`).
7. **Decisão nova?** Crie um ADR em [decisions/](decisions/). **Aprendeu algo não óbvio?** Anote em [memory/](memory/).

## Convenções de identificadores

| Prefixo | Onde | Exemplo |
|---|---|---|
| `RF-xx` / `RNF-xx` | requirements | `RF-04` |
| `SPEC-xxx` | specs | `SPEC-002-dashboard-aluno.md` |
| `TASK-xxx` | tasks | `TASK-003-secure-store.md` |
| `ADR-xxxx` | decisions | `ADR-0002-camada-api.md` |

IDs do back são citados com o prefixo do repo: `api:SPEC-003`, `api:TASK-005`.

## Status

- Specs: `Rascunho` · `Aprovada` · `Implementada` · `Obsoleta`
- Tasks: `A fazer` · `Em andamento` · `Bloqueada` · `Concluída`
- ADRs: `Proposta` · `Aceita` · `Substituída por ADR-xxxx`
