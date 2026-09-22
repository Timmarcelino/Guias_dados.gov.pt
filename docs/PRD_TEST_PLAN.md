# Plano mínimo de validação autenticada em PRD

Última actualização: 22/09/2026

## 1. Objectivo

Executar apenas os testes autenticados que continuam necessários para fechar os Guias do Utilizador.

Este plano não repete validações já concluídas em GitHub Pages, API pública, Jira, documentação técnica ou revisão editorial.

Ambiente: **PRD**.

Regra: quando o comportamento observado em PRD divergir de requisito, backlog ou documentação futura, o Manual deve descrever **PRD como Implementação actual** e a divergência deve ser registada separadamente.

## 2. Regras de execução

### Fase A, leitura e navegação

Pode ser executada sem alterar dados do portal.

Inclui:

* consulta de páginas e áreas autenticadas;
* verificação de campos, permissões, estados e acções disponíveis;
* navegação por teclado;
* comparação entre perfis quando existirem contas de teste adequadas.

### Fase B, escrita controlada

**Não executar sem autorização explícita de escrita em PRD na conversa actual.**

Inclui:

* criar ou editar conteúdos;
* carregar/substituir ficheiros;
* publicar, arquivar, eliminar ou transferir;
* associar modelos;
* executar validações;
* aprovar/rejeitar Harvesters;
* criar/responder a Discussões;
* seguir/deixar de seguir;
* alterar membros, perfis, emblemas ou organizações.

Dados de teste, contas e conteúdos a utilizar: **Por confirmar** antes da execução da Fase B.

## 3. Test Cases, Fase A

### PRD-R01, Perfil e Organizações

**Rastreabilidade:** D02, D13; LEDG-2113, LEDG-1941, LEDG-1943, LEDG-2468, LEDG-2483.

**Summary:** confirmar acesso autenticado a perfis e diferenças de visibilidade/permissão entre área pessoal e organização.

**Preconditions:**

* sessão PRD autenticada;
* utilizador com acesso a Meu perfil;
* quando possível, utilizador membro de uma organização;
* segundo perfil com permissões superiores, se disponível.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir o perfil de outro utilizador | Perfil existente | O perfil é acessível após autenticação e apresenta apenas os campos actualmente disponíveis |
| 2 | Abrir Meu perfil | Nenhum | São apresentadas as áreas actualmente disponíveis para a conta |
| 3 | Abrir Conjuntos de Dados, API, Reutilizações e Recursos comunitários | Nenhum | Registar quais áreas existem, conteúdos e ordenação actualmente disponibilizados |
| 4 | Abrir Actividade | Nenhum | São apresentados os registos actuais; não assumir pesquisa textual se não existir |
| 5 | Abrir uma organização onde o utilizador é membro | Organização disponível | São apresentadas apenas as acções permitidas ao perfil |
| 6 | Abrir Membros | Nenhum | Registar pedidos, convites, membros e acções actualmente visíveis |
| 7 | Abrir edição da organização | Nenhum | Registar campos editáveis e presença/ausência da secção Emblemas |
| 8 | Repetir a navegação por teclado | Tab, Shift+Tab, Enter, Esc | Foco visível, ordem coerente, labels e controlos operáveis |

### PRD-R02, Conjuntos de Dados e ciclo de vida

**Rastreabilidade:** D04; LEDG-2046, LEDG-2048, LEDG-2175.

**Summary:** confirmar interface actual de criação/edição e disponibilidade das acções de ciclo de vida sem executar alterações.

**Preconditions:**

* sessão PRD autenticada;
* acesso a pelo menos um Conjunto de Dados gerível;
* quando possível, exemplos nos estados Rascunho, Público, Arquivado ou Eliminado.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir a criação de Conjunto de Dados | Nenhum | Registar campos, obrigatoriedade visual, licença inicialmente apresentada e ponto de contacto |
| 2 | Abrir um Rascunho existente | Nenhum | Registar metadados em falta e acções disponíveis |
| 3 | Abrir um Conjunto de Dados Público | Nenhum | Registar acções de edição, arquivo, transferência e eliminação conforme o perfil |
| 4 | Abrir um Arquivado | Nenhum | Confirmar visibilidade e acções actualmente disponíveis |
| 5 | Abrir filtro Eliminados com perfil autorizado | Nenhum | Confirmar consulta disponível e ausência/presença de acção de recuperação |
| 6 | Abrir Transferir sem submeter | Nenhum | Confirmar destinatários possíveis, comentário e estado inicial do pedido |
| 7 | Navegar pelos fluxos com teclado | Tab, Shift+Tab, Esc | Foco, labels, estados e modais são operáveis |

