# ADR-0004: API na porta 3000; URL do app via env

- **Status:** Aceita
- **Data:** 2026-11-12
- **Repos afetados:** ambos

## Contexto
O app usava `http://127.0.0.1:8000` por padrão (suposição de FastAPI). O Nest sobe na `3000`
(`process.env.PORT ?? 3000`).

## Decisão
A API usa a porta padrão do Nest (`3000`, configurável por `PORT`). O app usa
`EXPO_PUBLIC_API_URL`, com padrão `http://127.0.0.1:3000`.

## Consequências
- `services/api.ts` e `.env.example` do front atualizados para 3000.
- Emulador Android: `http://10.0.2.2:3000`; celular físico: IP da máquina, com a API escutando em `0.0.0.0`.
