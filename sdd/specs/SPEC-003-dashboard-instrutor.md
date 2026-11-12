# SPEC-003: Painel do instrutor

- **Status:** Implementada (sem API)
- **Requisitos:** RF-08, RF-11, RF-12, RF-13, RF-14, RNF-06
- **Contrato usado:** api:SPEC-000 §Usuário, §Academias, §Instrutor
- **Arquivos:** `app/views/dashInstrutor.tsx`

## Objetivo
Dar ao instrutor visão dos alunos da academia e das chamadas recebidas.

## Comportamento
Ao abrir: `GET /users/me` (carregamento em tela cheia) e pedido de permissão de localização.
Cabeçalho igual ao do aluno. Não há "treino de hoje" para instrutor.

| Botão | Ação |
|---|---|
| Mudar Academia | igual ao aluno (SPEC-002) |
| Gerenciar Alunos | modal; `GET /instructors/me/students`; busca envia `?search=` ao confirmar no teclado; mostra nome e "Último treino" (dd/mm/aaaa ou "—") |
| Notificações | modal; `GET /notifications`; não lidas em negrito; vazio → "Nenhuma notificação." |
| Meu Perfil | mostra nome, e-mail, especialidade; "Editar Perfil" troca para campos de nome/especialidade; Salvar → `PATCH /users/me` |

Localização: latitude/longitude com 6 casas, ou "Obtendo..."; permissão negada → alerta. Não é enviada à API.

## Critérios de aceite
- **CA-1**: Dado um instrutor com academia, quando abro Gerenciar Alunos, então vejo os alunos retornados pela API.
- **CA-2**: Dado que digito "mar" e confirmo, então a requisição leva `search=mar` e a lista é substituída.
- **CA-3**: Dado um aluno com `last_workout_at: null`, então a linha mostra "Último treino: —".
- **CA-4**: Dado notificações não lidas, então a mensagem aparece em negrito.
- **CA-5**: Dado que edito o perfil com nome vazio, quando salvo, então vejo "O nome não pode ficar vazio.".
- **CA-6**: Dado que apago a especialidade e salvo, então é enviado `specialty: null`.
- **CA-7**: Dado permissão de localização negada, então vejo o alerta e o painel continua usável.

## Fora de escopo
- Tocar no aluno para editar o treino dele (RF-15).
- Marcar notificação como lida (RF-16).
