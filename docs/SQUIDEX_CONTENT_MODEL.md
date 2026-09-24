# Modelo de conteúdo Squidex provisório

Estado: proposta técnica para a v1.

Objectivo: permitir uma instância Squidex provisória sem acoplar a UI ao formato do CMS e mantendo `GuidesContent` como contrato interno da aplicação.

## Princípios

1. `GuidesContent` continua a ser o modelo de domínio validado por Zod.
2. O Squidex é uma fonte externa. O mapper converte Squidex para `GuidesContent`.
3. IDs funcionais, slugs, relações e ordenação são invariantes.
4. Texto apresentado ao utilizador nasce localizável, mesmo que a v1 publique apenas `pt-PT`.
5. Não duplicar relações em dois sentidos.
6. Não modelar no CMS dados derivados como índice de pesquisa, sitemap ou PDFs.

## Schemas de conteúdo

### `guide-theme`

| Campo | Tipo Squidex | Obrigatório | Localizável | Observação |
| --- | --- | --- | --- | --- |
| `key` | String | Sim | Não | ID funcional estável do tema, equivalente ao `Theme.id` |
| `slug` | String | Sim | Não | Segmento estável de URL |
| `order` | Number | Sim | Não | Ordem de apresentação dos temas |
| `title` | String | Sim | Sim | `Theme.title` |
| `intro` | String | Sim | Sim | `Theme.intro` |

Não guardar `guideIds` no tema. O mapper deriva `Theme.guideIds` a partir dos guias associados ao tema, ordenados por `order`.

### `guide`

| Campo | Tipo Squidex | Obrigatório | Localizável | Observação |
| --- | --- | --- | --- | --- |
| `key` | String | Sim | Não | ID funcional estável, equivalente ao `Guide.id` |
| `code` | String | Sim | Não | Código funcional actual, por exemplo `D01` |
| `slug` | String | Sim | Não | Segmento estável de URL |
| `theme` | Reference para `guide-theme` | Sim | Não | Única fonte da relação tema guia |
| `order` | Number | Sim | Não | Ordem do guia dentro do tema |
| `title` | String | Sim | Sim | `Guide.title` |
| `intro` | String | Sim | Sim | `Guide.intro` |
| `audience` | String | Sim | Sim | `Guide.audience` |
| `tasks` | References ordenadas para `guide-task` | Sim | Não | Constrói `Guide.fichas` preservando a ordem editorial |
| `relatedGuides` | References para `guide` | Não | Não | Constrói `relatedGuideIds` |
| `resources` | Components `guide-resource` | Não | Não | Ligações auxiliares do guia |

### `guide-task`

| Campo | Tipo Squidex | Obrigatório | Localizável | Observação |
| --- | --- | --- | --- | --- |
| `key` | String | Sim | Não | ID funcional estável, equivalente ao `Task.id` |
| `slug` | String | Sim | Não | Segmento estável de URL |
| `title` | String | Sim | Sim | `Task.title` |
| `intro` | String | Sim | Sim | `Task.intro` |
| `roles` | String | Sim | Sim | `Task.roles` |
| `steps` | Components `guide-step` | Sim | Não | Lista ordenada de passos |
| `example` | String | Não | Sim | `Task.example` |
| `tip` | String | Não | Sim | `Task.tip` |
| `table` | JSON | Não | Sim | Mantém a matriz `string[][]` sem criar modelo de tabela prematuramente |
| `media` | String | Não | Sim | Na v1 representa texto editorial sobre a evidência visual |
| `nextType` | String restrita a `task`, `guide`, `overview` | Sim | Não | Preserva a semântica de `nextRef.type` |
| `nextTask` | Reference para `guide-task` | Condicional | Não | Preenchida quando `nextType = task` |
| `nextGuide` | Reference para `guide` | Condicional | Não | Preenchida quando `nextType = guide` ou `overview` |

Regra de consistência no mapper: exactamente uma referência de destino deve estar preenchida de acordo com `nextType`.

## Component schemas

### `guide-step`

* `text`: String, obrigatório, localizável.

### `guide-resource`

* `title`: String, obrigatório, localizável.
* `url`: String, obrigatório, não localizável.

Estes schemas são componentes embebidos, não conteúdos autónomos.

## Mapeamento para `GuidesContent`

* `Theme.guideIds`: derivado dos `guide` com referência ao tema, ordenados por `guide.order`.
* `Guide.themeId`: derivado de `guide.theme.key`.
* `Guide.fichas`: derivado de `guide.tasks` mantendo a ordem das referências.
* `Guide.relatedGuideIds`: derivado de `relatedGuides[].key`.
* `Task.steps`: derivado de `steps[].text`.
* `Task.nextRef`: reconstruído a partir de `nextType`, `nextTask` e `nextGuide`.

## Fora de âmbito nesta fase

* criação da instância Squidex;
* integração com o Squidex oficial do dados.gov.pt;
* conteúdo em inglês;
* autenticação e permissões editoriais definitivas;
* workflows editoriais específicos;
* canonicals finais do portal;
* assets reais para capturas, vídeos ou outros media;
* geração de pesquisa, sitemap ou PDFs dentro do CMS;
* alterações funcionais ao conteúdo dos 7 temas, 15 guias e 95 fichas.

## Riscos controlados

1. O schema exacto do Squidex oficial ainda é por confirmar. A protecção é o mapper e o contrato `GuidesContent`.
2. Campos localizáveis devem ser definidos como tal desde a criação no Squidex, pois a configuração de localização do campo não deve ser tratada como algo a alterar posteriormente.
3. A relação tema guia não é duplicada. `guide.theme` e `guide.order` são a fonte de verdade e `Theme.guideIds` é derivado.
4. `nextRef` mantém o discriminador explícito para evitar que detalhes de referências polimórficas do CMS cheguem ao domínio.

## Decisão para o piloto

Quando o Squidex provisório for criado, o primeiro ensaio deve conter apenas:

* 1 tema;
* 1 guia;
* 2 tarefas;
* relações `theme`, `tasks` e `nextRef`;
* conteúdo `pt-PT`.

O piloto só deve expandir para todo o conteúdo depois de o mapper produzir um `GuidesContent` válido e equivalente ao JSON local.