### PRD-R03, Recursos e pré-visualização

**Rastreabilidade:** D05; LEDG-2047, LEDG-1997, LEDG-2102, LEDG-2051, LEDG-2254.

**Summary:** confirmar comportamento actual de consulta, preview e exploração dos recursos.

**Preconditions:**

* sessão PRD autenticada quando necessária;
* recursos existentes em formatos CSV, TSV, XLS, XLSX e ODS, quando disponíveis.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir recurso CSV | Recurso existente | Registar separadores e pré-visualização efectivamente disponíveis |
| 2 | Repetir para TSV, XLS, XLSX e ODS | Recursos existentes | Registar em quais formatos a Pré-visualização é apresentada e funcional |
| 3 | Procurar Explorar dados num recurso elegível | Recurso elegível | Registar se a acção é apresentada e qual destino abre |
| 4 | Abrir recurso sem validação conforme | Recurso existente | Confirmar que acesso/download permanece disponível quando aplicável |
| 5 | Navegar pelos controlos com teclado | Tab, Shift+Tab, Enter | Foco e controlos são operáveis |

### PRD-R04, APIs e serviços de dados

**Rastreabilidade:** D08.

**Summary:** confirmar elegibilidade para criação, campos e tipos de acesso sem gravar.

**Preconditions:**

* sessão PRD autenticada;
* quando possível, conta membro de organização com emblema Serviço público;
* conta sem organização elegível para comparação, se disponível.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir criação de API com organização elegível | Nenhum | Organização pode ser seleccionada como produtor e formulário pode avançar |
| 2 | Abrir criação sem organização elegível | Nenhum | Registar exactamente a restrição ou mensagem apresentada |
| 3 | Rever tipos de acesso | Nenhum | Registar opções actualmente apresentadas |
| 4 | Rever associação a Conjuntos de Dados | Nenhum | Confirmar se a associação é apresentada como opcional |
| 5 | Abrir uma API existente em edição sem guardar | API gerível | Registar campos e associações actualmente editáveis |
| 6 | Navegar por teclado | Tab, Shift+Tab | Foco, labels e mensagens são operáveis |

### PRD-R05, Reutilizações

**Rastreabilidade:** D09; LEDG-2520.

**Summary:** confirmar formulário, associações e indisponibilidade actual da transferência sem gravar.

**Preconditions:**

* sessão PRD autenticada;
* reutilização gerível existente, quando disponível.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir criação de Reutilização | Nenhum | Registar campos, produtor, tipo, tema e estado inicial apresentados |
| 2 | Abrir passo de associação de dados | Nenhum | São apresentadas opções para dados do portal ou links externos |
| 3 | Rever campos de link externo | Nenhum | Título e descrição são ou não obrigatórios conforme PRD |
| 4 | Abrir reutilização existente em edição | Reutilização existente | Links e associações actuais são apresentados |
| 5 | Procurar acção de transferência | Nenhum | Registar disponibilidade real; não antecipar LEDG-2520 |
| 6 | Navegar por teclado | Tab, Shift+Tab | Foco, labels e controlos são operáveis |

### PRD-R06, Harvester

**Rastreabilidade:** D10; LEDG-2323, LEDG-2296, LEDG-2298.

**Summary:** confirmar matriz real de campos, preview e trabalhos sem alterar configuração.

**Preconditions:**

* sessão PRD autenticada;
* fonte Harvester existente;
* perfis distintos quando disponíveis.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir fonte como perfil de consulta/Editor | Fonte existente | Registar campos visíveis e modo de leitura |
| 2 | Abrir como Administrador da organização | Mesma fonte | Registar exactamente os campos editáveis |
| 3 | Abrir como Administrador do portal | Mesma fonte | Registar campos avançados efectivamente disponíveis |
| 4 | Executar preview apenas se não persistir alterações | Configuração vigente | Resultado é apresentado sem alteração persistente da fonte |
| 5 | Abrir Trabalhos e um detalhe | Trabalho existente | Registar estados, itens, paginação e linhas por página |
| 6 | Navegar por teclado | Tab, Shift+Tab, Esc | Foco, labels, modais e estados são operáveis |

