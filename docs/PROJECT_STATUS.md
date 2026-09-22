# Estado do projecto: Guias do Utilizador do dados.gov.pt

Última actualização validada: 22/09/2026

## 1. Objectivo deste ficheiro

Este documento é o ponto de continuidade operacional do projecto dos Guias do Utilizador do dados.gov.pt.

Deve permitir retomar o trabalho sem depender do histórico de uma conversa, distinguindo sempre requisito, implementação, decisão, assunção e questão por confirmar.

A actualização deste ficheiro não substitui Jira, Figma, requisitos aprovados, documentação funcional ou evidência de implementação.

## 2. Estado resumido

| Item | Estado validado |
| --- | --- |
| Repositório | `Timmarcelino/Guias_dados.gov.pt` |
| Branch estável | `main` |
| Baseline estável | v0.4 |
| Commit da baseline | `58c65e205c38ad810e122a57f2dff4b612aa39dd` |
| Branch activa de evolução | `feature/static-routes-pdf` |
| Relação com `main` | Confirmar no início de cada retoma; a branch activa deriva integralmente da baseline v0.4 |
| Guias | 15 |
| Fichas na baseline estável v0.4 | 91 |
| Fichas na branch activa | 92 |
| Temas funcionais | 7 |
| Publicação oficial no dados.gov.pt | Não confirmada |
| Estado funcional do conteúdo | Em revisão funcional, editorial e UX/UI |

Regra: a baseline estável v0.4 mantém 91 fichas. A branch activa evolui para 92 fichas após a validação da 6.ª ficha de D14, “Reportar um problema técnico”.

## 3. Branch activa

### Implementação

O trabalho corrente encontra-se em:

`feature/static-routes-pdf`

Esta branch parte integralmente da baseline v0.4 e contém evolução posterior ainda não integrada em `main`.

### Alterações já existentes na branch

A comparação com `main` evidencia, entre outros:

* rotas estáticas em `Guias-do-utilizador/`;
* páginas próprias para temas, guias e tarefas;
* índice de pesquisa em `assets/js/search-index.json`;
* lógica de pesquisa em `assets/js/search.js`;
* PDFs dos 15 guias em `assets/pdf/`;
* `sitemap.xml`;
* `404.html`;
* `.nojekyll`;
* evolução do `index.html`.

Por confirmar: comportamento completo, acessibilidade, qualidade editorial e prontidão destas alterações para integração em `main`.

### Defeitos técnicos web fechados em 22/09/2026

* Corrigido o título duplicado da entrada principal para `Guias do utilizador | dados.gov.pt`.
* A página 404 passou a ter estrutura semântica, viewport responsivo, skip link, foco no conteúdo, navegação de retorno e `noindex`.
* Por confirmar: o processo que gera rotas estáticas e PDFs não está versionado no repositório. Deve ser incorporado antes de nova regeneração para evitar reintrodução de defeitos já corrigidos.

### Actualização de D14 em 22/09/2026

A revisão histórica confirmou que a 6.ª ficha de D14, `Reportar um problema técnico`, já tinha sido analisada e estava encaminhada para integração.

A reserva operacional principal estava associada ao formulário Ajuda e contactos e ao reCAPTCHA em PPR/PRD. O LEDG-2475 foi concluído e existe evidência posterior de submissão com sucesso em PPR.

Decisão: D14 passa a seis fichas na branch activa. A ficha foi reposta nas rotas estáticas, pesquisa e sitemap e integrada em `assets/js/data.js` para eliminar a divergência entre fonte editorial e artefactos gerados.

A ficha não deve prometer confirmação automática por email enquanto o LEDG-2029 não estiver implementado.

## 4. Baseline v0.4

### Implementação confirmada

A v0.4 disponibiliza:

