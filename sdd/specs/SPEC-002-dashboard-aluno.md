# SPEC-002: Painel do aluno

- **Status:** Implementada (sem API)
- **Requisitos:** RF-04 a RF-10, RNF-05, RNF-06
- **Contrato usado:** api:SPEC-000 §Usuário, §Academias, §Treinos, §Chamar instrutor
- **Arquivos:** `app/views/dashAluno.tsx`, `components/PersonalizarTreinoModal.tsx`, `components/TreineSeuJeitoModal.tsx`, `constants/days.ts`

## Objetivo
Mostrar ao aluno o treino do dia e dar acesso às ações do dia a dia.

## Comportamento
Ao abrir: `GET /users/me` e `GET /workouts/me` em paralelo, com indicador de carregamento em tela cheia.
Erro → alerta "Não foi possível carregar seus dados.".

Cabeçalho: "Olá, <nome>", botão sair, "Hoje: <dia PT>", "Academia Selecionada: <nome | Nenhuma>".

Treino de hoje: o `Workout` com `day_of_week == getTodayKey()`; sem treino → "Descanso".

| Botão | Ação |
|---|---|
| Mudar Academia | abre modal, carrega `GET /gyms`; tocar numa academia → `PATCH /users/me {gym_id}` e atualiza o cabeçalho |
| Personalizar Treino | abre modal com o treino de hoje (ou vazio); Salvar → `PUT /workouts/me/{hoje}` e atualiza a lista local |
| Chamar Instrutor | `POST /instructor-calls`; toast de sucesso ou de erro com `detail` |
| Ver Outros Treinos | modal com os treinos ordenados de segunda a domingo; vazio → "Nenhum treino cadastrado." |
| Fazer download | grava `treino_<dia>.json` no cache e abre o menu de compartilhar; sem treino → alerta |
| Treine do seu jeito | modal com descrição + foto da câmera; Salvar → `POST /custom-workouts` (multipart) |

## Critérios de aceite
- **CA-1**: Dado que hoje é segunda e o aluno tem treino `monday`, quando abro o painel, então vejo nome e exercícios desse treino.
- **CA-2**: Dado que hoje não há treino, quando abro o painel, então vejo "Treino de Hoje: Descanso".
- **CA-3**: Dado o aparelho em inglês, quando abro o painel, então o treino do dia continua correto (RNF-05).
- **CA-4**: Dado um dia de descanso, quando abro Personalizar, preencho nome e salvo, então o treino passa a aparecer como treino de hoje.
- **CA-5**: Dado o modal Personalizar com nome vazio, quando salvo, então vejo "Informe o nome do treino." e nada é enviado.
- **CA-6**: Dado exercícios com nome em branco, quando salvo, então eles não são enviados.
- **CA-7**: Dado que escolho outra academia, quando a API confirma, então o cabeçalho mostra a nova academia e o modal fecha.
- **CA-8**: Dado um aluno sem academia, quando chamo o instrutor, então vejo toast de erro com o `detail` da API.
- **CA-9**: Dado o "Treine do seu jeito" sem descrição, quando salvo, então vejo aviso e nada é enviado.
- **CA-10**: Dado descrição + foto, quando salvo, então a requisição é `multipart/form-data` com campos `description` e `image`.

## Fora de escopo
- Editar treino de outros dias além de hoje.
- Ver a lista de "treinos do seu jeito" já enviados.

## Perguntas em aberto
- Permitir editar qualquer dia a partir de "Ver Outros Treinos"?
