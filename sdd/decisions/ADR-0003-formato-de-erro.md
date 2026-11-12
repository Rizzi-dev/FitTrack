# ADR-0003: Formato de erro `{ detail }` em PT

- **Status:** Aceita
- **Data:** 2026-11-12
- **Repos afetados:** ambos

## Contexto
O app já foi implementado lendo `detail` (string, ou lista com `msg`), formato do FastAPI.
O back é NestJS, cujo formato padrão é `{ statusCode, message: string | string[], error }`.

## Decisão
O contrato mantém **`{ "detail": "<mensagem em português>" }`** em toda resposta de erro.
O back implementa um **filtro global de exceções** que converte as exceções do Nest (incluindo
erros de validação) para esse formato. Validação inválida responde `422` com a primeira mensagem.

## Alternativas consideradas
- **Usar o formato nativo do Nest e ajustar o front**: menos código no back, mas `message` pode ser string ou lista, o que complica o app, e o contrato já está escrito.

## Consequências
- Back: api:TASK-002 (filtro de exceções + `ValidationPipe`/schema com mensagens em PT).
- Front: nada muda; `getErrorMessage` continua lendo `detail`.