* 15 guias;
* 91 fichas;
* 7 temas funcionais;
* pesquisa transversal;
* navegação Tema → Guia → Tarefa;
* relações entre guias;
* header e footer aproximados à implementação pública do dados.gov.pt;
* estrutura modular em HTML, CSS e JavaScript;
* versões v0.1, v0.2, v0.3 e v0.4 preservadas;
* revisão editorial específica de D01, Autenticação e acesso à conta;
* revisão editorial específica de D14, Ajuda e contactos.

### Decisão editorial

A experiência deve ser orientada pela necessidade do utilizador e não pela arquitectura interna do portal.

O percurso principal mantém-se:

**Tema → Guia → Tarefa**

As fichas devem ser curtas, auto-explicativas e orientadas à execução da tarefa.

Quando fizer sentido podem incluir:

* passos;
* exemplos;
* dicas e alertas;
* imagens;
* vídeos;
* tabelas de apoio;
* ligação para a tarefa seguinte ou conteúdos relacionados.

## 5. Taxonomia actual

Os sete temas funcionais são:

1. Encontrar, consultar e explorar dados
2. Publicar e gerir dados
3. Qualidade e modelos de dados
4. Organizações
5. APIs, reutilizações e automatização
6. Acesso, perfil e participação
7. Ajuda e contactos

### Decisão

Ajuda e contactos permanece como tema próprio para permitir que um utilizador encontre apoio sem ter de identificar previamente a área funcional do problema.

## 6. Decisões de conteúdo já assumidas

### Decisão

Os identificadores internos dos guias, como D03, não devem ser apresentados como nomenclatura pública ao utilizador.

### Decisão

Quando relevante, podem ser usadas indicações pequenas de perfil ou permissão, por exemplo:

* Utilizador autenticado
* Editor
* Administrador da Organização
* Administrador

Estas indicações não substituem a validação das permissões reais suportadas pela fonte funcional aplicável.

### Decisão

O conteúdo do manual deve traduzir a complexidade funcional para linguagem prática sem inventar regras.

### Regra

Quando uma fonte descrever comportamento futuro, esse comportamento não deve ser apresentado como funcionalidade actual sem evidência de implementação aplicável.

## 7. D03: orientação editorial

### Decisão de estrutura simplificada

Para o conteúdo de descoberta e consulta de dados, a estrutura editorial proposta é:

1. Encontrar dados
2. Pesquisar e filtrar
3. Consultar um Conjunto de Dados
4. Aceder aos dados
5. Não encontrou o que procura?

Cada ficha deve privilegiar:

* 3 a 5 passos principais;
* exemplo concreto;
* imagem ou vídeo quando acrescentar valor;
* ligação para a próxima ficha quando existir continuidade natural.

Por confirmar: revisão funcional final de cada ficha e eventual ajuste de nomenclatura pública.

## 8. Estado de publicação

### Implementação

O repositório contém um protótipo funcional e editorial suficientemente estruturado para demonstração e revisão.

### Por confirmar

Não existe, até à validação de 22/09/2026, evidência confirmada de publicação oficial da nova experiência de 15 guias no portal dados.gov.pt.

Também não foi identificada na baseline estável uma configuração de deployment oficial que, por si só, prove publicação em produção.

### Jira

Itens directamente associados ao tema dos Guias:

* `LEDG-2423`: Guias de utilizador/Kit de onboarding de entidades. Estado validado: Backlog.
* `LEDG-64`: Inclusão dos Guias e Tutoriais do Dados.gov. Estado validado: Backlog.

Estes estados não substituem eventual decisão de produto registada noutro artefacto.

## 9. Critérios antes de publicação oficial

Antes de tratar qualquer conteúdo como guia oficial, validar quando aplicável:

* requisito e regra funcional;
* actor e perfil;
* permissões;
* estados e transições;
* validações;
* mensagens relevantes;
* rotas;
* terminologia da interface;
* dados e metadados;
* comportamento nos ambientes aplicáveis;
* acessibilidade no contexto real;
* responsividade;
* alinhamento com Figma aprovado;
* alinhamento com Ágora Design System;
* rastreabilidade das decisões relevantes.

