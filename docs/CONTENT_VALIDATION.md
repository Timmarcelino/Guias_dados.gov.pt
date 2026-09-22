# Validação de conteúdo dos Guias do Utilizador

Última validação: 22/09/2026

## 1. Objectivo

Este documento controla a validação funcional e editorial dos 15 guias e 92 fichas existentes na branch `feature/static-routes-pdf`.

Não substitui Requirements, User Stories, critérios de aceitação, Figma aprovado, Jira, documentação técnica nem evidência de testes.

### Regra de fallback para informação não confirmada

Quando uma regra, permissão, validação, mensagem, limite ou comportamento não estiver confirmado por fonte funcional aprovada, o guia deve usar apenas o comportamento observado e reproduzível em **PRD**.

Esse comportamento deve ser tratado como **Implementação actual**, não como Requisito.

Não antecipar backlog, Figma futuro, proposta funcional ou comportamento esperado.

Os estados usados são:

* **Validado no âmbito actual**: o conteúdo principal está suportado pelas fontes consultadas para o comportamento actualmente documentado. Pode continuar a exigir revisão visual, acessibilidade ou nova validação quando a funcionalidade evoluir.
* **Parcialmente validado**: existe base suficiente para manter o guia, mas há regras, permissões, estados, mensagens ou comportamentos específicos que ainda precisam de confirmação.
* **Por confirmar**: não existe evidência suficiente para tratar o conteúdo como orientação definitiva.

## 2. Baseline editorial analisada

A colecção actualmente publicada na branch contém:

| Indicador | Estado |
| --- | ---: |
| Guias | 15 |
| Fichas | 92 |
| Temas | 7 |
| PDFs | 15 |
| Entradas no índice de pesquisa | 92 |
| URLs no sitemap | 115 |

A fonte editorial utilizada na geração PDF v2 foi preservada no histórico Git no commit `9f420bf7bb0811ac809d416dd1a5f051e92cf581`, em `.pdfv2_tmp/conteudo_revisado.json`.

Esta fonte contém os 15 guias e as 92 fichas, incluindo as seis fichas de D14.

## 3. Validação dos PDFs

### Evidência confirmada

O workflow GitHub Actions `Instalar PDFs v2`, execução `35712017540`, terminou com sucesso.

A geração utilizou:

* WeasyPrint 68.0;
* pypdf 5.9.0;
* `pdf_tags=True`;
* sRGB;
* fonte Inter instalada no runner.

O QA automatizado da geração confirmou:

* 15 guias processados;
* 15 PDFs públicos gerados;
* pelo menos uma página em cada PDF;
* ficheiros superiores a 50 KB;
* ausência de itens editoriais em falta relativamente à fonte usada na geração.

Mensagem final do QA:

`QA PDF v2: 15/15 ficheiros válidos; conteúdo editorial sem omissões.`

### Limitação

**Por confirmar:** qualidade visual página a página, cortes, quebras inadequadas, sobreposições, qualidade real da árvore de tags, ordem de leitura, bookmarks e restante acessibilidade documental.

O conector GitHub disponível nesta sessão permite validar os ficheiros e o processo de geração, mas não disponibiliza os bytes dos PDFs para renderização visual. Não considerar estes pontos como aprovados apenas com base no QA estrutural.

## 4. Divergência entre fontes editoriais

Foi detectada uma diferença de maturidade entre a fonte que gerou as rotas estáticas/PDFs e a aplicação dinâmica v0.4.

### Implementação

A aplicação dinâmica carrega:

* `assets/js/data.js`;
* `assets/js/data-d01.js`, que regista D01 em execução.

### Achado

A fonte usada para os PDFs e rotas estáticas contém revisões posteriores que não estão integralmente reflectidas em `assets/js/data.js`.

Diferenças identificadas:

* D03, D04, D05, D07 e D09 incluem ligações de recursos na fonte PDF que não existem no objecto dinâmico equivalente;
* D08 possui diferenças substantivas na ficha `Consultar a referência da API do portal`;
* D14 possui diferenças substantivas em percursos de Discussões e no encaminhamento de problemas técnicos;
* D01 é modularizado separadamente e não constitui ausência de conteúdo.

### Risco

Uma mesma tarefa pode apresentar texto diferente consoante o utilizador navegue na experiência dinâmica ou numa rota estática.

### Recomendação

Não copiar automaticamente uma fonte sobre a outra. Rever as diferenças D08 e D14 contra as fontes funcionais aplicáveis e, depois da decisão, estabelecer uma única fonte editorial versionada capaz de gerar experiência web, pesquisa, sitemap e PDFs.

## 5. Matriz das 15 áreas

