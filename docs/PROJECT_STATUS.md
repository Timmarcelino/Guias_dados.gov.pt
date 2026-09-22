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
* Parcialmente validado: D02, D04, D05, D08, D09, D10, D12 e D13.
* Por confirmar em PRD para publicação como comportamento actual: D06, D07, D11 e CM.
* Sem base funcional suficiente: nenhum guia.

PDFs: 15/15 validados quanto a integridade e completude editorial da geração v2. Qualidade visual página a página e acessibilidade documental permanecem Por confirmar.

Revisão profunda: concluída para D02, D04, D05, D06, D07, D08, D09, D10, D11, D12, D13 e CM em 22/09/2026. D01, D03 e D14 já se encontravam validados no âmbito actual. D06, D07, D11 e CM permanecem Por confirmar em PRD; os restantes itens parciais têm testes PRD mínimos identificados.

## 12. Próximos passos recomendados

1. Rever a implementação existente em `feature/static-routes-pdf`.
2. Validar rotas estáticas, pesquisa, PDFs, sitemap e página 404.
3. Rever os 15 guias e classificar cada um como validado, parcialmente validado ou por validar. Primeira passagem e revisões profundas concluídas em `docs/CONTENT_VALIDATION.md`.
4. Executar os testes PRD autenticados mínimos registados por guia.
5. Corrigir primeiro as divergências editoriais objectivas de D04, D11, D13 e D09 e sincronizar todos os artefactos derivados.
6. Fechar nomenclatura e arquitectura de informação.
7. Validar acessibilidade e responsividade.
8. Confirmar modelo de publicação e integração no produto.
9. Preparar critérios objectivos para merge da branch em `main`.
10. Só após validação, preparar a versão candidata a publicação oficial.

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

## Ponto de controlo operacional 22/09/2026 15:56 Europe/Lisbon

Secretário do projecto: progresso registado antes da nova ronda de testes PRD autenticados.

Estado confirmado:

* revisão profunda concluída para as 15 áreas;
* D01, D03 e D14 validados no âmbito actual;
* D02, D04, D05, D08, D09, D10, D12 e D13 parcialmente validados;
* D06 não integrado no Frontoffice público de PRD; D07 e CM não observáveis no stack público actual de PRD; D11 confirmado como conteúdo alvo ainda não alinhado com PRD actual;
* fonte editorial permanente em `content/guides.json`;
* gerador PDF permanente em `scripts/generate_pdf_guides.py`;
* workflow PDF permanente validado com sucesso;
* correcções editoriais PRD já aplicadas a D04, D09 e D13;
* próximo objectivo: executar apenas os testes PRD autenticados mínimos já identificados, começando por D04/D05, e actualizar a matriz apenas com evidência observada.

Regra de continuidade: quando não existir regra funcional confirmada, documentar exclusivamente o comportamento reproduzível em PRD como Implementação actual. Não antecipar backlog, Figma futuro ou comportamento esperado.

## QA web estrutural 22/09/2026

Ronda executada sobre a publicação GitHub Pages da branch `feature/static-routes-pdf`.

### Evidência

* 115 URLs do sitemap verificadas;
* 115/115 responderam HTTP 200;
* 134 ligações internas únicas verificadas;
* 0 ligações internas quebradas;
* `lang="pt-PT"`, `main`, um `h1` e skip link presentes nas 115 páginas;
* nenhum `id` duplicado detectado;
* nenhuma imagem sem `alt` detectada pelo crawler estrutural;
* nenhum botão sem nome acessível detectado;
* nenhum campo de formulário sem associação de label detectado;
* nenhum salto de heading detectado no conteúdo principal;
* canonicals presentes e únicos na ronda;
* resíduos editoriais de D13 detectados em 3 páginas e corrigidos no commit `b96ba58`;
* pesquisa dinâmica passou a anunciar resultados com `role="status"` e `aria-live="polite"` no commit `8d8b684`;
* título duplicado entre tema e guia `Ajuda e contactos` corrigido no commit `e943752`.