### PRD-R07, Discussões

**Rastreabilidade:** D12; LEDG-2390, LEDG-2391.

**Summary:** confirmar disponibilidade das Discussões no contexto autenticado sem criar mensagens.

**Preconditions:**

* sessão PRD autenticada;
* conteúdo com Discussões existentes, quando possível.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir Discussões num Conjunto de Dados | Conteúdo existente | Conversas são apresentadas no contexto correcto |
| 2 | Abrir Discussões numa Reutilização | Conteúdo existente | Registar disponibilidade e estado vazio/conversas |
| 3 | Abrir Discussões numa API | Conteúdo existente | Registar disponibilidade e estado vazio/conversas |
| 4 | Abrir Discussões de uma organização | Organização existente | Registar agregação actualmente apresentada |
| 5 | Pesquisar uma discussão | Termo conhecido | Resultados e estado sem resultados correspondem ao PRD |
| 6 | Navegar por teclado | Tab, Shift+Tab | Foco e controlos são operáveis |

### PRD-R08, Validador e Catálogo de Modelos após integração

**Rastreabilidade:** D07, CM; LEDG-2031, LEDG-2049.

**Summary:** revalidar a disponibilidade apenas após existir evidência de integração no PRD. No estado actual, frontend/backend/Swagger públicos não expõem o novo Validador nem o novo Catálogo.

**Preconditions:**

* sessão PRD autenticada;
* Editor e/ou Administrador autorizado, se disponíveis.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Confirmar que existe nova rota/área de Validação ou Catálogo em PRD | Nenhum | Se continuar ausente, terminar o TC e manter D07/CM bloqueados para publicação actual |
| 2 | Confirmar que o Swagger/API PRD expõe contratos do novo domínio | Nenhum | Endpoints/propriedades correspondem ao Validador/Catálogo e não ao schema legado/Harvester |
| 3 | Apenas após 1 e 2, abrir gestão de recurso CSV | Recurso elegível | Área de validação existe e apresenta o estado actual aplicável |
| 4 | Apenas após 1 e 2, abrir Catálogo como Editor e Administrador | Nenhum | Registar área, modelos e diferenças reais de permissões |
| 5 | Navegar por teclado | Tab, Shift+Tab | Foco, nomes acessíveis e estados são perceptíveis |

### PRD-R09, Seguir e Notificações

**Rastreabilidade:** D11; LEDG-1960, LEDG-2289, LEDG-2305.

**Summary:** confirmar terminologia e eventos actualmente disponíveis sem alterar relações.

**Preconditions:**

* sessão PRD autenticada;
* conteúdos dos quatro tipos disponíveis;
* notificações existentes na conta, se aplicável.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir Organização | Conteúdo existente | Registar se a acção é Favorito ou Seguir |
| 2 | Abrir Conjunto de Dados | Conteúdo existente | Registar a terminologia actual |
| 3 | Abrir Reutilização | Conteúdo existente | Registar a terminologia actual |
| 4 | Abrir API | Conteúdo existente | Registar a terminologia actual |
| 5 | Abrir Notificações | Nenhum | Registar tipos, conteúdo, ligações e estado lido/não lido |
| 6 | Abrir aviso de Harvester, se existir | Notificação existente | Ligação encaminha para a fonte e marcar como lido permanece distinto da decisão |
| 7 | Navegar por teclado | Tab, Shift+Tab | Foco, nomes e estados são perceptíveis |

### PRD-R10, Explorador após integração

**Rastreabilidade:** D06; LEDG-2199, LEDG-2276.

**Summary:** confirmar se o novo Explorador já está integrado em PRD.

**Preconditions:**

* recurso tabular elegível existente.

