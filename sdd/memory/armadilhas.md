# Armadilhas conhecidas

- **`App.tsx` não é usado.** O entry é `expo-router/entry`; providers globais vão em `app/_layout.tsx`.
- **`toLocaleDateString(..., { weekday })` varia por idioma e por suporte a `Intl`.** Use `Date.getDay()`.
- **`127.0.0.1` no emulador Android aponta para o próprio emulador.** Use `10.0.2.2`; em aparelho físico, o IP da máquina.
- **`EXPO_PUBLIC_*` é lido em tempo de build do bundle.** Mudou o `.env`? Reinicie o `expo start` (às vezes com `-c`).
- **`ImagePicker.MediaTypeOptions` está descontinuado** no SDK 52; use `mediaTypes: ['images']`.
- **FormData no React Native** aceita `{ uri, name, type }` como arquivo; não defina `boundary` manualmente.
- **`.npmrc` força o registry público**, porque o `~/.npmrc` global aponta para um registry privado da empresa.
- **O back fica em `fittrack-api/fittrack-api`** (pasta dupla).
