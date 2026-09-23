# Guias do Utilizador do dados.gov.pt

## Da documentação funcional à orientação prática para quem utiliza dados abertos

O dados.gov.pt reúne funcionalidades, regras, permissões, conceitos, percursos e decisões que atravessam todo o ciclo de utilização de dados abertos: encontrar informação, consultar conjuntos de dados, publicar, gerir recursos, trabalhar com organizações, validar qualidade, utilizar APIs, acompanhar conteúdos, autenticar-se e pedir apoio.

Grande parte desse conhecimento existe em fontes diferentes, com objectivos diferentes. Há requisitos, User Stories, tickets Jira, protótipos, decisões funcionais, evidência de testes, documentação técnica e comportamento efectivamente implementado.

Este projecto transforma esse conhecimento disperso num produto muito mais simples de utilizar: **guias práticos, pesquisáveis e orientados a tarefas**, escritos a partir da perspectiva de quem precisa de perceber rapidamente o que fazer, onde ir e o que esperar.

Em vez de obrigar o utilizador a conhecer a arquitectura interna do portal, os módulos técnicos ou o histórico de cada requisito, os guias começam por uma pergunta muito mais útil:

> **O que pretende fazer?**

A partir daí, o utilizador escolhe um tema, encontra o guia adequado e segue uma ficha curta com passos, exemplos, dicas e ligações para conteúdos relacionados.

## Porque este projecto existe

Documentação completa nem sempre significa documentação fácil de usar.

Um portal como o dados.gov.pt evolui através de requisitos, decisões, implementações e correcções sucessivas. Para uma equipa de produto ou desenvolvimento, essa granularidade é essencial. Para um utilizador final, porém, o problema é outro: ele não quer descobrir qual ticket implementou uma funcionalidade, qual versão alterou um fluxo ou em que documento está descrita uma permissão. Quer simplesmente concluir uma tarefa.

Foi esse o problema que este trabalho procurou resolver.

A documentação existente foi analisada, consolidada e reorganizada numa arquitectura de informação centrada em necessidades reais de utilização. O resultado aproxima o conhecimento funcional do portal de quem efectivamente precisa dele, sem perder a rastreabilidade necessária para manutenção, revisão e evolução futura.

## O que construímos

O protótipo actual reúne o conhecimento funcional do portal em **15 guias e 95 fichas práticas**, organizados por objectivo e não pela estrutura interna do sistema.

Cada ficha procura responder a uma necessidade concreta, por exemplo:

* encontrar um conjunto de dados;
* filtrar resultados e consultar metadados;
* publicar e gerir dados;
* trabalhar com organizações e permissões;
* compreender qualidade e modelos de dados;
* utilizar APIs e funcionalidades de reutilização;
* iniciar sessão e recuperar o acesso;
* acompanhar actividade e conteúdos;
* pedir ajuda ou contactar a equipa do dados.gov.pt.

O valor deste trabalho não está apenas em ter mais documentação. Está em tornar a documentação **localizável, compreensível, accionável e coerente**.

## O projecto em números

| Indicador | Estado actual |
| --- | ---: |
| Guias práticos | **15** |
| Fichas orientadas a tarefas | **95** |
| Temas funcionais | **7** |
| Pesquisa transversal | **1 experiência única sobre os guias** |
| Versões de referência preservadas | **4** |

Estes números representam a versão actual do protótipo e evoluem com o trabalho funcional e editorial do projecto.

## Arquitectura de informação

Os guias estão organizados em sete temas funcionais. A intenção é permitir que uma pessoa chegue à informação pelo objectivo que tem, e não pela nomenclatura interna da plataforma.

| Tema | Objectivo |
| --- | --- |
| **Encontrar, consultar e explorar dados** | Ajudar a descobrir dados, interpretar resultados, consultar recursos e explorar informação disponível no portal. |
| **Publicar e gerir dados** | Orientar a criação, publicação, actualização e gestão de conjuntos de dados e respectivos recursos. |
| **Qualidade e modelos de dados** | Explicar validações, modelos, conformidade e elementos necessários para compreender e melhorar a qualidade dos dados. |
| **Organizações** | Apoiar a procura, integração, criação e gestão de organizações, membros e permissões. |
| **APIs, reutilizações e automatização** | Reunir orientações relacionadas com acesso programático, reutilização e operações automatizadas. |
| **Acesso, perfil e participação** | Reunir autenticação, acesso à conta, perfil, actividade e formas de acompanhamento e participação no portal. |
| **Ajuda e contactos** | Disponibilizar um ponto claro para apoio, esclarecimento de dúvidas, pedidos de informação e contacto com a equipa do dados.gov.pt. |

A separação de **Ajuda e contactos** num tema próprio é intencional. Uma pessoa que procura apoio não deve precisar de perceber se o seu problema pertence a autenticação, perfil, publicação ou qualquer outra área antes de encontrar ajuda.

## Como os guias funcionam

A experiência foi desenhada segundo um percurso simples:

**Tema → Guia → Tarefa**