| Step | Action | Input | Expected Result |
| ---: | --- | --- | --- |
| 1 | Abrir o recurso no Frontoffice | Recurso elegível | Registar presença/ausência de Explorar dados |
| 2 | Abrir Explorar dados, se disponível | Nenhum | São apresentadas Dados, Estrutura, Métricas e Gráfico |
| 3 | Se indisponível, terminar o TC | Nenhum | D06 permanece Por confirmar em PRD, sem testar comportamento futuro |

## 4. Test Cases, Fase B

Os TCs abaixo alteram dados. **Não executar sem autorização explícita adicional.**

### PRD-W01, Ciclo de vida e transferência de Conjunto de Dados

**Rastreabilidade:** D04; LEDG-2046, LEDG-2048, LEDG-2175.

**Summary:** validar comportamento real de rascunho, publicação, edição, arquivo, transferência e eliminação com conteúdo de teste.

**Preconditions:**

* autorização explícita de escrita em PRD;
* conteúdo de teste autorizado;
* perfis necessários disponíveis;
* destinatário de transferência autorizado, quando aplicável.

**Inputs:** valores fictícios sem dados pessoais reais; destinatário e organização Por confirmar.

**Expected Result global:** apenas comportamentos observados em PRD são incorporados no Manual; qualquer divergência é registada.

### PRD-W02, Upload e substituição de recurso

**Rastreabilidade:** D05.

**Summary:** validar integridade de upload/substituição, SVG/HTML e estados do recurso.

**Preconditions:**

* autorização explícita de escrita em PRD;
* Conjunto de Dados de teste;
* ficheiros de teste autorizados.

**Inputs:** ficheiro superior a 1 MB; SVG; HTML; formatos tabulares aplicáveis.

**Expected Result global:** ficheiro descarregado corresponde ao original; aceitação/rejeição de formatos e mensagens são registadas exactamente como PRD.

### PRD-W03, Gestão de API e Reutilização

**Rastreabilidade:** D08, D09.

**Summary:** validar criação, rascunho/publicação, edição e associações.

**Preconditions:**

* autorização explícita de escrita em PRD;
* produtores/organizações de teste autorizados.

**Expected Result global:** campos, validações, estados e persistência são documentados a partir do comportamento real.

### PRD-W04, Harvester

**Rastreabilidade:** D10.

**Summary:** validar edição, filtros e decisões administrativas numa fonte de teste.

**Preconditions:**

* autorização explícita de escrita em PRD;
* fonte de teste;
* perfis necessários.

**Expected Result global:** permissões, persistência, preview, aprovação/rejeição e mensagens correspondem ao PRD.

### PRD-W05, Discussões e participação

**Rastreabilidade:** D12.

**Summary:** validar criação e resposta a Discussões sem utilizar conteúdos produtivos sensíveis.

**Preconditions:**

* autorização explícita de escrita em PRD;
* conteúdo de teste autorizado.

**Expected Result global:** nova discussão/resposta aparece uma única vez e no contexto correcto.

### PRD-W06, Validador e Catálogo de Modelos

**Rastreabilidade:** D07, CM.

**Summary:** validar associação, execução, histórico, inferência, versionamento e ciclo de vida com dados de teste.

**Preconditions:**

* autorização explícita de escrita em PRD;
* recurso e modelo de teste;
* perfis autorizados.

**Expected Result global:** estados, mensagens, limites e permissões são os observados em PRD.

### PRD-W07, Seguir e Notificações

**Rastreabilidade:** D11.

**Summary:** validar relação Seguir/Deixar de seguir e eventos associados apenas quando a evolução estiver disponível.

**Preconditions:**

* autorização explícita de escrita em PRD;
* LEDG-1960/2305 reflectidas em PRD;
* conteúdos de teste adequados.

**Expected Result global:** terminologia, persistência e notificações correspondem exactamente à implementação actual.

## 5. Critério de fecho

Um guia pendente pode ser promovido de estado apenas quando:

1. os TCs de leitura aplicáveis foram executados;
2. os TCs de escrita necessários foram autorizados e executados, quando indispensáveis;
3. resultados foram registados em `docs/CONTENT_VALIDATION.md`;
4. conteúdo editorial foi sincronizado a partir de `content/guides.json`;
5. CI de consistência permanece verde;
6. PDFs foram regenerados quando o conteúdo fonte mudou;
7. não subsistem afirmações baseadas apenas em backlog ou comportamento futuro.