### Nota sobre `aria-current`

O crawler encontrou duas ocorrências de `aria-current="page"` na maioria das páginas. A revisão confirmou que pertencem a contextos de navegação distintos, breadcrumb e navegação lateral. Não é tratado como defeito.

### Próxima frente

Validar responsividade e navegação por teclado nos breakpoints de referência 360, 768 e 1440, incluindo header, menu, pesquisa, sidebar/select, breadcrumbs, cards, navegação entre fichas e 404.


## QA web interactivo e responsivo 22/09/2026

Ronda executada com Edge headless/Puppeteer sobre o GitHub Pages publicado.

### Responsividade e reflow

Páginas representativas testadas a 320, 360, 768 e 1440 px:

* página inicial dos Guias;
* página de tema;
* página de guia;
* ficha de tarefa.

Resultado:

* 0 overflow horizontal;
* 0 alvos interactivos testados abaixo de 24 × 24 px;
* menu mobile abre com `aria-expanded=true`;
* navegação principal fica visível após abrir o menu;
* dropdown Recursos abre e actualiza `aria-expanded`.

### Teclado e foco

Sequência de Tab validada em 360 e 1440 px.

Resultado:

* skip link é o primeiro elemento focável;
* foco visível detectado com contorno sólido de 3 px;
* pesquisa, menu, select, breadcrumbs, cards e navegação principal entram na sequência de teclado.

Defeito detectado e corrigido:

* em mobile, Pesquisa e Autenticar perdiam o nome acessível porque o texto era removido com `display:none`;
* corrigido no commit `d7f5672` com ocultação apenas visual;
* árvore de acessibilidade revalidada: 0 controlos sem nome; Pesquisa e Autenticar expostos correctamente.

### Pesquisa

Pesquisa real validada com `?q=dados`:

* H1 alterado para Resultados da pesquisa;
* 56 resultados devolvidos no cenário testado;
* título da página actualizado;
* `role="status"` e `aria-live="polite"` confirmados com cache desactivada;
* correcção implementada no commit `8d8b684`.

### Contraste, tabelas e links

* 0 falhas automáticas de contraste AA nas páginas representativas analisadas;
* 3 tabelas detectadas, todas com `th` e `scope`;
* 0 links genéricos do tipo Clique aqui, Aqui, Ver mais ou Saber mais;
* links de logótipo sem texto visível mantêm nome acessível através de `aria-label` e `alt`.

### Navegação e 404

* select lateral navega para o guia seleccionado;
* 404 personalizada devolve HTTP 404;
* 404 contém `noindex`, skip link, `main#conteudo`, H1 e título coerente.

Conclusão desta ronda: não ficaram defeitos web técnicos conhecidos em aberto no âmbito dos checks automatizados executados. Permanecem por fazer validação manual/NVDA no contexto final e validação visual detalhada dos PDFs.


## Validação directa dos PDFs publicados 22/09/2026

Remote Desktop Commander utilizado para ler os 15 PDFs directamente da publicação GitHub Pages.

Resultado consolidado:

* 15/15 PDFs acessíveis;
* contagens de páginas coerentes;
* 92/92 fichas presentes;
* sequência de tarefas completa em cada guia;
* Visão geral e fecho presentes nos 15;
* D14 confirmado com 6 fichas;
* correcções editoriais D04/D09/D13 reflectidas nos PDFs;
* 0 ocorrências de `undefined`;
* QA do workflow PDF já tinha confirmado 15/15 ficheiros válidos e sem omissões editoriais.

Limitação mantida:

* inspecção visual pixel a pixel não executada nesta sessão;
* estrutura interna de acessibilidade PDF não pôde ser validada, porque o Edge expõe o documento apenas como `EmbeddedObject`;
* estas verificações ficam Por confirmar antes da publicação oficial.