| Código interno | Guia | Fichas | Estado | Evidência principal | Pendências para fecho |
| --- | --- | ---: | --- | --- | --- |
| D01 | Autenticação e acesso à conta | 6 | **Validado no âmbito actual** | Conteúdo anteriormente revisto com comportamento alvo validado em TST | Revalidar após alterações futuras de consolidação de contas ou eventual alteração do login por email e palavra-passe |
| D02 | Organizações e permissões | 6 | **Parcialmente validado** | Fluxos base de consulta, adesão, membros e organização estão estruturados | Confirmar matriz final de perfis/permissões, gestão de emblemas e limites das acções por membro, administrador da organização e administrador do portal |
| D03 | Encontrar e consultar dados | 5 | **Validado no âmbito actual** | Percurso público simples e orientado a pesquisa, filtros, consulta e acesso aos dados | Revisão final de terminologia/UI e capturas; manter coerência com a pesquisa publicada |
| D04 | Publicar e gerir Conjuntos de Dados | 7 | **Parcialmente validado** | LEDG-2187 Done; LEDG-2046, LEDG-2191 e LEDG-2048 em READY FOR UAT | Validar em UAT a implementação de publicação/ciclo de vida/transferência e, em especial, não apresentar como comportamento actual `CC BY 4.0` por defeito nem ponto de contacto opcional enquanto a LEDG-2175 permanecer por implementar |
| D05 | Recursos de um Conjunto de Dados | 6 | **Parcialmente validado** | LEDG-2047 em READY FOR UAT; LEDG-1997/2102/2051/2254/2309 com evidência de implementação; PRD público revisto em 22/09/2026 | Manter por confirmar em PRD: proibição efectiva de SVG/HTML, formatos actualmente pré-visualizáveis, apresentação efectiva de Explorar dados por recurso e regressão de integridade após upload/substituição |
| D06 | Explorador de dados | 8 | **Por confirmar em PRD** | LEDG-2276 e LEDG-2199 em READY FOR UAT; documentação técnica consistente; frontend de produção revisto em 22/09/2026 mantém a acção `Explore os dados` oculta no detalhe do recurso | Não publicar como comportamento actual até a entrada no Explorador estar disponível e validada em PRD; distinguir da Pré-visualização simples que já existe no Frontoffice |
| D07 | Qualidade e validação de dados | 6 | **Por confirmar em PRD** | LEDG-2031 funcionalmente consolidada e em READY FOR TESTING; PRD público revisto em 22/09/2026 não expõe os estados/acções específicos do novo Validador | Não publicar o fluxo como comportamento actual até validação autenticada em PRD; executar apenas o conjunto mínimo de testes definido nesta matriz |
| D08 | APIs e serviços de dados | 6 | **Parcialmente validado** | Referência, tutorial e catálogo público validados directamente em PRD em 22/09/2026; implementação actual do frontend contém gating por organização com emblema `public-service` | Fichas públicas sustentadas; criação, publicação e edição devem ser confirmadas numa sessão autenticada de PRD antes de serem tratadas como comportamento actual |
| D09 | Reutilizações | 6 | **Parcialmente validado** | Fluxos de consulta, criação, rascunho, publicação e edição estruturados | Validar integralmente transferência, permissões e estados; a própria ficha de dificuldades ainda assinala o percurso completo de transferência como dependente de validação |
| D10 | Harvester | 6 | **Parcialmente validado** | API pública de PRD confirma 15 backends habilitados, 42 fontes, metadados de configuração, trabalhos e estados de validação; LEDG-2323 fecha a política de preview; frontend actual implementa separação de edição por perfil | Fluxos autenticados de edição, preview, trabalhos e aprovação/rejeição devem ser confirmados em PRD; não documentar particularidades de backends ainda em READY FOR TESTING |
| D11 | Seguir conteúdos e notificações | 5 | **Por confirmar em PRD** | LEDG-2289 concluiu a análise e a direcção terminológica; LEDG-1960 continua To Do e LEDG-2305 In Progress; PRD ainda apresenta `Adicionar aos favoritos`/`Remover dos favoritos` nos quatro tipos de conteúdo | Não publicar `Seguir` como comportamento actual enquanto PRD não o apresentar; notificações de conteúdos seguidos também não estão demonstradas como implementadas |
| D12 | Discussões e comunidade | 5 | **Parcialmente validado** | Percursos de consulta, criação e resposta estão estruturados | Confirmar moderação, notificações por email, visibilidade, permissões na organização e tratamento de estados sem discussões |
| D13 | Perfil e actividade | 5 | **Parcialmente validado** | Percursos básicos de perfil, conteúdos e actividade estão definidos | Revalidar campos públicos, fotografia, actividade e impacto da evolução da autenticação/conta |
| D14 | Ajuda e contactos | 6 | **Validado no âmbito actual** | LEDG-2475 Done; submissão em PPR já validada; sexta ficha recuperada e sincronizada | Não prometer confirmação automática por email enquanto LEDG-2029 estiver To Do; manter funcionalidades futuras de certificação/emblemas fora do percurso actual |
| CM | Catálogo de Modelos | 9 | **Por confirmar em PRD** | LEDG-2049 consolidada e em IN UAT; frontend oficial e PRD público revistos em 22/09/2026 sem evidência dos fluxos específicos do Catálogo | Não publicar como comportamento actual até validação autenticada em PRD; confirmar catálogo, permissões, criação/inferência, versionamento, ciclo de vida, utilização e auditoria através do conjunto mínimo de testes definido abaixo |

## 6. Revisão profunda D04, Publicar e gerir Conjuntos de Dados

Data da revisão: 22/09/2026.

### Resultado

As sete fichas de D04 estão coerentes, no essencial, com a especificação funcional actual das LEDG-2046 e LEDG-2048.

### Confirmado pela LEDG-2046

* é permitido guardar Rascunho com metadados obrigatórios ainda em falta;
* a publicação exige os metadados obrigatórios no momento de publicar;
* a publicação é imediata e não tem circuito de revisão editorial;
* a ausência de recursos não bloqueia a publicação, com aviso aplicável;
* ausência de modelo, ausência de validação, Não conforme e Erro técnico não bloqueiam a publicação;
* alterações guardadas num Conjunto de Dados Público produzem efeito imediato;
* os estados são Rascunho, Público, Arquivado e Eliminado;
* Arquivado deixa de aparecer nas listagens públicas mas mantém o acesso aplicável por ligação directa;
* a eliminação é lógica e exclusiva de Administrador autorizado;
* Eliminado é irreversível no portal e não pode ser recuperado por qualquer perfil;
* o expurgo definitivo não é disponibilizado no portal e é uma operação de servidor.

A questão de recuperação que permanecia aberta na baseline de 13/08 fica, portanto, ultrapassada pela especificação actual da LEDG-2046.

### Confirmado pela LEDG-2048

* a transferência pode ter como destinatário um utilizador ou organização disponível;
* a submissão cria um pedido Pendente sem alterar a responsabilidade;
* o destinatário recebe email sobre o pedido;
* a aceitação altera a responsabilidade;
* a recusa mantém a responsabilidade;
* estado, metadados, recursos e histórico são preservados após aceitação;
* Arquivado e Eliminado não podem ser transferidos;
* o comentário é incluído quando exista;
* cancelar antes da submissão não cria pedido.

### Divergência requisito versus implementação

A LEDG-2046 define como comportamento alvo:

* `CC BY 4.0` como licença inicial, alterável;
* ponto de contacto opcional quando o produtor é uma organização.

A LEDG-2175 permanece em Backlog e descreve a situação de implementação que motivou estas alterações:

* a licença ainda necessita de melhoria para apresentar um valor por defeito;
* o ponto de contacto é actualmente obrigatório quando o produtor é uma organização.

**Conclusão:** estas duas regras são requisito alvo, não devem ser apresentadas como comportamento actual do portal até existir evidência de implementação/UAT.

### Estado D04

**Parcialmente validado.**

O conteúdo funcional das sete fichas está suficientemente sustentado para continuar no protótipo, mas a publicação oficial fica bloqueada até:

1. validar LEDG-2046 e LEDG-2048 em UAT;
2. confirmar o estado real da LEDG-2175;
3. corrigir ou condicionar no guia as afirmações sobre licença inicial e ponto de contacto;
4. validar mensagens, terminologia e interface final contra o Figma/implementação aplicável.