Na página inicial, o utilizador pode explorar os temas ou utilizar a pesquisa transversal. Dentro de cada guia encontra uma visão geral e as tarefas disponíveis. Cada tarefa é apresentada numa ficha própria.

As fichas podem incluir:

* objectivo e contexto;
* público ou perfil aplicável;
* passos principais;
* exemplos de utilização;
* dicas e alertas;
* tabelas de apoio quando melhoram a compreensão;
* indicação de imagens ou vídeos previstos;
* ligação para a tarefa seguinte ou para outro guia relacionado.

Esta estrutura foi pensada para permitir leitura rápida sem impedir uma navegação mais profunda quando o utilizador precisa de compreender todo o percurso.

## Como o conteúdo foi construído

Os guias não resultam de uma simples transcrição de documentação existente.

A construção exigiu trabalho de análise funcional e editorial para consolidar informação proveniente de diferentes fontes do projecto, incluindo quando aplicável:

* requisitos e especificações funcionais;
* User Stories e critérios de aceitação;
* tickets Jira e decisões registadas;
* protótipos e referências de UI;
* comportamento implementado nos ambientes disponíveis;
* resultados de testes funcionais;
* documentação técnica e repositórios públicos do dados.gov.pt;
* decisões de produto tomadas ao longo da evolução do portal.

Quando uma fonte descreve um comportamento futuro, esse comportamento não é automaticamente apresentado como funcionalidade actual. Quando existe divergência entre documentação e implementação, a diferença deve ser analisada antes de ser convertida em instrução para o utilizador.

Isto permite simplificar a linguagem sem perder rigor funcional.

## Da complexidade interna para uma experiência simples

Por detrás de uma instrução aparentemente simples como “publique um conjunto de dados” podem existir regras sobre permissões, estados, recursos, licenças, metadados obrigatórios, validações e comportamento pós-publicação.

O trabalho dos guias consiste em esconder complexidade desnecessária sem esconder informação importante.

O utilizador vê um percurso claro. A equipa mantém, por detrás desse percurso, a preocupação com requisito, evidência, excepções, riscos, rastreabilidade e evolução do produto.

Esta é a principal proposta de valor do projecto: **converter conhecimento funcional complexo em orientação que uma pessoa consegue realmente usar**.

## Rastreabilidade e confiança

O protótipo foi construído com uma separação consciente entre diferentes níveis de informação:

* **Requisito**, quando existe uma regra funcional aprovada;
* **Implementação**, quando há evidência de comportamento num ambiente;
* **Decisão funcional**, quando o projecto registou uma opção de produto;
* **Assunção**, quando é necessário avançar sem transformar uma hipótese em regra;
* **Por confirmar**, quando ainda não existe evidência suficiente para apresentar uma conclusão como definitiva.

Esta distinção é importante porque um manual de utilizador deve ser simples, mas não pode ser construído à custa de regras inventadas ou de funcionalidades ainda não estabilizadas.

## Estado actual

A release **v0.5.0** está integrada em `main` através do PR #5 e representa a baseline estável actual de demonstração e revisão. Inclui rotas estáticas, pesquisa indexada, PDFs, validação automática de consistência e documentação viva do estado do projecto. A publicação oficial no dados.gov.pt continua dependente da integração no produto.

Nesta fase, o projecto inclui:

* 15 guias e 95 fichas;
* sete temas funcionais;
* pesquisa transversal;
* navegação por tema, guia e tarefa;
* relações entre guias;
* header e footer aproximados à implementação pública do dados.gov.pt;
* estrutura modular em HTML, CSS e JavaScript;
* versões anteriores preservadas para comparação;
* conteúdo editorial revisto e rastreado para os 15 guias, com D01, D03 e D14 validados no âmbito actual e restantes áreas classificadas segundo a evidência disponível.

O conteúdo continua destinado a revisão funcional, editorial e UX/UI antes de qualquer publicação como manual oficial.

## O que este projecto não pretende ser

Este repositório não substitui as fontes de verdade do projecto.

Os guias não substituem requisitos aprovados, User Stories, decisões registadas, Figma, Jira, documentação técnica ou evidência de testes. Também não devem ser utilizados para inferir regras que não estejam suportadas pelas fontes funcionais aplicáveis.

O protótipo funciona como uma **camada editorial orientada ao utilizador**, construída a partir dessas fontes.

A sua função é traduzir conhecimento técnico e funcional em orientação clara e utilizável.

## Estrutura técnica

```text
.
├── index.html
├── 404.html
├── Guias-do-utilizador/       # 118 rotas publicadas
├── content/
│   └── guides.json            # fonte editorial versionada
├── assets/
│   ├── css/
│   ├── js/
│   └── pdf/                   # 15 PDFs publicados
├── scripts/
│   ├── generate_pdf_guides.py
│   └── validate_guides_consistency.py
├── docs/
│   ├── PROJECT_STATUS.md
│   ├── CONTENT_VALIDATION.md
│   └── PRD_TEST_PLAN.md
├── .github/workflows/
│   ├── guides-pdf.yml
│   └── guides-consistency.yml
├── versions/
│   ├── v0.1/
│   ├── v0.2/
│   ├── v0.3/
│   └── v0.4/
├── README.md
├── CHANGELOG.md
└── LICENSE
```

