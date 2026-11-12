# TASK-005: Zerar erros do `tsc`

- **Status:** A fazer
- **Origem:** RNF-08
- **Estimativa:** P

## Objetivo
Deixar `npx tsc --noEmit` com zero erros para poder rodar no CI.

## Erros atuais (2026-11-12)
- `components/ExternalLink.tsx(13,7)`: `href: string` incompatível com typed routes (pode sumir com a TASK-004)
- `components/ui/IconSymbol.tsx(42,72)`: `StyleProp<ViewStyle>` vs `TextStyle`

## Definição de pronto
- [ ] `npx tsc --noEmit` sai com código 0
- [ ] Script `"typecheck": "tsc --noEmit"` no `package.json`
