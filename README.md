# Guias do Utilizador do dados.gov.pt

## Da documentação funcional à orientação prática para quem utiliza dados abertos

O dados.gov.pt reúne funcionalidades, regras, permissões, conceitos, percursos e decisões que atravessam todo o ciclo de utilização de dados abertos: encontrar informação, consultar conjuntos de dados, publicar, gerir recursos, trabalhar com organizações, validar qualidade, utilizar APIs, acompanhar conteúdos, autenticar-se e pedir apoio.

Este projecto transforma esse conhecimento disperso em **guias práticos, pesquisáveis e orientados a tarefas**, escritos a partir da perspectiva de quem precisa de perceber rapidamente o que fazer, onde ir e o que esperar.

Em vez de obrigar o utilizador a conhecer a arquitectura interna do portal, os módulos técnicos ou o histórico de cada requisito, os guias começam por uma pergunta mais útil:

> **O que pretende fazer?**

A partir daí, o utilizador escolhe um tema, encontra o guia adequado e segue uma ficha curta com passos, exemplos, dicas e ligações para conteúdos relacionados.

## Porque este projecto existe

Documentação completa nem sempre significa documentação fácil de usar.

Um portal como o dados.gov.pt evolui através de requisitos, decisões, implementações e correcções sucessivas. Para uma equipa de produto ou desenvolvimento, essa granularidade é essencial. Para um utilizador final, porém, o problema é outro: quer concluir uma tarefa.

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
| Rotas publicadas no sitemap | **118** |
| Temas funcionais | **7** |
| PDFs publicados | **15** |
| Pesquisa transversal | **95 entradas** |
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

As fichas podem incluir objectivo e contexto, público aplicável, passos principais, exemplos, dicas e alertas, tabelas de apoio, indicação de media previsto e ligações para tarefas relacionadas.

## Como o conteúdo foi construído

Os guias não resultam de uma simples transcrição de documentação existente.

A construção exigiu trabalho de análise funcional e editorial para consolidar informação proveniente de diferentes fontes do projecto, incluindo quando aplicável requisitos e especificações funcionais, User Stories e critérios de aceitação, tickets Jira e decisões registadas, protótipos e referências de UI, comportamento implementado, resultados de testes, documentação técnica e repositórios públicos.

Quando uma fonte descreve um comportamento futuro, esse comportamento não é automaticamente apresentado como funcionalidade actual. Quando existe divergência entre documentação e implementação, a diferença deve ser analisada antes de ser convertida em instrução para o utilizador.

## Rastreabilidade e confiança

O protótipo mantém uma separação consciente entre diferentes níveis de informação:

* **Requisito**, quando existe uma regra funcional aprovada;
* **Implementação**, quando há evidência de comportamento num ambiente;
* **Decisão funcional**, quando o projecto registou uma opção de produto;
* **Assunção**, quando é necessário avançar sem transformar uma hipótese em regra;
* **Por confirmar**, quando ainda não existe evidência suficiente para apresentar uma conclusão como definitiva.

Esta distinção é importante porque um manual de utilizador deve ser simples, mas não pode ser construído à custa de regras inventadas ou de funcionalidades ainda não estabilizadas.

## Estado actual

A release **v0.5.0** representa a baseline estável actual de demonstração e revisão. A publicação oficial no dados.gov.pt continua dependente da integração no produto.

Nesta fase, o projecto inclui 15 guias, 95 fichas, sete temas funcionais, pesquisa transversal, navegação por tema, guia e tarefa, relações entre guias, header e footer aproximados à implementação pública do dados.gov.pt, 118 rotas estáticas, 15 PDFs e validações automáticas de consistência.

O conteúdo continua destinado a revisão funcional, editorial e UX/UI antes de qualquer publicação como manual oficial.

## Arquitectura técnica e transversalização

O protótipo é publicado em GitHub Pages e, por isso, a saída Web é estática. Isto significa que o navegador recebe HTML já materializado em cada rota. **O HTML repetido nas rotas é saída de build, não a fonte de manutenção dos elementos transversais.**

Os elementos comuns são mantidos uma única vez e propagados automaticamente:

* `templates/partials/header.html`: fonte única do header;
* `templates/partials/footer.html`: fonte única do footer e do bloco de autoria;
* `content/site.json`: fonte única da identidade do protótipo, versão e autoria;
* `scripts/sync_shared_layout.py`: materializa os partials nas 118 rotas correntes, `index.html`, `404.html` e protótipos aplicáveis;
* `scripts/sync_shared_layout.py --check`: guardrail read-only que falha quando uma saída diverge dos partials;
* `scripts/generate_pdf_guides.py`: gera os 15 PDFs a partir da fonte editorial e da mesma configuração de autoria;
* `.github/workflows/guides-consistency.yml`: valida fonte, rotas, pesquisa, sitemap e sincronização do layout transversal;
* `.github/workflows/guides-pdf.yml`: regenera e valida os 15 PDFs e exige autoria em todos eles.