Responsabilidades principais:

* `index.html`: estrutura semântica da página;
* `assets/css/base.css`: reset, tokens partilhados e utilitários de acessibilidade;
* `assets/css/portal.css`: estrutura e responsividade do header e footer;
* `assets/css/guides.css`: apresentação e responsividade da área dos guias;
* `content/guides.json`: fonte editorial versionada usada pela colecção PDF;
* `assets/js/data.js`: conteúdo estruturado dos guias consolidados para a experiência dinâmica;
* `assets/js/data-d01.js`: módulo editorial do D01;
* `assets/js/search-index.json`: índice das 95 fichas para pesquisa estática;
* `assets/js/app.js`: apresentação, pesquisa, navegação e interacções da experiência dinâmica;
* `assets/js/header.js`: comportamento do header do protótipo;
* `scripts/generate_pdf_guides.py`: geração controlada dos PDFs;
* `scripts/validate_guides_consistency.py`: guardrail entre fonte, rotas, pesquisa, sitemap e HTML;
* `docs/PROJECT_STATUS.md`: estado operacional vivo do projecto;
* `docs/CONTENT_VALIDATION.md`: matriz de validação funcional;
* `docs/PRD_TEST_PLAN.md`: plano mínimo de validação autenticada em PRD.

Os módulos JavaScript são carregados com `type="module"`. Por esse motivo, o protótipo deve ser servido através de HTTP local e não aberto directamente por `file://`.

## Executar localmente

Clone o repositório:

```bash
git clone https://github.com/Timmarcelino/Guias_dados.gov.pt.git
cd Guias_dados.gov.pt
```

Abra a pasta no Visual Studio Code e inicie um servidor local, por exemplo através da extensão Live Server, a partir de `index.html`.

Para actualizar a versão local:

```bash
git switch main
git pull origin main
```

## Versionamento do protótipo

O histórico visual e funcional é preservado na pasta `versions`.

| Versão | Evolução principal |
| --- | --- |
| `v0.1` | Primeiro rascunho do protótipo. |
| `v0.2` | Aproximação visual ao portal e melhoria estrutural. |
| `v0.3` | Organização dos guias por temas e introdução da navegação Tema → Guia → Tarefa. |
| `v0.4` | Modularização técnica, aproximação do header e footer, integração de D14 e D01 e evolução da taxonomia para sete temas. |
| `v0.5.0` | 15 guias, 95 fichas, 118 rotas estáticas, 15 PDFs, guardrails de consistência, alinhamento editorial com PRD/PPR e workflows permanentes preparados para `main`. |

O histórico Git continua a ser a fonte técnica principal de versionamento. Nem todos os commits originam uma nova pasta em `versions`. A pasta é reservada a referências que seja útil abrir e comparar de forma autónoma.

## Convenção de branches

* `feature/...`: nova funcionalidade ou evolução relevante;
* `content/...`: alterações editoriais e de conteúdo;
* `fix/...`: correcções pontuais;
* `setup/...`: organização técnica do repositório.

A `main` representa a versão considerada estável para demonstração ou revisão. O trabalho é preparado em branches próprias e integrado através de Pull Request.

## Fontes técnicas da v0.4

A aproximação do header e footer utiliza como referência a implementação pública do frontend `amagovpt/dadosgov-fe`, incluindo componentes de header e footer, configuração de navegação, estilos globais e testes E2E disponíveis no repositório.

A réplica presente neste projecto é deliberadamente estática. Não implementa autenticação real, gestão de sessão, CMS ou conteúdo dinâmico do Ecossistema.

O D01 representa o comportamento actualmente consolidado pelas evidências funcionais e de implementação disponíveis. Não antecipa como comportamento actual a futura consolidação de contas nem a eventual descontinuação do login por email e palavra-passe.

O D14 apresenta sete fichas suportadas pelo comportamento e evidência actualmente consolidados para Ajuda e contactos, incluindo feedback e reporte de problema técnico, sem antecipar funcionalidades futuras ainda não estabilizadas.

## Critério para evolução dos guias

Antes de publicar conteúdo como guia oficial devem ser confirmados, quando aplicável:

* requisitos e regras funcionais;
* permissões e perfis;
* estados e transições;
* validações e mensagens relevantes;
* rotas e terminologia da interface;
* acessibilidade no contexto real;
* comportamento nos ambientes aplicáveis;
* alinhamento com as fontes funcionais aprovadas;
* rastreabilidade das decisões que afectam o percurso do utilizador.

## Resultado

Este repositório começou como um protótipo de documentação.

Hoje representa algo mais concreto: uma forma de transformar o conhecimento funcional do dados.gov.pt numa experiência de orientação que pode ser lida, pesquisada, revista, testada e evoluída.

A documentação deixa de ser apenas um conjunto de fontes dispersas e passa a aproximar-se de um produto para o utilizador.

**Esse é o objectivo dos Guias do Utilizador do dados.gov.pt: tornar simples encontrar não apenas os dados, mas também a forma correcta de utilizar o portal.**
