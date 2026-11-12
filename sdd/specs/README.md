# Specs

Specs descrevem **comportamento observável** com critérios de aceite verificáveis.
As specs deste repo cobrem telas e fluxos do app; o contrato HTTP está em `api:SPEC-000`.

| Spec | Título | Requisitos | Status |
|---|---|---|---|
| [SPEC-001](SPEC-001-autenticacao.md) | Cadastro, login e sessão | RF-01, RF-02, RF-03 | Implementada (sem API) |
| [SPEC-002](SPEC-002-dashboard-aluno.md) | Painel do aluno | RF-04 a RF-10 | Implementada (sem API) |
| [SPEC-003](SPEC-003-dashboard-instrutor.md) | Painel do instrutor | RF-08, RF-11 a RF-14 | Implementada (sem API) |

"Implementada (sem API)": o código existe e passa no `tsc`, mas ainda não foi validado contra a API real (TASK-002).

Modelo: [_template.md](_template.md)
