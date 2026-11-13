# Relação entre os repositórios

```
PERSONAL/
├── FitTrack/                      ← este repo (front)
│   └── sdd/
└── fittrack-api/
    └── fittrack-api/              ← repo do back (atenção: pasta dupla)
        └── sdd/
```

## Quem é dono do quê

| Artefato | Dono | O outro repo... |
|---|---|---|
| Requisitos de produto (`RF`) | **front**: `sdd/requirements/` | referencia pelos IDs |
| Contrato HTTP (rotas, payloads, erros) | **back**: `sdd/specs/SPEC-000-contrato-api.md` | espelha os tipos em `services/types.ts` |
| Specs de tela | front | n/a |
| Specs de endpoint / regras de negócio | back | n/a |
| Requisitos não funcionais | cada repo os seus | n/a |
| ADRs que afetam os dois | escritos **nos dois** com o mesmo número e título | n/a |

## Regras de sincronização

1. Mudança de contrato começa no back (`SPEC-000`), entra como task nos dois repos e só é implementada no front depois de aprovada.
2. `services/types.ts` (front) precisa bater campo a campo com os modelos do `SPEC-000`.
3. Ao concluir uma task que mexe nos dois repos, registre o log nos dois e cite a task do outro lado (`api:TASK-005`).
4. Front e back usam o mesmo vocabulário: veja [glossario.md](glossario.md).

## Ambiente local

| Serviço | URL |
|---|---|
| API (Nest) | `http://127.0.0.1:3000` |
| Metro / Expo web | `http://localhost:8081` (precisa estar liberado no CORS da API) |
| Emulador Android → API | `http://10.0.2.2:3000` |