Estado da frente PDF: **conteúdo e integridade estrutural validados; acessibilidade documental e revisão visual final Por confirmar**.


## Guardrail automático de consistência 22/09/2026

Foi criado o validador `scripts/validate_guides_consistency.py` e o workflow `.github/workflows/guides-consistency.yml`.

A validação passa a falhar automaticamente quando existir, entre outros:

* contagem diferente de 15 guias ou 92 fichas;
* rota estática em falta;
* pesquisa fora de sincronização;
* sitemap divergente de 115 URLs;
* canonical incorrecto;
* title duplicado nas rotas;
* mais ou menos de um `main` ou `h1`;
* ausência de `lang="pt-PT"`, skip link ou `id="conteudo"`;
* imagem sem `alt`;
* IDs duplicados;
* reaparecimento das formulações obsoletas corrigidas em D04, D09 e D13;
* divergência estrutural entre `content/guides.json`, `assets/js/data.js` e o módulo `data-d01.js`;
* remoção da semântica de status acessível da pesquisa;
* perda dos elementos essenciais da página 404.

A rota histórica de D13 `Consultar-um-perfil-publico` é preservada explicitamente para evitar quebra de URLs apesar do novo título editorial.

Execuções:

* primeira execução detectou um falso positivo causado pela modularização intencional de D01;
* validador ajustado para a arquitectura real;
* execução subsequente passou;
* execução final após inclusão de `data-d01.js` nos triggers do CI passou com sucesso.

Estado: **guardrail activo e verde**.


## Plano mínimo de testes PRD autenticados

Criado `docs/PRD_TEST_PLAN.md` no commit `63304df`.

O plano separa:

* **Fase A, leitura/não destrutiva:** 10 Test Cases para validar áreas autenticadas sem alterar dados;
* **Fase B, escrita controlada:** 7 Test Cases preparados, mas bloqueados até autorização explícita adicional de escrita em PRD.

Áreas cobertas:

* D02 e D13, perfil/organizações;
* D04, ciclo de vida e transferência;
* D05, recursos;
* D08, APIs;
* D09, Reutilizações;
* D10, Harvester;
* D12, Discussões;
* D07 e CM, Validador/Catálogo;
* D11, Seguir/Notificações;
* D06, Explorador após integração.

Critério: o Manual descreve PRD como Implementação actual quando houver divergência com backlog, requisito alvo ou documentação futura.


## Prontidão para integração e publicação

Estado verificado em 22/09/2026.

### Branch candidata

* branch: `feature/static-routes-pdf`;
* relação com `main`: 58 commits à frente, 0 atrás no momento da verificação;
* GitHub Pages do commit `d1522a8`: sucesso;
* CI de consistência: verde;
* workflow de geração PDF: verde na última execução aplicável;
* 15 guias, 92 fichas, 115 URLs e 15 PDFs controlados.

### Bloqueios antes de candidatura a merge

A branch **não deve ser tratada ainda como candidata final a merge** enquanto permanecerem:

1. Test Cases PRD autenticados da Fase A ainda não executados nas áreas aplicáveis;
2. D06 não integrado no Frontoffice PRD; D07 e CM não observáveis no stack público actual de PRD; D11 ainda expõe Favoritos em PRD e não a evolução Seguir;
3. resultados dos testes PRD ainda não reflectidos, quando necessário, em `content/guides.json`;
4. validação manual com NVDA no contexto final ainda pendente;
5. revisão visual final e acessibilidade documental dos PDFs ainda Por confirmar.

### Bloqueios adicionais antes de publicação oficial

Mesmo após eventual merge, a publicação oficial exige ainda:

1. confirmar o destino definitivo de publicação e integração no produto;
2. substituir/parametrizar os canonicals e caminhos actualmente orientados ao GitHub Pages quando o destino oficial for conhecido;
3. confirmar nomenclatura e arquitectura de informação finais;
4. executar os testes de escrita da Fase B apenas quando forem indispensáveis e após autorização explícita;
5. confirmar que não existem divergências funcionais novas entre PRD e o Manual no momento da publicação.

### Decisão operacional

Continuar a usar a branch actual como ambiente candidato de revisão.

Não abrir PR, não fazer merge em `main` e não publicar oficialmente enquanto os bloqueios acima não forem tratados ou formalmente aceites.


## Sincronização documental corrente 22/09/2026

Após a validação técnica e funcional, foi corrigida a documentação corrente:

* `README.md` actualizado para 15 guias e 92 fichas;
* estrutura técnica actualizada para incluir fonte editorial, rotas, PDFs, scripts, workflows e documentação viva;
* D14 actualizado para seis fichas;
* `CHANGELOG.md` recebeu a secção **Em desenvolvimento · 22/09/2026**, preservando a v0.4 histórica de 15/09;
* pesquisa no repositório não encontrou referências correntes a `91 fichas` fora do histórico preservado.

Commits:

* `97671ae`, README;
* `76072ca`, CHANGELOG.

Estado: documentação corrente alinhada com 15 guias, 92 fichas, 115 rotas e 15 PDFs.


## Actualização D06, Explorador de dados

Evidência adicional recolhida em 22/09/2026:

* o frontend actual contém o bloco **Explore os dados**, mas oculto com `className="hidden"`;
* não foi encontrada rota pública autónoma do Explorador no frontend;
* num recurso CSV real de PRD, `ipvc-estudantes.csv`, não foi exposto CTA **Explore os dados** no comportamento público observado;
* não existe percurso público reproduzível confirmado para abrir o novo Explorador a partir do recurso testado.

Conclusão operacional: D06 deixa de estar apenas **Por confirmar** e passa a **Não integrado no Frontoffice público de PRD**. O guia permanece no protótipo como conteúdo preparado, mas fica bloqueado para publicação como funcionalidade actualmente disponível.

## Actualização D07 e CM, stack público PRD

Investigação adicional concluída em 22/09/2026.

### D07, Validador Automático

* LEDG-2031: READY FOR TESTING;
* sem rota/componente/serviço específico no frontend `main`;
* sem módulo específico no backend `main`;
* Swagger PRD sem endpoints do novo Validador;
* Resource/Dataset expõem apenas o campo legado `schema`;
* validation no contrato actual refere Harvester ou validação técnica genérica.

Estado: **não observável no stack público actual de PRD**.

### CM, Catálogo de Modelos

* LEDG-2049: IN UAT;
* sem rota/componente/serviço específico no frontend `main`;
* sem módulo específico no backend `main`;
* Swagger PRD sem endpoints do novo Catálogo;
* `GET /datasets/schemas/` é um catálogo legado de schemas externos, apenas leitura, e devolveu lista vazia no PRD consultado.

Estado: **não observável no stack público actual de PRD**.

Ressalva comum: a evidência demonstra ausência nas superfícies públicas analisadas, não inexistência absoluta de componente privado, serviço separado ou feature flag.

Decisão: D07 e CM permanecem no protótipo como conteúdo preparado, mas bloqueados para publicação como comportamento actual.

## Actualização D11, Seguir conteúdos e notificações

Revalidação em PRD concluída em 22/09/2026.

Exemplos reais de Organização, Conjunto de Dados, Reutilização e API continuam a apresentar **Adicionar aos favoritos / Remover dos favoritos** e não **Seguir / Deixar de seguir**.

Tickets de evolução:

* LEDG-1960: To Do;
* LEDG-2305: In Progress;
* LEDG-2306: Backlog;
* LEDG-2303: To Do.

Conclusão: D11 representa o comportamento alvo aprovado, mas não o comportamento actual de PRD. Fica bloqueado para publicação actual até a evolução estar integrada.
