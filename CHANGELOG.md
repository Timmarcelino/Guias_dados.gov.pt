# Histórico de versões

## v0.4 · 15/09/2026

Evolução técnica e visual do protótipo preparada para revisão.

Principais alterações:

* Aproximação do header ao frontend público actual do dados.gov.pt, com marca, navegação principal, Recursos, Publicar, pesquisa, Ecossistema e autenticação representados no protótipo.
* Aproximação do footer à estrutura observada no portal, incluindo as três áreas de navegação `Dados abertos`, `Portal` e `Desenvolvimento`, marcas institucionais e ligações relacionadas.
* Separação do CSS do documento HTML.
* Separação dos dados editoriais, lógica principal e comportamento do header em módulos JavaScript distintos.
* Introdução de propriedades CSS personalizadas e camadas de cascade para reduzir conflitos de especificidade e centralizar tokens do protótipo.
* Utilização de HTML semântico para `header`, `nav`, `main` e `footer`.
* Manutenção dos 13 guias e 80 fichas existentes sem alteração intencional das respectivas regras funcionais.
* Criação de uma cópia autónoma da v0.4 dentro de `versions/v0.4`.

Fonte técnica: implementação pública do frontend `amagovpt/dadosgov-fe`, incluindo `Header.tsx`, `Footer.tsx`, configuração de navegação, estilos globais e testes E2E de header/footer.

Assunção: a v0.4 é uma aproximação estática para prototipagem. Não implementa autenticação, sessão, CMS ou conteúdo dinâmico do Ecossistema.

Por confirmar: paridade visual pixel a pixel com a versão publicada, todos os tokens Ágora aplicáveis e comportamento integral do header/footer nos breakpoints suportados.

## v0.3 · 15/09/2026

Principais alterações:

* Criação de uma página inicial orientada pela pergunta «Como podemos ajudar?».
* Agrupamento dos 13 guias em seis temas funcionais.
* Navegação organizada segundo o percurso Tema → Guia → Tarefa.
* Pesquisa transversal com resultados contextualizados pelo respectivo tema.
* Manutenção das 80 fichas existentes, sem alteração intencional das respectivas regras funcionais nesta evolução.
* Inspiração na arquitectura de informação de guides.data.gouv.fr, adaptada ao contexto do dados.gov.pt.

Assunção: a taxonomia temática é uma proposta UX/editorial para revisão e não constitui requisito funcional aprovado.

## v0.2 · 15/09/2026

Principais alterações:

* Correcção do idioma principal do documento para `pt-PT`.
* Aproximação estrutural ao Figma oficial do dados.gov.pt e aos padrões Ágora que foi possível observar.
* Ajuste da estrutura do header para os breakpoints de referência observados no Figma.
* Conteúdo desktop organizado numa área útil de 1216 px.
* Margens mobile alinhadas com a referência observada para 360 px.
* Separação da pesquisa da área institucional do header.
* Reforço do foco visível nos principais elementos interactivos.
* Manutenção da arquitectura editorial e dos 13 guias.

Por confirmar: conformidade integral com tokens, tipografia, raios, estados e restantes componentes do Ágora Design System. Esta versão não deve ser interpretada como Figma aprovado.

## v0.1 · 08/09/2026

Primeiro rascunho preservado a partir do `index.html` que existia na branch `main` antes da reorganização do versionamento.

Características principais:

* Protótipo HTML inicial dos Guias do Utilizador.
* Estrutura concentrada num único `index.html`.
* Apresentação limitada a uma área máxima de 736 px.
* Idioma do documento identificado como `pt-BR`.

Esta versão é preservada apenas para referência histórica e comparação visual.