A autoria é configurada em `content/site.json`. A alteração do nome, função, LinkedIn, logótipo, versão ou estado do protótipo deve ser feita nessa configuração, e não repetida manualmente nas páginas ou no gerador PDF.

A pasta `versions/` é deliberadamente excluída da sincronização automática. Contém snapshots históricos preservados para comparação e evidência, não a versão corrente publicada do protótipo.

### Limite actual da transversalização

Header, footer, autoria, configuração do protótipo e geração PDF estão centralizados. O conteúdo principal das 118 rotas continua materializado em HTML estático. A fonte editorial estruturada existe em `content/guides.json`, mas a totalidade do corpo Web ainda não é reconstruída automaticamente a partir dessa fonte.

Assim, a arquitectura transversal está resolvida para os elementos comuns, mas uma futura evolução pode ainda transformar todo o corpo das páginas em saída de um gerador único, reduzindo mais duplicação e risco de divergência.

## Estrutura técnica

```text
.
├── index.html
├── 404.html
├── Guias-do-utilizador/       # 118 rotas materializadas
├── content/
│   ├── guides.json            # fonte editorial versionada
│   └── site.json              # configuração transversal e autoria
├── templates/
│   └── partials/
│       ├── header.html        # fonte única do header
│       └── footer.html        # fonte única do footer e autoria
├── assets/
│   ├── brand/                 # marca pessoal usada no protótipo
│   ├── css/
│   ├── js/
│   └── pdf/                   # 15 PDFs publicados
├── scripts/
│   ├── generate_pdf_guides.py
│   ├── sync_shared_layout.py
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

## Fluxo de manutenção

Para alterar header, footer ou autoria:

1. alterar o partial ou `content/site.json`;
2. executar `python scripts/sync_shared_layout.py`;
3. validar com `python scripts/sync_shared_layout.py --check` e `python scripts/validate_guides_consistency.py`;
4. deixar os workflows permanentes validarem a consistência e os PDFs antes da integração.

Não se deve editar manualmente o header, footer ou bloco de autoria nas 118 páginas materializadas.

## Executar localmente

Clone o repositório:

```bash
git clone https://github.com/Timmarcelino/Guias_dados.gov.pt.git
cd Guias_dados.gov.pt
```

Abra a pasta no Visual Studio Code e inicie um servidor HTTP local, por exemplo através da extensão Live Server, a partir de `index.html`. Os módulos JavaScript são carregados com `type="module"`, pelo que o protótipo não deve ser aberto directamente por `file://`.

## Versionamento do protótipo

O histórico visual e funcional é preservado na pasta `versions`.

| Versão | Evolução principal |
| --- | --- |
| `v0.1` | Primeiro rascunho do protótipo. |
| `v0.2` | Aproximação visual ao portal e melhoria estrutural. |
| `v0.3` | Organização dos guias por temas e introdução da navegação Tema → Guia → Tarefa. |
| `v0.4` | Modularização técnica, aproximação do header e footer, integração de D14 e D01 e evolução da taxonomia para sete temas. |
| `v0.5.0` | 15 guias, 95 fichas, 118 rotas estáticas, 15 PDFs, guardrails de consistência, alinhamento editorial com PRD/PPR e workflows permanentes. |

O histórico Git continua a ser a fonte técnica principal de versionamento. Nem todos os commits originam uma nova pasta em `versions`. A pasta é reservada a referências que seja útil abrir e comparar de forma autónoma.

## Convenção de branches

* `feature/...`: nova funcionalidade ou evolução relevante;
* `content/...`: alterações editoriais e de conteúdo;
* `fix/...`: correcções pontuais;
* `setup/...`: organização técnica do repositório.

A `main` representa a versão considerada estável para demonstração ou revisão. O trabalho é preparado em branches próprias e integrado através de Pull Request.

## O que este projecto não pretende ser

Este repositório não substitui as fontes de verdade do projecto.

Os guias não substituem requisitos aprovados, User Stories, decisões registadas, Figma, Jira, documentação técnica ou evidência de testes. O protótipo funciona como uma **camada editorial orientada ao utilizador**, construída a partir dessas fontes.
