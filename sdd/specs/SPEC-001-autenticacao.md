# SPEC-001: Cadastro, login e sessão

- **Status:** Implementada (sem API)
- **Requisitos:** RF-01, RF-02, RF-03, RNF-02, RNF-04
- **Contrato usado:** api:SPEC-000 §Autenticação
- **Arquivos:** `app/(tabs)/index.tsx`, `app/(tabs)/explore.tsx`, `services/api.ts`, `services/authService.ts`

## Objetivo
Permitir criar conta, entrar e manter ou encerrar a sessão com JWT.

## Comportamento
**Cadastro** (aba "Cadastre-se"): nome, e-mail, senha, sexo (`male`/`female`) e tipo (`student`/`instructor`).
O e-mail vai em minúsculas e sem espaços. Durante o envio, o botão fica desabilitado e mostra "Cadastrando...".
Em caso de sucesso: limpa o formulário, mostra alerta e navega para o login.

**Login** (aba "Home"): e-mail e senha. Em caso de sucesso, guarda `access_token` em AsyncStorage (`@fittrack:token`)
e faz `router.replace` para `/views/dashAluno` ou `/views/dashInstrutor` conforme `user.user_type`.

**Sessão**: todo request leva `Authorization: Bearer <token>`. Um `401` em qualquer rota exceto `/auth/login`
apaga o token e volta para `/`. O botão de sair (ícone no topo dos painéis) apaga o token e volta para `/`.

## Critérios de aceite
- **CA-1**: Dado um formulário com campo vazio, quando toco em Cadastrar, então vejo "Preencha todos os campos!" e nenhuma requisição é feita.
- **CA-2**: Dado um e-mail já cadastrado, quando cadastro, então vejo o `detail` retornado pela API (409).
- **CA-3**: Dado um cadastro válido, quando a API responde 201, então volto para o login com alerta de sucesso.
- **CA-4**: Dado credenciais de aluno válidas, quando entro, então vejo o painel do aluno e não consigo voltar ao login pelo gesto de voltar.
- **CA-5**: Dado credenciais inválidas, quando entro, então vejo "E-mail ou senha incorretos" (ou o `detail` da API).
- **CA-6**: Dado um token expirado, quando um painel faz qualquer requisição, então sou levado ao login.
- **CA-7**: Dado que estou logado, quando toco em sair, então volto ao login e o token some do AsyncStorage.
- **CA-8**: Dado que a API está fora do ar, quando entro, então vejo "Não foi possível conectar ao servidor.".

## Fora de escopo
- Entrar automaticamente ao reabrir o app com token válido (hoje sempre começa no login). Candidato a RF futuro.
- Recuperar senha, refresh token.

## Perguntas em aberto
- Abrir direto no painel quando já existe token? (exige `GET /users/me` no boot)
