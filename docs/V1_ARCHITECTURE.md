# Arquitectura v1.0 dos Guias do Utilizador

## Estado

Decisão arquitectural em implementação na branch `feature/v1-single-source-agora`. A `main` mantém a baseline v0.5.0 até todos os gates da v1.0 estarem concluídos.

## Objectivo

Transformar os Guias numa arquitectura *single source*: `content/guides.json` é a única fonte editável de conteúdo funcional/editorial. Web, pesquisa, sitemap, navegação e PDFs são artefactos derivados.

## Decisões

1. **Stack alinhada com dadosgov-fe**: Next.js 16.3, React 19.2, TypeScript 5, `@ama-pt/agora-design-system` 3.7 e Tailwind 3.4.
2. **Ágora atrás de wrappers locais**: os componentes dos Guias não dependem directamente de detalhes internos do Design System. A futura migração para Ágora 4 deve ficar confinada a essa camada.
3. **IDs e slugs persistentes**: títulos podem evoluir sem alterar relações ou URLs. As relações usam IDs, nunca títulos.
4. **Contrato de URLs**: as 118 rotas da v0.5.0 são um contrato de compatibilidade e são verificadas automaticamente.
5. **Static export**: `output: export` e `trailingSlash: true`, compatíveis com GitHub Pages e com as URLs históricas em `index.html`.
6. **Conteúdo sem duplicação**: `data.js`, `data-d01.js`, HTML de conteúdo, pesquisa, sitemap e PDFs deixam de ser fontes manuais. São eliminados ou convertidos em saídas de build antes da release v1.0.
7. **Autoria transversal**: `content/site.json` é a configuração única da marca pessoal e da versão do protótipo.

## Modelo editorial

`content/guides.json` contém:

- `schemaVersion` e `locale`;
- sete temas com `id`, `slug`, título, introdução e `guideIds`;
- quinze guias com `id`, `slug`, `themeId` e `relatedGuideIds`;
- noventa e cinco fichas com `id`, `slug` e `nextRef` tipado.

IDs são estáveis. Slugs são explícitos e preservam as URLs da v0.5.0. `nextRef` substitui relações frágeis por título.

## Pipeline alvo

`guides.json` -> validação Zod -> contrato de rotas -> Web Next estática -> pesquisa -> sitemap -> PDFs -> QA automatizado -> QA manual -> release.

O build deve falhar se houver referências inexistentes, contagens inesperadas, URL removida, duplicação de IDs/slugs ou divergência dos artefactos derivados.

## Ágora Design System

A v1.0 adopta a versão já utilizada pelo frontend do dados.gov.pt em vez de introduzir simultaneamente a major 4 e Tailwind 4. Isto maximiza portabilidade e reduz risco de regressão visual/acessível. Uma migração para Ágora 4 deve ser avaliada em *spike* separado e sincronizada com a evolução do próprio portal.

Usar um componente Ágora não prova conformidade automaticamente. Todos os componentes são validados no contexto real dos Guias, incluindo teclado, foco, semântica, contraste, responsividade e NVDA.

## Gates v1.0

- 15 guias, 95 fichas, 7 temas e 118 rotas;
- 118/118 URLs v0.5 preservadas;
- zero conteúdo editorial duplicado como fonte manual;
- static export reconstruível a partir de clone limpo;
- pesquisa e sitemap derivados;
- 15/15 PDFs derivados da mesma fonte;
- autoria em Web e PDF;
- typecheck e build verdes;
- validação automática de acessibilidade sem violações críticas/sérias;
- teclado e foco nas jornadas críticas;
- NVDA manual;
- validação PDF estrutural e acessível;
- revisão visual a 360, 768 e 1440 px;
- `main` só recebe a v1.0 após os gates acordados.