## 7. Revisão profunda D05, Recursos de um Conjunto de Dados

Data da revisão: 22/09/2026.

### Resultado

As seis fichas de D05 estão, no essencial, alinhadas com a LEDG-2047. A revisão independente do Conselho não identificou conflito funcional estrutural; concentrou a validação PRD nos pontos em que a evidência ainda não fecha o comportamento actual.

### Confirmado pela LEDG-2047

* Editor ou Administrador autorizado pode gerir recursos;
* cada ficheiro aceite num carregamento múltiplo origina um recurso autónomo;
* título, tipo e formato são obrigatórios e a descrição é opcional;
* tamanho e tipo MIME são preenchidos automaticamente quando disponíveis;
* recurso remoto utiliza URL e permanece Não aplicável para validação;
* alterar apenas metadados não inicia nem invalida a validação aplicável ao conteúdo vigente;
* em Conjunto de Dados Público, alterações concluídas com sucesso produzem efeito imediato;
* na substituição, Herdar modelo de validação é opcional e começa desmarcado;
* sem herança, recurso elegível fica Sem modelo;
* com herança, conserva a versão/configuração do modelo e fica Por validar;
* conteúdo não elegível fica Não aplicável;
* uma substituição falhada preserva o ficheiro e a informação vigente;
* remover exige confirmação;
* remover o último recurso não altera automaticamente o estado do Conjunto de Dados.

### Implementação observada em PRD

A evidência da LEDG-1997 regista promoção para produção do limite geral de **800 MB** e aumento do limite de XML para **100 MB**.

Em 22/09/2026, a API pública de PRD foi consultada e confirmou, entre outros elementos:

* existência de um recurso `gpkg.zip` com aproximadamente 670 MB;
* exposição de `filesize`, `mime`, `description`, `format` e tipo de recurso;
* recursos remotos WMS/WFS coexistem com ficheiros carregados;
* o frontend público disponibiliza a estrutura de separadores `Pré-visualização`, `Estrutura de dados`, `Metadados` e `Downloads`;
* o frontend de PRD contém a experiência textual `Explore os dados`.

Estas observações confirmam implementação existente, mas não substituem um teste autenticado às operações de gestão.

### Por confirmar em PRD

1. **SVG e HTML**: a evidência consultada não prova que ambos sejam actualmente rejeitados em PRD. A afirmação não deve ser publicada como facto até teste.
2. **Formatos de pré-visualização**: a ficha enumera CSV, TSV, XLS, XLSX e ODS. A LEDG-2254 alterou o preview para a Tabular API, pelo que a lista deve ser verificada no comportamento actual de PRD antes de ser fechada.
3. **Explorar dados**: existe implementação textual no frontend, mas a disponibilidade efectiva depende do recurso. Confirmar apresentação e navegação num recurso elegível.
4. **Integridade após upload/substituição**: a LEDG-2149 registou corrupção intermitente em PRD para ficheiros superiores a 1 MB. O estado Done não constitui, por si só, prova de regressão bem-sucedida.

### Conjunto mínimo de testes PRD pendentes

| Prioridade | Teste | Resultado observável |
| --- | --- | --- |
| 1 | Carregar e substituir um ficheiro superior a 1 MB e comparar o conteúdo descarregado com o original | O ficheiro descarregado corresponde integralmente ao original e não apresenta corrupção |
| 2 | Tentar adicionar um ficheiro SVG e um HTML | Registar exactamente se PRD aceita ou rejeita cada formato e a mensagem apresentada |
| 3 | Abrir recursos CSV, TSV, XLS, XLSX e ODS disponíveis em PRD | Registar em quais formatos a Pré-visualização é efectivamente apresentada e funcional |
| 4 | Abrir um recurso elegível para exploração | Confirmar se `Explore os dados` é apresentado e se conduz ao Explorador correcto |
| 5 | Verificar recurso sem validação conforme | Confirmar que o acesso/download permanece disponível, quando aplicável |

### Estado D05

**Parcialmente validado.**

Não é necessário revalidar toda a gestão de recursos. O fecho fica concentrado nos cinco testes PRD acima e na UAT da LEDG-2047.

## 8. Revisão profunda D07, Qualidade e validação de dados

Data da revisão: 22/09/2026.

### Resultado

As seis fichas de D07 estão fortemente alinhadas com a LEDG-2031. A História define de forma testável elegibilidade, associação, estados, execução, não conformidades, histórico, permissões e acessibilidade.

Contudo, a LEDG-2031 encontra-se em **READY FOR TESTING**. De acordo com a regra de fallback do projecto, isto não é suficiente para apresentar o fluxo como comportamento actual do portal.

### Requisito confirmado pela LEDG-2031

A especificação funcional define:

* formatos elegíveis CSV, TXT tabular, XLS, XLSX e ODS;
* recursos remotos, APIs e serviços de dados como Não aplicável;
* associação opcional de modelo;
* nova associação apenas com modelo Activo e versão Em vigor;
* associação a uma versão exacta e imutável;
* opção `Validar a ordem das colunas` activa por defeito;
* comparação por nome quando a ordem está desactivada, mantendo faltas/adicionais como não conformidades;
* execução apenas por acção explícita e de forma assíncrona;
* estados Sem modelo, Por validar, Em validação, Válido, Não conforme, Erro técnico e Não aplicável;
* Não conforme e Erro técnico como não bloqueantes para gestão/publicação;
* alteração de associação a colocar o recurso em Por validar;
* remoção da associação a colocar o recurso em Sem modelo;
* nova versão do modelo sem migração automática da associação existente;
* preservação do histórico ligado ao conteúdo e à versão utilizados;
* controlo de permissões no contexto aplicável;
* requisitos de acessibilidade WCAG 2.2 AA.

Estes pontos são **Requisito**, não evidência suficiente de **Implementação actual em PRD**.

### Evidência observada em PRD

Em 22/09/2026 foi revisto um Conjunto de Dados público recente com recurso CSV.

No HTML público não foram encontradas ocorrências específicas do novo Validador para:

* `Sem modelo`;
* `Por validar`;
* `Em validação`;
* `Não conforme`;
* `Validar a ordem das colunas`;
* `modelo de validação`.

As ocorrências de `Válido` e `Erro técnico` pertenciam a validações genéricas do frontend e ao formulário de suporte, não ao Validador de Dados.

A API pública do recurso CSV expôs os campos:

