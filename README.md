# Guias do Utilizador do dados.gov.pt

Este repositório contém o protótipo de trabalho dos Guias do Utilizador do dados.gov.pt.

## Estado do trabalho

O conteúdo destina-se a revisão funcional, editorial e UX/UI. Não representa, por si só, aprovação funcional, publicação em produção ou conformidade integral com o Figma e com o Ágora Design System.

O `index.html` na raiz corresponde à versão corrente do protótipo.

## Estrutura actual

```text
.
├── index.html
├── assets/
│   ├── css/
│   │   ├── base.css
│   │   ├── portal.css
│   │   └── guides.css
│   └── js/
│       ├── data.js
│       ├── data-d01.js
│       ├── app.js
│       └── header.js
├── versions/
├── README.md
├── CHANGELOG.md
└── LICENSE
```

A separação adoptada tem os seguintes objectivos:

* `index.html`: estrutura semântica da página.
* `assets/css/base.css`: reset, tokens partilhados e utilitários de acessibilidade.
* `assets/css/portal.css`: estrutura e responsividade do header e footer.
* `assets/css/guides.css`: apresentação e responsividade da área dos guias.
* `assets/js/data.js`: conteúdo estruturado dos guias e temas consolidados até à integração do D14.
* `assets/js/data-d01.js`: conteúdo editorial do D01, Autenticação e acesso à conta, registado sobre a estrutura existente sem alterar o histórico dos restantes guias.
* `assets/js/app.js`: apresentação, pesquisa, navegação e interacções dos guias.
* `assets/js/header.js`: comportamento do header do protótipo.

Os módulos JavaScript são carregados com `type="module"`. Por esse motivo, o protótipo deve ser aberto através de um servidor HTTP local, por exemplo Live Server no Visual Studio Code, e não directamente por `file://`.

## Versões preservadas

* `versions/v0.1/index.html`: primeiro rascunho existente no repositório.
* `versions/v0.2/index.html`: evolução visual com aproximação estrutural ao Figma e padrões Ágora observados.
* `versions/v0.3/index.html`: agrupamento dos guias por temas.
* `versions/v0.4/index.html`: header e footer alinhados com a implementação pública do dados.gov.pt, reorganização técnica em HTML, CSS e módulos JavaScript separados, e integração editorial dos guias D14 e D01.

Cada versão de referência deve manter-se abrível de forma autónoma. O histórico Git continua a ser a fonte técnica principal de versionamento.

## Fontes técnicas usadas na v0.4

A aproximação do header e footer foi baseada no repositório público `amagovpt/dadosgov-fe`, em particular nos componentes `Header.tsx`, `Footer.tsx`, configuração de navegação, estilos globais e testes E2E de header/footer.

A réplica no protótipo é deliberadamente estática. Não replica autenticação, integração com CMS, gestão de sessão nem conteúdo dinâmico do Ecossistema.

O conteúdo de autenticação do D01 representa o comportamento alvo validado em TST e as decisões funcionais registadas para esta fase. O protótipo não transforma em comportamento actual as evoluções futuras de consolidação de contas ou descontinuação do login por email e palavra-passe.

## Trabalhar localmente

1. Clonar o repositório:

```bash
git clone https://github.com/Timmarcelino/Guias_dados.gov.pt.git
cd Guias_dados.gov.pt
```

2. Actualizar a `main` e criar uma branch:

```bash
git switch main
git pull
git switch -c feature/nome-da-alteracao
```

3. Abrir a pasta no Visual Studio Code e iniciar o Live Server a partir de `index.html`.

4. Rever as alterações:

```bash
git status
git diff
```

5. Registar a alteração com uma mensagem descritiva:

```bash
git add .
git commit -m "Melhora navegação dos guias"
```

6. Publicar a branch:

```bash
git push -u origin feature/nome-da-alteracao
```

7. Abrir um Pull Request para `main`, rever o diff e só depois efectuar o merge.

## Convenção de branches

* `feature/...`: nova funcionalidade ou evolução relevante.
* `content/...`: alterações editoriais e de conteúdo.
* `fix/...`: correcções pontuais.
* `setup/...`: organização técnica do repositório.

## Versionamento do protótipo

Enquanto o produto estiver nesta fase, utiliza-se uma convenção simples:

* `v0.x`: evolução relevante de arquitectura, UX/UI ou conteúdo.
* `v0.x.y`: ajuste menor quando for útil preservar uma referência explícita.

Não é necessário criar uma pasta em `versions` para cada commit. A pasta é reservada a versões de referência que devam ser abertas e comparadas facilmente.

## Regra de trabalho

A `main` representa a versão considerada estável para demonstração ou revisão. O trabalho é realizado em branches próprias e integrado através de Pull Request.

Antes de publicar qualquer conteúdo como guia oficial devem ser confirmados requisitos, permissões, estados, validações, rotas, terminologia, acessibilidade e alinhamento com as fontes funcionais aprovadas do projecto.
