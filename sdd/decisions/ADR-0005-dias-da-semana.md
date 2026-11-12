# ADR-0005: Dias da semana como chave em inglês

- **Status:** Aceita
- **Data:** 2026-11-12
- **Repos afetados:** ambos

## Contexto
O app buscava o treino com `toLocaleDateString('pt-BR', { weekday: 'long' })` ("segunda-feira"),
o que depende do idioma e do suporte a `Intl` do aparelho e falha em alguns Androids.

## Decisão
O dia é identificado pela chave `monday` … `sunday` em todo o sistema (API e app). O app
calcula o dia de hoje com `Date.getDay()` e só converte para rótulo PT na exibição (`constants/days.ts`).

## Consequências
- O enum `day_of_week` do back usa exatamente essas 7 strings.
- Fuso horário: o "hoje" é o do aparelho. Se um dia a API precisar saber o "hoje" do aluno, isso vira um novo ADR.
