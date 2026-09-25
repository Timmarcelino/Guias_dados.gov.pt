# Runbook de importação Squidex provisório

Estado: `PREPARED_NOT_AUTHORIZED_LIVE_REHEARSAL_PENDING`. Nenhuma importação integral foi autorizada ou executada.

## Objectivo

Migrar de forma controlada os 7 temas, 15 guias e 95 tarefas da fonte local para a instância Squidex provisória, preservando `GuidesContent` como contrato interno e mantendo a UI na fonte local até decisão posterior.

## Princípios de segurança

1. O modo normal é sempre `dry-run`.
2. Não existe comando npm de `apply` exposto nesta fase.
3. Uma futura escrita exige autorização explícita, frase de confirmação, `planHash` exacto e `destinationHash` exacto.
4. O inventário live deve ser recolhido imediatamente antes de qualquer escrita.
5. Keys duplicadas, colisões de schema ou divergências de conteúdo bloqueiam a execução.
6. Não existe fallback silencioso entre Squidex e JSON local.
7. Cada operação deve ser registada no journal de retoma.
8. Cada mutação deve ser registada no journal de rollback.
9. O conteúdo importado só é aceite após leitura de volta e equivalência exacta com a fonte.
10. Activar Squidex na UI é uma decisão separada da importação.

## Baseline esperada

* 7 `guide-theme`;
* 15 `guide`;
* 95 `guide-task`;
* 117 conteúdos autónomos;
* 225 operações do plano actual;
* 409 componentes `guide-step`;
* 11 componentes `guide-resource`;
* 3 tabelas.

O piloto sintético `tema-piloto`, `D99`, `D99-T01` e `D99-T02` não pertence à baseline e deve permanecer distinguível do conteúdo real.

## Gates antes de qualquer autorização de escrita

Executar:

```bash
npm run content:validate
npm run squidex:import:dry-run
npm run test:squidex
npm run squidex:import:preflight
npm run squidex:import:safety-check
npm run typecheck
```

O preflight determinístico continua a validar plano, contagens, manifesto, inventário sintético conhecido e round trip. O safety check valida os controlos adicionais de concorrência e operação.

## Controlos técnicos resolvidos

### 1. Concorrência e versão remota

Implementado.

* creates usam IDs determinísticos derivados de `schema + key`;
* updates exigem a versão remota observada;
* a integração real deverá enviar essa versão em `If-Match`;
* alteração concorrente entre leitura e escrita bloqueia o update.

O comportamento está alinhado com a API oficial Squidex, que aceita ID explícito no create e usa `If-Match` nos updates `PUT/PATCH`.

### 2. Resultado ambíguo de escrita

Implementado.

O journal v2 distingue `pending`, `in-flight`, `confirmed` e `ambiguous`. Se houver erro ou timeout depois da tentativa de escrita, a retoma não repete automaticamente a operação. O estado remoto é relido e comparado por identidade e hash do payload esperado:

* igual: operação reconciliada como aplicada;
* ausente: pode ser considerada não aplicada;
* diferente: conflito, execução bloqueada;
* evidência insuficiente: indeterminado, execução bloqueada.

### 3. Rollback condicionado

Implementado.

Cada mutação futura deve guardar a `writtenVersion`. O rollback protegido só elimina ou restaura um conteúdo se a versão remota actual continuar exactamente igual à versão deixada pela migração. A acção de rollback transporta essa versão como precondição `If-Match`.

Se alguém editar o conteúdo depois da migração, o rollback desse item é bloqueado.

### 4. Identidade do destino

Implementado.

Além do `planHash`, o destino tem um `destinationHash` que vincula:

* API base URL;
* nome da app Squidex;
* ID do schema `guide-theme`;
* ID do schema `guide`;
* ID do schema `guide-task`.

Um apply futuro deve validar os dois hashes antes de qualquer escrita.

## Evidência live de concorrência

Em 25/09/2026 foi realizada apenas uma leitura do item piloto `D99`, sem qualquer mutação.

Confirmado no Squidex provisório:

* app: `guias-dados-gov-pt-piloto`;
* schema: `guide`;
* ID: `30f2d310-cc71-452b-a0eb-5ad727fbb147`;
* key: `D99`;
* estado: `Draft`;
* versão: `0`;
* método de alteração exposto: `PATCH`;
* href: `/api/content/guias-dados-gov-pt-piloto/guide/30f2d310-cc71-452b-a0eb-5ad727fbb147`.

