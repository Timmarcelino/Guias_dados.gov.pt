# Validação de conteúdo dos Guias do Utilizador

Última validação: 22/09/2026

## 1. Objectivo

Este documento controla a validação funcional e editorial dos 15 guias e 92 fichas existentes na branch `feature/static-routes-pdf`.

Não substitui Requirements, User Stories, critérios de aceitação, Figma aprovado, Jira, documentação técnica nem evidência de testes.

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
| D05 | Recursos de um Conjunto de Dados | 6 | **Parcialmente validado** | LEDG-2047 em READY FOR UAT; gestão de recursos consolidada | Confirmar limites de upload, elegibilidade de preview, comportamento de substituição/herança no contexto actual e executar regressão de acesso/download; LEDG-2251 está Done mas a regressão continua necessária |
| D06 | Explorador de dados | 8 | **Parcialmente validado** | Implementação documentada com quatro vistas; LEDG-2199 em READY FOR UAT; LEDG-2188 Done | Harmonizar requisito, implementação e UX/UI final; validar em UAT filtros, paginação, ordenação, exportações, URL persistente, estados vazios, erros e acessibilidade |
| D07 | Qualidade e validação de dados | 6 | **Parcialmente validado** | Princípios do Validador consolidados; LEDG-2031 em READY FOR TESTING | Fechar contrato de não conformidades, aviso perante não conformidade, paginação/exportação/retenção do histórico, concorrência e volumetria |
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

## 7. Decisões e lacunas transversais

### Requisito/decisão confirmada

O Validador é opcional, explícito, assíncrono e não bloqueante para publicação/manutenção do recurso no âmbito consolidado.

### Questões em aberto

Continuam a exigir decisão ou evidência suficiente, conforme aplicável:

* recuperação e expurgo de Conjuntos de Dados eliminados;
* concorrência entre transferência, arquivo, eliminação e recuperação;
* permissões finais da transferência;
* contratos das não conformidades e histórico do Validador;
* regras finais de Catálogo de Modelos;
* consistência entre fonte editorial dinâmica, estática e PDF;
* acessibilidade real dos PDFs;
* acessibilidade e responsividade da experiência web no contexto final.

## 8. Prioridade de revisão profunda

### Prioridade 1

1. D04, Publicar e gerir Conjuntos de Dados
2. D05, Recursos de um Conjunto de Dados
3. D07, Qualidade e validação de dados
4. CM, Catálogo de Modelos

Motivo: concentram regras de ciclo de vida, permissões, estados e operações com maior risco funcional e estão actualmente em UAT/Testes.

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

## 9. Critério para marcar um guia como Validado

Um guia só passa a **Validado no âmbito actual** quando:

1. todas as fichas têm fonte funcional ou evidência de implementação identificável;
2. regras sensíveis de perfil, permissão, estado e validação estão confirmadas;
3. não contém funcionalidades futuras apresentadas como actuais;
4. mensagens e terminologia estão alinhadas com a interface aplicável;
5. as dependências e questões em aberto que afectem o percurso estão resolvidas ou explicitamente fora de âmbito;
6. a experiência web foi verificada quanto a navegação, responsividade e acessibilidade;
7. o PDF correspondente foi validado quanto a conteúdo e, antes de publicação oficial, também quanto a apresentação visual e acessibilidade documental.

## 10. Próxima acção

Iniciar revisão profunda de D05, Recursos de um Conjunto de Dados. D04 já recebeu a primeira revisão profunda e permanece parcialmente validado até UAT e clarificação da LEDG-2175.