Acessibilidade: usar WCAG 2.2 nível AA como alvo, salvo requisito aplicável diferente.

## 10. Riscos e pontos de atenção

### Risco

Uma instrução do guia pode ficar desactualizada quando o comportamento do portal mudar.

Mitigação: manter rastreabilidade com requisitos, Jira, Figma e evidência de implementação.

### Risco

O protótipo pode aparentar maior maturidade visual do que a maturidade funcional real do conteúdo.

Mitigação: não considerar aparência como aprovação funcional.

### Risco

Conteúdo ainda não validado pode ser confundido com comportamento actual.

Mitigação: quando não existir regra funcional confirmada, usar exclusivamente o comportamento observado e reproduzível em PRD, identificado como Implementação actual. Não antecipar backlog, Figma futuro ou comportamento esperado.

### Risco

Branches antigas podem ser confundidas com a linha actual de evolução.

Mitigação: considerar `main` como baseline estável e `feature/static-routes-pdf` como branch activa até nova decisão registada.

## 11. Estado da validação de conteúdo

A matriz detalhada encontra-se em `docs/CONTENT_VALIDATION.md`.

Estado da primeira passagem em 22/09/2026:

* Validado no âmbito actual: D01, D03 e D14.
* Parcialmente validado: D02, D04, D05, D08, D09, D10, D11, D12 e D13.
* Por confirmar em PRD para publicação como comportamento actual: D06, D07 e CM.
* Sem base funcional suficiente: nenhum guia.

PDFs: 15/15 validados quanto a integridade e completude editorial da geração v2. Qualidade visual página a página e acessibilidade documental permanecem Por confirmar.

Prioridade de revisão profunda: D11. D04, D05, D06, D07, D08, D10 e CM receberam revisão profunda em 22/09/2026. D06, D07 e CM permanecem Por confirmar em PRD; D08 e D10 permanecem parcialmente validados com componentes públicas confirmadas em PRD.

## 12. Próximos passos recomendados

1. Rever a implementação existente em `feature/static-routes-pdf`.
2. Validar rotas estáticas, pesquisa, PDFs, sitemap e página 404.
3. Rever os 15 guias e classificar cada um como validado, parcialmente validado ou por validar. Primeira passagem concluída em `docs/CONTENT_VALIDATION.md`; revisões profundas concluídas para D04, D05, D06, D07, D08, D10 e CM.
4. Fechar nomenclatura e arquitectura de informação.
5. Executar revisão funcional e editorial das fichas prioritárias.
6. Validar acessibilidade e responsividade.
7. Confirmar modelo de publicação e integração no produto.
8. Preparar critérios objectivos para merge da branch em `main`.
9. Só após validação, preparar a versão candidata a publicação oficial.

## 13. Protocolo de continuidade

Sempre que o trabalho for retomado:

1. Ler este ficheiro.
2. Confirmar a branch activa no GitHub.
3. Comparar a branch activa com `main`.
4. Verificar alterações no Jira relacionadas com Guias.
5. Actualizar este documento apenas quando existir nova evidência ou decisão.
6. Não substituir uma decisão validada por inferência de implementação.
7. Não usar Assunção para preencher lacunas de comportamento do portal. Quando não houver regra confirmada, consultar PRD e registar apenas o comportamento observado como Implementação actual.
8. Usar `Por confirmar` quando PRD não puder ser observado ou a evidência não for suficiente.

## 14. Função de controlo de continuidade

O projecto pode usar uma função de “Secretário do projecto” no processo de análise.

Responsabilidades:

* conferir se decisões recentes estão reflectidas neste documento;
* detectar contradições entre conversas, GitHub, Jira e documentação;
* identificar informação desactualizada;
* preservar distinção entre requisito, implementação, recomendação, assunção e questão em aberto;
* sinalizar itens que necessitam de nova validação.

Esta função é um mecanismo de revisão. O presente ficheiro versionado continua a ser o ponto de continuidade operacional.