`checksum, created_at, description, extras, filesize, filetype, format, harvest, id, internal, last_modified, latest, metrics, mime, preview_url, schema, title, type, url`.

Não foram observados campos públicos específicos para estado, resultado ou associação do novo Validador.

### Interpretação

A ausência destes elementos no Frontoffice público **não prova** que o fluxo autenticado de Backoffice não esteja disponível em PRD.

Prova apenas que o comportamento do Validador não pode ser confirmado através da superfície pública analisada.

Por isso, as seis fichas de D07 permanecem no protótipo como conteúdo funcional preparado, mas **não devem ser apresentadas como comportamento actual do PRD até validação autenticada**.

### Conjunto mínimo de testes PRD autenticados

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Abrir a gestão de um recurso CSV com Editor/Administrador autorizado | A área de validação existe e apresenta o estado actual aplicável |
| 2 | Associar um modelo a um recurso elegível | São apresentados modelos disponíveis; confirmar estado real do modelo/versão, configuração da ordem e estado resultante do recurso |
| 3 | Executar uma validação | A acção é explícita; observar transição de estado e resultado final real em PRD |
| 4 | Produzir ou utilizar um caso Não conforme | Confirmar detalhe efectivamente apresentado e verificar que o recurso/dataset continua gerível e acessível |
| 5 | Alterar ou remover a associação | Registar os estados reais resultantes e verificar preservação do resultado anterior/histórico |
| 6 | Substituir o ficheiro de um recurso previamente validado | Confirmar que o resultado anterior não é apresentado como resultado actual e observar a opção real de herança do modelo |
| 7 | Consultar histórico | Confirmar exactamente quais campos e detalhes estão disponíveis em PRD |
| 8 | Repetir as operações principais com teclado | Confirmar foco, nomes acessíveis, estados/mensagens e ausência de dependência exclusiva da cor |

### Estado D07

**Por confirmar em PRD para publicação como comportamento actual.**

Não é necessário rediscutir a LEDG-2031. O que falta é comprovar, através dos oito testes acima, quais partes da especificação já correspondem ao comportamento efectivamente disponível em produção.

Se PRD divergir da LEDG-2031, o Manual deve descrever **PRD como Implementação actual** e registar separadamente a divergência para correcção do produto.

## 9. Revisão profunda CM, Catálogo de Modelos

Data da revisão: 22/09/2026.

### Resultado

As nove fichas do Catálogo de Modelos estão fortemente alinhadas com a LEDG-2049, actualmente em **IN UAT**.

A especificação é suficientemente detalhada para servir como fonte funcional e para preparar testes, mas o estado UAT não prova, por si só, que o comportamento esteja disponível e estável em PRD.

### Requisito confirmado pela LEDG-2049

A História define, entre outros pontos:

* Catálogo global pesquisável, filtrável, ordenável e paginado;
* Editor com consulta de modelos, versões e utilização, sem alteração, auditoria ou acesso a eliminados;
* Administrador com operações administrativas, inferência, auditoria e consulta de eliminados;
* criação manual ou por inferência;
* primeira gravação a criar modelo e versão v1 em Rascunho;
* no máximo um Rascunho por modelo;
* versão activada imutável;
* estados de versão Rascunho, Em vigor e Substituída;
* modelo Activo ou Inactivo, com eliminação lógica quando elegível;
* inferência para CSV, TXT tabular, XLS, XLSX e ODS;
* inferência limitada a 1.000 linhas ou 5 MB descomprimidos;
* apenas primeira folha em XLS, XLSX e ODS;
* até cinco valores distintos e não vazios por campo na proposta;
* normalização de nomes segundo Unicode NFC, caixa e espaços;
* activação bloqueada perante regras incompatíveis/inactivas ou catálogo de regras indisponível;
* nova versão sem migração automática das associações existentes;
* inactivação bloqueada enquanto existir Rascunho;
* eliminação apenas quando nenhuma versão foi alguma vez associada;
* modelos eliminados não recuperáveis nesta entrega;
* 20 resultados por página;
* preservação de pesquisa, filtros, ordenação e página ao regressar do detalhe;
* utilização e auditoria administrativas rastreáveis;
* WCAG 2.2 AA e contratos de erro/conflito aplicáveis.

Estes pontos são **Requisito** e não devem ser descritos no Manual como comportamento actual até serem confirmados em PRD.

### Evidência observada em PRD

Em 22/09/2026 foram revistos:

* o `main` oficial de `amagovpt/dadosgov-fe`;
* o HTML público actual do portal em PRD.

Não foram encontradas ocorrências específicas para:

* `Catálogo de Modelos`;
* `Guardar e activar`;
* `1.000 linhas`;
* `Em vigor`;
* `Catálogo de regras`;
* `modelo de validação`.

A expressão `Rascunho` existe no frontend actual, mas em contextos de outras funcionalidades e não constitui evidência do Catálogo de Modelos.

A superfície pública não permite validar as operações administrativas do Catálogo.

### Interpretação

Não existe evidência suficiente para afirmar que as nove fichas de CM descrevem actualmente PRD.

A ausência na superfície pública também não demonstra que o Backoffice autenticado esteja ausente.

Assim, o conteúdo permanece no protótipo como documentação preparada a partir do requisito aprovado, mas fica **Por confirmar em PRD** para publicação como Manual do comportamento actual.

### Conjunto mínimo de testes PRD autenticados

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Aceder ao Catálogo como Editor e como Administrador | Confirmar existência da área, modelos visíveis e diferenças reais de permissões |
| 2 | Criar manualmente um modelo e guardar pela primeira vez | Confirmar campos exigidos, estado inicial, versão criada e mensagens reais |
| 3 | Criar um modelo por inferência com CSV elegível | Confirmar proposta, campos/tipos/amostras, limites observáveis e ausência de activação automática |
| 4 | Repetir inferência com XLS/XLSX/ODS com várias folhas | Confirmar tratamento real da primeira folha, folhas adicionais e erros |
| 5 | Activar um Rascunho | Confirmar pré-condições, mensagens, estado do modelo e estado da versão |
| 6 | Criar e activar uma nova versão | Confirmar existência de um único Rascunho, transição Em vigor/Substituída e imutabilidade da versão activada |
| 7 | Inactivar e reactivar um modelo | Confirmar restrições reais e impacto em novas associações |
| 8 | Consultar utilização e auditoria com Editor e Administrador | Confirmar exactamente que informação cada perfil consegue consultar |
| 9 | Tentar eliminar modelo nunca utilizado e modelo com utilização histórica | Confirmar elegibilidade, confirmação, irreversibilidade e visibilidade posterior |
| 10 | Validar listagem com mais de 20 modelos e regressar do detalhe | Confirmar paginação, pesquisa, filtros, ordenação e preservação de contexto |
| 11 | Executar os fluxos principais apenas por teclado e com NVDA quando aplicável | Confirmar foco, nomes acessíveis, estados, erros e confirmações no contexto real |

