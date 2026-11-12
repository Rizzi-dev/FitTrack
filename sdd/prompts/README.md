# Prompts

Prompts reutilizáveis para conduzir cada etapa do SDD com um agente de IA (Claude Code etc.).
Copie, troque os `<placeholders>` e cole. Todos assumem que o agente vai ler `sdd/` antes de agir.

| Prompt | Quando usar |
|---|---|
| [00-carregar-contexto.md](00-carregar-contexto.md) | Início de qualquer sessão |
| [01-novo-requisito.md](01-novo-requisito.md) | Ideia nova → requisito |
| [02-escrever-spec.md](02-escrever-spec.md) | Requisito → spec com critérios de aceite |
| [03-quebrar-em-tasks.md](03-quebrar-em-tasks.md) | Spec aprovada → tasks |
| [04-implementar-task.md](04-implementar-task.md) | Executar uma task |
| [05-revisar-contra-spec.md](05-revisar-contra-spec.md) | Revisar código/PR contra a spec |
| [06-fechar-sessao.md](06-fechar-sessao.md) | Fim da sessão: log + memória |
| [07-mudanca-de-contrato.md](07-mudanca-de-contrato.md) | Algo precisa mudar na API |
