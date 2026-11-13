# Requisitos

Este repo é o **dono dos requisitos de produto** do FitTrack ([ADR-0001](../decisions/ADR-0001-sdd-entre-repos.md)).
O repo `fittrack-api` referencia estes IDs e mantém apenas os requisitos não funcionais da API.

- [funcionais.md](funcionais.md): `RF-xx`, o que o produto faz
- [nao-funcionais.md](nao-funcionais.md): `RNF-xx`, como o app deve se comportar (qualidade, plataforma)

## Como escrever um requisito

```
### RF-xx: Título curto
**Perfil:** aluno | instrutor | todos
**Prioridade:** Must | Should | Could
**Descrição:** Como <perfil>, quero <ação> para <benefício>.
**Regras:** lista de regras de negócio verificáveis
**Specs:** SPEC-xxx (front), api:SPEC-xxx (back)
```

Requisitos não se apagam: quando caem, recebem `**Status:** Removido em AAAA-MM-DD (motivo)`.