### Pontos que não devem ser publicados sem PRD

Até execução destes testes, não apresentar como comportamento actual:

* limite exacto de 20 resultados por página;
* 1.000 linhas ou 5 MB;
* primeira folha para XLS/XLSX/ODS;
* máximo de cinco valores de exemplo;
* regras exactas de normalização de nomes;
* existência de apenas um Rascunho;
* estados e transições de versão;
* irreversibilidade de modelos eliminados;
* acesso do Editor à utilização e restrição de auditoria;
* comportamento de concorrência e conflitos;
* mensagens e confirmações;
* preservação automática do contexto da listagem.

### Estado CM

**Por confirmar em PRD para publicação como comportamento actual.**

A LEDG-2049 continua a ser a fonte funcional para UAT. O Manual deve usar apenas o comportamento que os testes PRD autenticados confirmarem.

## 10. Revisão profunda D06, Explorador de dados

Data da revisão: 22/09/2026.

### Resultado

As oito fichas de D06 estão fortemente alinhadas com a LEDG-2276 e com a documentação técnica do Explorador.

A LEDG-2276 encontra-se em **READY FOR UAT** e consolida várias capacidades que, na baseline de Agosto, ainda estavam em decisão. Entre elas: oito tipos de gráfico, exportação JSON, exportação PNG, ecrã inteiro, paginação 10/50/200, estado persistente no URL e ausência de alertas automáticos de qualidade nesta entrega.

No entanto, a integração de entrada no Explorador depende da LEDG-2199, também em **READY FOR UAT**.

### Requisito confirmado pela LEDG-2276

A História define:

* quatro áreas: Dados, Estrutura, Métricas e Gráfico;
* formatos elegíveis CSV, TXT tabular delimitado, XLS e XLSX;
* filtros por coluna combinados por AND;
* validação local de filtros;
* ordenação por uma coluna;
* selecção de colunas visíveis;
* paginação de 10, 50 ou 200 registos;
* filtros disponíveis nas quatro áreas;
* filtros a afectar Dados e Gráfico, mantendo Estrutura e Métricas sobre o recurso completo;
* exportação CSV e JSON da página actual e colunas visíveis;
* oito tipos de gráfico;
* gráfico sobre a página actual, até 200 registos, sem Soma ou Contagem;
* exportação PNG;
* modo de ecrã inteiro;
* persistência no URL da área, filtros, ordenação, paginação, colunas e configuração de gráfico;
* remoção selectiva de parâmetros incompatíveis após alteração da estrutura;
* estados de processamento, indisponibilidade, erro e ausência de resultados;
* interface responsiva, bilingue e acessível;
* ausência de alertas automáticos de qualidade na área Métricas nesta entrega.

A documentação técnica do Explorador confirma a existência de implementação para filtros, paginação, exportações, URL, i18n, tratamento de erros e as quatro vistas.

### Divergência histórica ultrapassada

A baseline de 13/08/2026 tratava JSON, PNG, ecrã inteiro, oito gráficos e outras extensões como implementação ainda não aprovada.

A LEDG-2276 actual consolidou funcionalmente essas capacidades. Assim, essa divergência histórica deixa de bloquear o requisito.

O Manual, contudo, continua obrigado a descrever apenas o que estiver efectivamente disponível em PRD.

### Evidência observada em PRD

Em 22/09/2026 foi revisto o frontend oficial actualmente associado ao portal.

No componente de detalhe de recurso, o bloco com o texto **Explore os dados** encontra-se explicitamente com a classe `hidden`.

O Frontoffice público apresenta actualmente a **Pré-visualização simples**, incluindo:

* Pré-visualização;
* Estrutura de dados;
* Metadados;
* Downloads.

O código actual da Pré-visualização carrega dados tabulares através dos endpoints internos `proxy-csv` ou `proxy-spreadsheet`.

Não foi encontrada uma rota pública do novo Explorador acessível a partir do recurso analisado, nem resultados públicos indexados que demonstrem o percurso completo D06 em PRD.

### Distinção obrigatória

**Pré-visualização simples** e **Explorador de dados** não são a mesma funcionalidade.

A primeira está actualmente observável em PRD.

A segunda é a funcionalidade definida na LEDG-2276, cuja entrada depende da acção **Explorar dados** da LEDG-2199.

Não utilizar a existência da Pré-visualização como prova de disponibilidade do Explorador.

### Conjunto mínimo de testes PRD após integração

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Abrir um recurso elegível no Frontoffice | A acção **Explorar dados** é visível e abre o Explorador correcto |
| 2 | Abrir o Explorador | São apresentadas Dados, Estrutura, Métricas e Gráfico sobre o mesmo conteúdo vigente |
| 3 | Aplicar dois filtros e ocultar uma coluna filtrada | Os filtros combinam-se por AND; ocultar coluna não remove o filtro; Limpar remove filtros e preserva visibilidade |
| 4 | Ordenar e alterar paginação | Só uma coluna ordena; estão disponíveis 10, 50 e 200 registos por página |
| 5 | Exportar CSV e JSON | O ficheiro contém apenas a página actual e as colunas visíveis |
| 6 | Consultar Estrutura e Métricas após filtrar | Ambas continuam a representar o recurso completo |
| 7 | Configurar os oito tipos de gráfico | Apenas configurações compatíveis são permitidas e o gráfico representa a página actual sem agregação |
| 8 | Exportar PNG e utilizar ecrã inteiro | PNG corresponde ao estado visível; ecrã inteiro abre/fecha por controlo e Esc com retorno de foco |
| 9 | Copiar e reabrir URL configurado | O estado suportado da exploração é reposto sem conceder permissões |
| 10 | Introduzir filtro inválido e provocar ausência de resultados | Erro é associado ao campo sem pedido inválido; ausência de resultados é distinguida de erro |
| 11 | Simular indisponibilidade/reprocessamento | Não são apresentados dados antigos como actuais e existe mensagem recuperável |
| 12 | Executar navegação por teclado e NVDA | Separadores, filtros, tabela, paginação, exportações, gráfico e ecrã inteiro são operáveis e compreensíveis |

