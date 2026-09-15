# Guias do Utilizador do dados.gov.pt

Este repositório contém o protótipo de trabalho dos Guias do Utilizador do dados.gov.pt.

## Estado do trabalho

O conteúdo deste repositório destina-se a revisão funcional, editorial e UX/UI. Não representa, por si só, aprovação funcional, publicação em produção ou conformidade integral com o Figma e com o Ágora Design System.

O ficheiro `index.html` na raiz corresponde à versão corrente do protótipo.

## Versões preservadas

* `versions/v0.1/index.html`: primeiro rascunho existente no repositório.
* `versions/v0.2/index.html`: evolução visual com aproximação estrutural ao Figma oficial e aos padrões Ágora observados.
* `versions/v0.3/index.html`: versão com os guias agrupados por temas. É a versão corrente após esta reorganização.

O histórico Git continua a ser a fonte técnica de versionamento. A pasta `versions` existe para facilitar comparação e consulta visual das entregas relevantes.

## Trabalhar localmente

1. Clonar o repositório:

```bash
git clone https://github.com/Timmarcelino/Guias_dados.gov.pt.git
```

2. Entrar na pasta do projecto:

```bash
cd Guias_dados.gov.pt
```

3. Criar uma branch antes de alterar a versão corrente:

```bash
git switch -c feature/nome-da-alteracao
```

4. Editar `index.html` no Visual Studio Code.

5. Abrir `index.html` no browser para validar a alteração. Pode ser utilizada a extensão Live Server do Visual Studio Code para actualizar a página após cada gravação.

6. Rever as alterações:

```bash
git diff
```

7. Registar a alteração:

```bash
git add index.html
git commit -m "Melhora navegação dos guias"
```

8. Publicar a branch:

```bash
git push -u origin feature/nome-da-alteracao
```

9. Abrir um Pull Request para `main` e rever as diferenças antes do merge.

## Convenção recomendada para branches

* `feature/...`: nova funcionalidade ou evolução relevante do protótipo.
* `content/...`: alterações editoriais e de conteúdo.
* `fix/...`: correcções pontuais.
* `setup/...`: organização técnica do repositório.

## Commits

Usar mensagens curtas que descrevam a alteração efectuada. Exemplos:

* `Agrupa os guias por temas`
* `Melhora navegação mobile`
* `Corrige idioma do documento para pt-PT`
* `Revê tema APIs, reutilizações e automatização`

Evitar mensagens genéricas como `update`, `teste` ou `alteração 2`.

## Versionamento do protótipo

Enquanto o produto estiver nesta fase, recomenda-se uma convenção simples:

* `v0.1`, `v0.2`, `v0.3`: evoluções relevantes de arquitectura, UX/UI ou conteúdo.
* `v0.3.1`, `v0.3.2`: ajustes menores dentro da mesma proposta, quando for útil preservar uma referência explícita.

Não é necessário criar uma pasta em `versions` para cada commit. O próprio Git preserva todas as alterações. A pasta deve ser utilizada apenas para versões de referência que se pretenda abrir e comparar facilmente.

## Regra de trabalho

A branch `main` deve representar a versão considerada estável para demonstração ou revisão. O trabalho deve ser realizado em branches próprias e integrado através de Pull Request.

Antes de publicar qualquer conteúdo como guia oficial, devem ser confirmados requisitos, permissões, estados, validações, rotas, terminologia, acessibilidade e alinhamento com as fontes funcionais aprovadas do projecto.