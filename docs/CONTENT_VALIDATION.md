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
| D06 | Explorador de dados | 8 | **Parcialmente validado** | Implementação documentada com quatro vistas; LEDG-2199 em READY FOR UAT; LEDG-2188 Done | Harmonizar requisito, implementação e UX/UI final; validar em UAT filtros, paginação, ordenação, exportações, URL persistente, estados vazios, erros e acessibilidade |
| D07 | Qualidade e validação de dados | 6 | **Por confirmar em PRD** | LEDG-2031 funcionalmente consolidada e em READY FOR TESTING; PRD público revisto em 22/09/2026 não expõe os estados/acções específicos do novo Validador | Não publicar o fluxo como comportamento actual até validação autenticada em PRD; executar apenas o conjunto mínimo de testes definido nesta matriz |
| D08 | APIs e serviços de dados | 6 | **Parcialmente validado** | Conteúdo v2 inclui referência API, X-API-KEY, OpenAPI e registo de APIs | Resolver divergência entre fonte PDF/estática e fonte dinâmica; revalidar gating por organização/emblema, operações de escrita e terminologia da referência actual |
| D09 | Reutilizações | 6 | **Parcialmente validado** | Fluxos de consulta, criação, rascunho, publicação e edição estruturados | Validar integralmente transferência, permissões e estados; a própria ficha de dificuldades ainda assinala o percurso completo de transferência como dependente de validação |
| D10 | Harvester | 6 | **Parcialmente validado** | Conteúdo cobre preparação, configuração, filtros, preview, trabalhos e aprovação | Confirmar matriz actual de perfis, campos editáveis, preview, aprovação/rejeição e comportamento por ambiente; manter alinhamento com testes PPR |
| D11 | Seguir conteúdos e notificações | 5 | **Parcialmente validado** | LEDG-2289 Done e decisão de uniformização para `Seguir` | Validar matriz final de eventos/notificações, disponibilidade por tipo de conteúdo e permissões das acções associadas |
| D12 | Discussões e comunidade | 5 | **Parcialmente validado** | Percursos de consulta, criação e resposta estão estruturados | Confirmar moderação, notificações por email, visibilidade, permissões na organização e tratamento de estados sem discussões |
| D13 | Perfil e actividade | 5 | **Parcialmente validado** | Percursos básicos de perfil, conteúdos e actividade estão definidos | Revalidar campos públicos, fotografia, actividade e impacto da evolução da autenticação/conta |
| D14 | Ajuda e contactos | 6 | **Validado no âmbito actual** | LEDG-2475 Done; submissão em PPR já validada; sexta ficha recuperada e sincronizada | Não prometer confirmação automática por email enquanto LEDG-2029 estiver To Do; manter funcionalidades futuras de certificação/emblemas fora do percurso actual |
| CM | Catálogo de Modelos | 9 | **Parcialmente validado** | LEDG-2049 em IN UAT; conceitos de modelo/versionamento consolidados | Confirmar limites de inferência, normalização, volumetria, paginação/histórico, retenção de auditoria, concorrência, permissões finais, critérios de estados e UX/UI |

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

## 9. Decisões e lacunas transversais

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

## 10. Prioridade de revisão profunda

### Prioridade 1

1. CM, Catálogo de Modelos

Motivo: D04, D05 e D07 já receberam revisão profunda. CM permanece como a área de maior risco funcional ainda não aprofundada, encontrando-se em UAT.

### Prioridade 2

1. D06, Explorador de dados
2. D08, APIs e serviços de dados
3. D10, Harvester
4. D11, Seguir conteúdos e notificações

Motivo: existe implementação significativa, mas ainda há necessidade de harmonização entre comportamento, documentação, permissões e fontes editoriais.

### Prioridade 3

1. D02, Organizações e permissões
2. D09, Reutilizações
3. D12, Discussões e comunidade
4. D13, Perfil e actividade

Motivo: fluxos base estão definidos, mas faltam verificações de detalhe, sobretudo perfis, notificações e evolução da conta.

### Fecho editorial

D01, D03 e D14 devem receber uma passagem final de consistência, terminologia, acessibilidade e imagens, sem reabrir regras já validadas sem nova evidência.

## 11. Critério para marcar um guia como Validado

Um guia só passa a **Validado no âmbito actual** quando:

1. todas as fichas têm fonte funcional ou evidência de implementação identificável;
2. regras sensíveis de perfil, permissão, estado e validação estão confirmadas;
3. não contém funcionalidades futuras apresentadas como actuais;
4. mensagens e terminologia estão alinhadas com a interface aplicável;
5. as dependências e questões em aberto que afectem o percurso estão resolvidas ou explicitamente fora de âmbito;
6. a experiência web foi verificada quanto a navegação, responsividade e acessibilidade;
7. o PDF correspondente foi validado quanto a conteúdo e, antes de publicação oficial, também quanto a apresentação visual e acessibilidade documental.

## 12. Próxima acção

Iniciar revisão profunda de CM, Catálogo de Modelos. D07 já foi revisto e fica Por confirmar em PRD para publicação como comportamento actual.