### Estado D06

**Por confirmar em PRD para publicação como comportamento actual.**

O conteúdo deve permanecer no protótipo porque está alinhado com a LEDG-2276, mas não deve ser apresentado como funcionalidade actualmente disponível até a acção de entrada estar exposta e o conjunto mínimo acima ser validado em PRD.

## 11. Revisão profunda D08, APIs e serviços de dados

Data da revisão: 22/09/2026.

### Resultado

D08 combina dois domínios distintos:

1. utilização pública da API do portal e consulta das APIs registadas;
2. gestão autenticada de registos de APIs no Backoffice.

A primeira parte foi validada directamente em PRD. A segunda tem forte evidência de implementação e tickets concluídos, mas requer observação autenticada em PRD segundo a regra de fallback deste projecto.

### Implementação actual confirmada em PRD público

Foram revistos:

* `/pt/recursos/desenvolvimento/referencia-api`;
* `/pt/recursos/desenvolvimento/tutorial-api`;
* `/api/1/dataservices/`;
* um registo público real de API no catálogo.

O tutorial actual confirma explicitamente:

* para operações de escrita, o utilizador deve autenticar-se e obter uma chave nas definições do perfil;
* a chave é enviada no cabeçalho HTTP `X-API-KEY`;
* as permissões sobre o recurso continuam a ser verificadas;
* respostas paginadas fornecem `previous_page` e `next_page`;
* estes campos ficam `null` quando não existe página nesse sentido;
* modificações e eliminações através da API são definitivas;
* não existe actualmente uma área de testes para experimentar essas alterações.

A referência actual contém referências a Swagger e OpenAPI.

### Catálogo público de APIs

A API pública `/api/1/dataservices/` devolve, entre outros:

* `base_api_url`;
* `access_type`;
* `business_documentation_url`;
* `technical_documentation_url`;
* `machine_documentation_url`;
* relação com Conjuntos de Dados;
* organização ou proprietário;
* identificadores e URLs do registo;
* datas de criação/modificação e metadados aplicáveis.

Foi consultado um registo real, **AGIT Planner**, publicado por uma organização cujo payload público contém o emblema `public-service`, com URL base, tipo de acesso e três Conjuntos de Dados relacionados.

O detalhe público apresenta a informação do registo e os conteúdos relacionados aplicáveis.

### Fichas sustentadas pelo PRD público

Podem ser mantidas, no âmbito actual:

* **Escolher a API adequada**;
* **Consultar a referência da API do portal**;
* **Consultar uma API do catálogo**.

A formulação deve continuar a evitar expor chaves reais ou sugerir que a data de actualização do registo prova actualização dos dados do serviço.

### Gestão autenticada: evidência disponível

O `main` actual do frontend filtra as organizações elegíveis para criação por emblema `public-service`.

A interface contém mensagens que indicam que uma API só pode ser publicada em nome de organização com emblema **Serviço público**.

O frontend actual também utiliza os tipos de acesso:

* `open`;
* `open_with_account`;
* `restricted`.

Tickets concluídos confirmam implementação para:

* associação opcional de Conjuntos de Dados;
* guardar como rascunho ou publicar;
* edição de API;
* tipos de acesso;
* apresentação/gestão dos estados administrativos.

Isto é **evidência de implementação**, mas não substitui o teste autenticado em PRD.

### Conjunto mínimo de testes PRD autenticados

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Aceder à criação com membro de organização com emblema Serviço público | A organização elegível é apresentada como produtor e o fluxo de criação pode avançar |
| 2 | Aceder com utilizador sem organização elegível | A criação é impedida ou a ausência de produtor elegível é comunicada exactamente como PRD implementar |
| 3 | Repetir a condição com Administrador do portal, quando aplicável | Confirmar se a mesma regra de produtor se aplica efectivamente ao perfil administrativo |
| 4 | Criar com acesso Aberto, Aberto com conta e Restrito | Confirmar campos, valores guardados, validações e informação apresentada no detalhe |
| 5 | Avançar sem associar Conjunto de Dados | Confirmar que a associação é efectivamente opcional |
| 6 | Guardar como rascunho e publicar | Confirmar estados, mensagens e presença/ausência na área pública |
| 7 | Editar descrição, URL base, documentação e associações | Confirmar persistência das alterações e comportamento ao remover uma associação |
| 8 | Confirmar listagem administrativa após alterações | Validar pesquisa, estado e informação actualmente exposta, sem antecipar itens ainda em To Do/In Review |
| 9 | Executar criação/edição apenas por teclado | Confirmar ordem de foco, labels, erros, controlos e mensagens no contexto real |

### Pontos que não devem ser antecipados

A LEDG-2026 permanece To Do e a LEDG-2379 está In Review. Melhorias de novas colunas, filtros e implementação de endpoints das listagens administrativas não devem ser descritas como concluídas no Manual até PRD as apresentar.

### Divergência editorial

A fonte estática/PDF contém uma revisão mais recente da ficha de referência API do que a fonte dinâmica antiga.

A versão a preservar deve ser a que corresponde ao conteúdo confirmado no PRD actual, incluindo `X-API-KEY`, paginação, OpenAPI e o aviso sobre operações definitivas.

### Estado D08

**Parcialmente validado.**

As três fichas de consulta pública estão suportadas pelo PRD actual. As três fichas de gestão autenticada ficam pendentes apenas do conjunto mínimo de testes PRD acima.

## 12. Revisão profunda D10, Harvester

Data da revisão: 22/09/2026.

### Resultado

D10 descreve uma funcionalidade existente e activa em PRD, mas a maior parte das tarefas do Manual ocorre no Backoffice autenticado.

A revisão conseguiu confirmar em PRD a infraestrutura, os tipos activos e os estados públicos das fontes. As regras de edição, preview e validação têm evidência forte em Jira e no frontend actual, mas permanecem pendentes de observação autenticada em PRD para serem tratadas como comportamento actual.

### Implementação actual observada em PRD público

O endpoint `/api/1/harvest/backends/` devolveu **15 backends habilitados**:

`ckan`, `ckanpt`, `cswudata`, `csw-dcat`, `csw-iso-19139`, `dcat`, `dkan`, `dgt`, `ogc`, `apambiente`, `dgtIne`, `ine`, `inehvd`, `maaf` e `odspt`.

A própria resposta confirma que filtros, funcionalidades e configurações adicionais dependem do backend. Isto suporta a formulação do guia de que os tipos e opções variam por ambiente/implementação.

