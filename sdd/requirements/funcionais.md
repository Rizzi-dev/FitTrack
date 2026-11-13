# Requisitos funcionais

## Conta e sessão

### RF-01: Cadastro
**Perfil:** todos · **Prioridade:** Must
**Descrição:** Como visitante, quero me cadastrar como aluno ou instrutor para usar o app.
**Regras:**
- Campos obrigatórios: nome, e-mail, senha, sexo, tipo de usuário.
- E-mail único (sem diferenciar maiúsculas e minúsculas).
- Após cadastrar, o usuário é levado ao login (não entra automaticamente).
**Specs:** SPEC-001 · api:SPEC-001

### RF-02: Login
**Perfil:** todos · **Prioridade:** Must
**Descrição:** Como usuário cadastrado, quero entrar com e-mail e senha para acessar meu painel.
**Regras:**
- Aluno vai para o painel do aluno; instrutor, para o painel do instrutor.
- Credenciais inválidas mostram "E-mail ou senha incorretos".
**Specs:** SPEC-001 · api:SPEC-001

### RF-03: Sair e sessão expirada
**Perfil:** todos · **Prioridade:** Must
**Descrição:** Como usuário, quero sair do app, e ser levado ao login quando minha sessão expirar.
**Regras:**
- Botão de sair em ambos os painéis.
- Qualquer resposta `401` da API encerra a sessão local.
**Specs:** SPEC-001 · api:SPEC-001

## Aluno

### RF-04: Ver treino do dia
**Perfil:** aluno · **Prioridade:** Must
**Descrição:** Como aluno, quero ver ao abrir o app o treino de hoje com exercícios e séries.
**Regras:** dia sem treino aparece como "Descanso".
**Specs:** SPEC-002 · api:SPEC-003

### RF-05: Ver plano semanal
**Perfil:** aluno · **Prioridade:** Must
**Descrição:** Como aluno, quero ver os treinos de todos os dias da semana.
**Regras:** ordenados de segunda a domingo; dias de descanso não aparecem.
**Specs:** SPEC-002 · api:SPEC-003

### RF-06: Personalizar treino do dia
**Perfil:** aluno · **Prioridade:** Must
**Descrição:** Como aluno, quero editar nome, exercícios e séries do treino de hoje (inclusive criar um em dia de descanso).
**Regras:** nome obrigatório; exercícios sem nome são descartados ao salvar; a alteração persiste na API.
**Specs:** SPEC-002 · api:SPEC-003

### RF-07: Exportar treino do dia
**Perfil:** aluno · **Prioridade:** Could
**Descrição:** Como aluno, quero exportar o treino de hoje como arquivo JSON pelo menu de compartilhamento.
**Specs:** SPEC-002

### RF-08: Escolher academia
**Perfil:** todos · **Prioridade:** Must
**Descrição:** Como usuário, quero escolher a academia em que treino ou trabalho.
**Regras:** uma academia atual por usuário; a lista vem da API.
**Specs:** SPEC-002, SPEC-003 · api:SPEC-002

### RF-09: Chamar instrutor
**Perfil:** aluno · **Prioridade:** Should
**Descrição:** Como aluno, quero chamar um instrutor da minha academia com um toque.
**Regras:** exige academia selecionada; confirma com um aviso na tela (toast).
**Specs:** SPEC-002 · api:SPEC-004

### RF-10: Treine do seu jeito
**Perfil:** aluno · **Prioridade:** Could
**Descrição:** Como aluno, quero enviar a descrição de um treino próprio com foto opcional tirada na câmera.
**Regras:** descrição obrigatória; foto JPEG/PNG até 10 MB.
**Specs:** SPEC-002 · api:SPEC-005

## Instrutor

### RF-11: Listar alunos da academia
**Perfil:** instrutor · **Prioridade:** Must
**Descrição:** Como instrutor, quero ver e buscar por nome os alunos da minha academia, com a data do último treino.
**Specs:** SPEC-003 · api:SPEC-004

### RF-12: Ver notificações
**Perfil:** instrutor · **Prioridade:** Must
**Descrição:** Como instrutor, quero ver minhas notificações (ex.: chamadas de alunos), das mais recentes para as mais antigas.
**Regras:** não lidas aparecem em destaque.
**Specs:** SPEC-003 · api:SPEC-004

### RF-13: Editar perfil
**Perfil:** instrutor · **Prioridade:** Should
**Descrição:** Como instrutor, quero ver e editar meu nome e especialidade.
**Specs:** SPEC-003 · api:SPEC-002

### RF-14: Exibir localização atual
**Perfil:** instrutor · **Prioridade:** Could
**Descrição:** Como instrutor, quero ver minha latitude e longitude atuais no painel.
**Regras:** dado apenas do dispositivo, não enviado à API.
**Specs:** SPEC-003

## Backlog (sem spec ainda)

| ID | Descrição | Perfil |
|---|---|---|
| RF-15 | Instrutor editar o treino de um aluno | instrutor |
| RF-16 | Marcar notificação como lida | instrutor |
| RF-17 | Registrar treino concluído (alimenta "último treino") | aluno |
| RF-18 | Notificação push ao chamar instrutor | instrutor |
