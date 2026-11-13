# TASK-002: Validar specs contra a API real

- **Status:** Bloqueada
- **Origem:** SPEC-001, SPEC-002, SPEC-003
- **Depende de:** api:TASK-003 a api:TASK-009 (endpoints + seed)
- **Estimativa:** M

## Objetivo
Rodar o app contra o `fittrack-api` local e conferir cada critério de aceite.

## Passos
- [ ] Subir a API com seed (`api:TASK-009`)
- [ ] `cp .env.example .env` e ajustar a URL para a plataforma usada
- [ ] Percorrer SPEC-001 CA-1..8, SPEC-002 CA-1..10, SPEC-003 CA-1..7 em iOS ou Android
- [ ] Registrar divergências como tasks novas (front ou back)
- [ ] Atualizar status das specs para `Implementada`

## Definição de pronto
- [ ] Todos os CAs passam ou têm task aberta
- [ ] Log em `sdd/logs/`