O endpoint público de fontes devolveu **42 Harvesters** em PRD.

Na consulta de 22/09/2026:

* 41 fontes estavam com validação `accepted`;
* 1 fonte estava com validação `pending`;
* não foi encontrada fonte `refused` na amostra completa;
* a resposta expõe backend, organização, configuração, planeamento, último trabalho, estado de validação e permissões;
* para utilizador anónimo, as permissões `delete`, `edit`, `preview`, `run`, `schedule` e `validate` surgiram como `false`.

Foram observados trabalhos concluídos em fontes reais, confirmando a existência operacional do conceito de `last_job` e estado `done`.

### Política de preview confirmada na LEDG-2323

A decisão final registada é:

* preview de configuração sem `organization` exige **sysadmin**;
* no fluxo de edição, quando o utilizador pode editar, o frontend envia a organização da fonte;
* quando não pode editar, utiliza o preview da fonte existente, sujeito à permissão `preview` do objecto;
* pré-visualizar configuração ainda não guardada exige direitos de edição;
* o botão deve respeitar a permissão de preview;
* as rotas de preview receberam limite específico de utilização.

Esta decisão substitui a situação antiga em que uma conta meramente autenticada podia chegar ao preview de configuração sem autorização adequada.

### Edição: evidência de implementação

O frontend actual distingue:

* **Administrador da organização**: pode editar Nome, Descrição e Filtros;
* **Administrador do portal**: pode editar também os campos avançados, incluindo URL, implementação/tipo, planeamento e opções avançadas;
* utilizadores sem permissão de edição consultam o formulário em modo de leitura.

A LEDG-2296 foi testada em TST com Administrador do sistema e, posteriormente, com Editor/Administrador de organização, confirmando a restrição do produtor ao contexto aplicável.

Por regra do projecto, estas evidências não substituem uma confirmação autenticada em PRD.

### Aprovação e rejeição

O frontend actual apresenta os estados `pending`, `accepted` e `refused`.

Em estado pendente, as acções Aprovar e Rejeitar são apresentadas ao administrador do sistema.

A aprovação/rejeição da fonte e a execução do Harvester são operações distintas.

**Por confirmar em PRD:** mensagem final, obrigatoriedade efectiva do motivo de rejeição, comentário de aprovação e comportamento exacto após cada decisão.

### Volatilidade por backend

Existem alterações recentes ainda não estabilizadas em produção, nomeadamente:

* LEDG-2518, Harvester DGT, em READY FOR TESTING;
* LEDG-2530, campos/formatos do Harvester DGT, em READY FOR TESTING;
* LEDG-2513, CMLisboa, em Ready for review.

Estas alterações são específicas dos backends e **não devem ser incorporadas como regras genéricas do Manual D10** até estarem efectivamente reflectidas em PRD.

### Conjunto mínimo de testes PRD autenticados

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Abrir uma fonte como Editor/consulta e como Administrador de organização | Confirmar campos visíveis, modo de leitura e campos efectivamente editáveis por cada perfil |
| 2 | Editar Nome, Descrição e Filtros como Administrador da organização | Confirmar gravação e persistência após reabrir; URL, Tipo e Planeamento permanecem não editáveis nesse perfil, se PRD assim implementar |
| 3 | Abrir a mesma fonte como Administrador do portal | Confirmar disponibilidade real dos campos avançados |
| 4 | Configurar filtro suportado pelo backend, guardar e reabrir | Filtro permanece registado e produz o efeito esperado no preview |
| 5 | Executar preview como utilizador autorizado e como utilizador sem permissão | Confirmar disponibilidade/403 ou ocultação da acção e ausência de efeitos persistentes inesperados |
| 6 | Consultar Trabalhos e detalhe de um trabalho | Confirmar estados, itens, paginação e Linhas por página efectivamente disponíveis |
| 7 | Aprovar fonte pendente como Administrador do sistema | Confirmar mensagem, estado resultante e que a aprovação não equivale a execução |
| 8 | Rejeitar fonte pendente | Confirmar se motivo é obrigatório, estado resultante e feedback ao proprietário |
| 9 | Executar os fluxos principais apenas por teclado | Confirmar foco, labels, estados, modais, erros e acções no contexto real |

### Estado D10

**Parcialmente validado.**

A preparação da fonte, dependência do backend/ambiente e existência dos estados/trabalhos têm evidência directa em PRD. As instruções autenticadas permanecem pendentes apenas do conjunto mínimo de testes acima.

O Manual deve continuar genérico quanto a backends específicos e nunca recomendar alteração de tipo como contorno para erros de configuração.

## 13. Revisão profunda D11, Seguir conteúdos e notificações

Data da revisão: 22/09/2026.

### Resultado

D11 combina duas capacidades que se encontram em estados diferentes:

1. relação técnica de seguimento (`Follow/Unfollow`), actualmente exposta no Frontoffice com terminologia de **Favoritos**;
2. sistema de notificações, que já existe para vários eventos, mas cuja integração com conteúdos seguidos ainda está em evolução.

### Implementação actual observada em PRD

Foram consultados em PRD exemplos públicos de:

* Conjunto de Dados;
* API;
* Organização;
* Reutilização.

Nos quatro tipos, o HTML actual contém **Adicionar aos favoritos** e **Remover dos favoritos**.

Não foram encontradas as acções públicas **Seguir** ou **Deixar de seguir** nestes conteúdos.

Assim, a terminologia do D11 representa a evolução aprovada como direcção funcional, mas **não corresponde ainda ao comportamento actual de PRD**.

### Relação técnica confirmada

A LEDG-2289 concluiu que:

* **Adicionar aos favoritos** executa tecnicamente `Follow`;
* **Remover dos favoritos** executa `Unfollow`;
* Subscrições, Acompanhamentos, Seguidores e Subscritores eram utilizados de forma inconsistente para a mesma relação ou conceitos relacionados;
* o Backend utiliza de forma mais coerente `Follow`, `Follower`, `Following` e `Unfollow`.

A decisão de evolução foi uniformizar o conceito para **Seguir**, sem criar nesta fase uma relação distinta de Favoritos.

### Estado da evolução

A LEDG-1960, **Frontoffice - Reposição de Funcionalidade - Seguir conteúdos e notificações associadas**, encontra-se **To Do**.

A LEDG-2305, **Backoffice - Notificações**, encontra-se **In Progress**.

A LEDG-2306, relativa a Conteúdos seguidos e Seguidores no perfil, encontra-se em **Backlog**.

