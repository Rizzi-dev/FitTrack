# TASK-004: Remover restos do template Expo

- **Status:** A fazer
- **Estimativa:** P

## Objetivo
Tirar o código e os arquivos do `create-expo-app` que o produto não usa.

## Passos
- [ ] Avaliar e remover: `components/HelloWave.tsx`, `Collapsible.tsx`, `ExternalLink.tsx`, imagens `react-logo*`, `partial-react-logo.png`, `scripts/reset-project.js` e o script `reset-project`
- [ ] Manter `ParallaxScrollView`, `ThemedText`, `ThemedView`, `HapticTab`, `IconSymbol`, `TabBarBackground` (usados)
- [ ] Atualizar o snapshot de `ThemedText-test` se necessário
- [ ] Remover a permissão Android `WRITE/READ_EXTERNAL_STORAGE` do `app.json` (não é mais usada)

## Definição de pronto
- [ ] App abre nas 3 plataformas; `tsc` sem erros novos