Esta evidência confirma que a instância live fornece a versão e o link necessários para o controlo optimista. Não prova ainda a execução de uma escrita protegida.

## Blocker restante antes do primeiro apply real

### Ensaio live do executor protegido

**Pendente e não autorizado.**

Antes da baseline de 117 conteúdos, é necessário executar um ensaio controlado de escrita sobre conteúdo exclusivamente sintético que valide no Squidex real:

1. create com ID determinístico;
2. leitura de volta e confirmação do payload;
3. update com `If-Match`;
4. rejeição de versão incorrecta;
5. reconciliação após resultado ambíguo, quando possível simular com segurança;
6. rollback condicionado à `writtenVersion`;
7. confirmação de que o item sintético regressa ao estado acordado no final do ensaio.

Este ensaio exige autorização explícita específica porque altera o CMS. A autorização de implementação dos checkpoints 31 a 40 não autoriza esta escrita live.

Enquanto o ensaio não for autorizado e concluído, o estado correcto é:

`PREPARED_NOT_AUTHORIZED_LIVE_REHEARSAL_PENDING`

## Inventário live

Antes do futuro apply, recolher em leitura todos os conteúdos de:

* `guide-theme`;
* `guide`;
* `guide-task`.

Reexecutar `assessSquidexImportInventory` com esse inventário. A snapshot versionada do piloto serve apenas para CI determinístico e nunca substitui o inventário live anterior à escrita.

## Autorização futura

Uma escrita só pode ser iniciada numa conversa em que exista autorização explícita para a operação concreta.

O futuro apply da baseline deverá exigir simultaneamente:

* `mode=apply`;
* confirmação `APPLY-SQUIDEX-IMPORT`;
* `expectedPlanHash` igual ao plano corrente;
* `expectedDestinationHash` igual ao destino corrente;
* inventário live fresco sem blockers;
* journal sem operações `in-flight` ou `ambiguous` não reconciliadas;
* ensaio live sintético concluído com sucesso;
* autorização explícita para a importação da baseline.

## Execução e retoma

O manifesto contém `operationId` determinísticos para as cinco fases:

1. criar temas;
2. criar tarefas;
3. criar guias;
4. aplicar relações entre guias;
5. aplicar `nextRef` das tarefas.

Antes da chamada remota a operação passa para `in-flight`. Depois de resposta confirmada passa para `confirmed`. Erros de transporte com resultado remoto incerto passam a `ambiguous` e exigem reconciliação antes de qualquer repetição.

## Rollback

Antes de substituir conteúdo existente, guardar o payload e versão anteriores. Para novos conteúdos, guardar o ID criado. Depois de cada mutação, guardar também a `writtenVersion`.

O rollback é calculado em ordem inversa e só executa se a versão remota actual continuar igual à `writtenVersion`:

* conteúdo criado: eliminar apenas o item criado pela execução, usando `If-Match`;
* conteúdo actualizado: restaurar exactamente o snapshot anterior, usando `If-Match`.

Qualquer divergência posterior bloqueia a reversão automática desse item.

## Verificação pós-importação

Depois de concluídas as operações:

1. ler o conteúdo real por GraphQL;
2. normalizar referências `ID → key`;
3. mapear para `GuidesContent`;
4. comparar com a fonte local através de `compareGuidesContent`;
5. bloquear qualquer avanço se existir uma diferença.

A equivalência deve cobrir valores, ordenação, relações, steps, resources, tabelas e a distinção entre campo opcional ausente e lista vazia.

## Cutover

Mesmo com importação bem sucedida, a aplicação continua em Local JSON por defeito. A alteração da UI para `loadConfiguredContent()` e a selecção efectiva de Squidex constituem um checkpoint posterior e exigem decisão própria.

## Fora de âmbito deste runbook

* integração com o Squidex oficial do dados.gov.pt;
* publicação dos conteúdos importados;
* remoção do JSON local;
* alteração funcional ou editorial dos conteúdos;
* activação de Squidex como fonte da UI;
* acessibilidade, que permanece pausada até à v1 em `main`.