Portanto, estes tickets não devem ser usados para antecipar o comportamento actual do Manual.

### Notificações actualmente suportadas

A análise LEDG-2289 identificou notificações existentes para eventos relacionados com:

* Discussões;
* Organizações;
* Transferências;
* Harvesters.

O frontend actual de Notificações possui tratamento específico para validação de Harvester, incluindo:

* estado da validação;
* nome da fonte;
* ligação **Ver harvester**;
* acção **Marcar como lida**.

Outros tipos de notificação actualmente caem num tratamento genérico **Nova notificação**, podendo ser marcados como lidos.

A LEDG-2322 e a LEDG-2328 corrigiram defeitos de notificações de organização e discussão no Backend.

### Follow não equivale actualmente a notificação

A LEDG-2289 não identificou implementação que estabeleça:

`Follow → alteração do conteúdo seguido → Notification para o seguidor`.

Logo, **seguir/favoritar um conteúdo não pode ser documentado actualmente como garantia de receber notificações das suas alterações**.

A matriz de eventos e notificações prevista na LEDG-2305 continua a ser a fonte de evolução para definir eventos, destinatários, categorias e canais.

### Impacto nas cinco fichas de D11

| Ficha | Estado face a PRD |
| --- | --- |
| Seguir um conteúdo | Não corresponde à terminologia actual de PRD; hoje a acção é Adicionar aos favoritos |
| Deixar de seguir um conteúdo | Não corresponde à terminologia actual de PRD; hoje a acção é Remover dos favoritos |
| Consultar uma notificação | Funcionalidade existente, mas percurso autenticado deve ser validado em PRD |
| Tratar um aviso de validação de harvester | Implementação actual fortemente suportada; validar sessão PRD antes de fechar |
| Resolver dificuldades com notificações | Conteúdo genérico aceitável, desde que não prometa eventos/canais ainda não implementados |

### Decisão para o Manual

Não regressar editorialmente à terminologia **Favoritos** apenas para antecipar uma publicação que ficaria rapidamente desactualizada.

Enquanto a LEDG-1960 não estiver disponível em PRD:

* manter D11 no protótipo como conteúdo preparado;
* não publicar as fichas **Seguir** e **Deixar de seguir** como instruções do comportamento actual;
* se for necessário documentar urgentemente o PRD actual, criar uma versão explicitamente identificada como comportamento actual com **Adicionar aos favoritos/Remover dos favoritos**, sem prometer notificações associadas;
* não afirmar que seguir um conteúdo gera notificações de actualizações.

### Conjunto mínimo de testes PRD após evolução

| Prioridade | Teste | Resultado observável necessário |
| --- | --- | --- |
| 1 | Abrir Organização, Conjunto de Dados, Reutilização e API autenticado | A acção é apresentada como **Seguir** nos quatro tipos |
| 2 | Seleccionar Seguir e reabrir o conteúdo | A relação persiste e a acção passa a **Deixar de seguir** |
| 3 | Seleccionar Deixar de seguir | A relação termina e **Seguir** volta a estar disponível |
| 4 | Tentar a acção sem autenticação | É apresentada a necessidade de autenticação conforme implementação real |
| 5 | Consultar área de Notificações com eventos existentes | Conteúdo, ligação, estado lido/não lido e destino correspondem ao evento |
| 6 | Validar evento de Harvester | A ligação encaminha para a fonte e marcar como lido não executa aprovação/rejeição |
| 7 | Quando LEDG-2305 definir eventos de seguimento, provocar um evento notificável | Apenas destinatários e canais definidos na matriz recebem o aviso |
| 8 | Operar acções e notificações por teclado | Foco, nomes acessíveis, estados e mensagens são perceptíveis |

### Estado D11

**Por confirmar em PRD para publicação como comportamento actual.**

O principal bloqueio não é falta de definição conceptual. É a diferença entre a terminologia/integração alvo e o que PRD apresenta hoje.

## 14. Decisões e lacunas transversais

### Requisito/decisão confirmada

O Validador é opcional, explícito, assíncrono e não bloqueante para publicação/manutenção do recurso no âmbito consolidado.

### Questões em aberto

Continuam a exigir decisão ou evidência suficiente, conforme aplicável:

* comportamento concorrente residual entre operações de ciclo de vida e pedidos de transferência, apenas onde não estiver coberto pelas LEDG-2046/2048;
* contratos das não conformidades e histórico do Validador;
* regras finais de Catálogo de Modelos;
* consistência entre fonte editorial dinâmica, estática e PDF;
* acessibilidade real dos PDFs;
* acessibilidade e responsividade da experiência web no contexto final.

## 15. Prioridade de revisão profunda

### Prioridade 1

Revisões profundas concluídas: D04, D05, D06, D07, D08, D10, D11 e CM.

Próxima vaga prioritária:

1. D02, Organizações e permissões
2. D09, Reutilizações
3. D12, Discussões e comunidade
4. D13, Perfil e actividade

Motivo: estas áreas têm implementação significativa e impacto transversal, mas ainda exigem harmonização entre comportamento actual, documentação e permissões.

### Prioridade 2

1. D02, Organizações e permissões
2. D09, Reutilizações
3. D12, Discussões e comunidade
4. D13, Perfil e actividade

Motivo: fluxos base estão definidos, mas faltam verificações de detalhe, sobretudo perfis, notificações e evolução da conta.

### Fecho editorial

D01, D03 e D14 devem receber uma passagem final de consistência, terminologia, acessibilidade e imagens, sem reabrir regras já validadas sem nova evidência.

## 16. Critério para marcar um guia como Validado

Um guia só passa a **Validado no âmbito actual** quando:

1. todas as fichas têm fonte funcional ou evidência de implementação identificável;
2. regras sensíveis de perfil, permissão, estado e validação estão confirmadas;
3. não contém funcionalidades futuras apresentadas como actuais;
4. mensagens e terminologia estão alinhadas com a interface aplicável;
5. as dependências e questões em aberto que afectem o percurso estão resolvidas ou explicitamente fora de âmbito;
6. a experiência web foi verificada quanto a navegação, responsividade e acessibilidade;
7. o PDF correspondente foi validado quanto a conteúdo e, antes de publicação oficial, também quanto a apresentação visual e acessibilidade documental.

## 17. Próxima acção

Iniciar revisão profunda de D02, Organizações e permissões. D11 já foi revisto e fica Por confirmar em PRD enquanto a terminologia e a integração de notificações previstas na LEDG-1960/2305 não estiverem disponíveis.
