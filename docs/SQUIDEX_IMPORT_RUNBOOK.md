# Runbook de importação Squidex provisório

Estado: preparação técnica da v1. Nenhuma importação integral foi autorizada ou executada.

## Objectivo

Migrar de forma controlada os 7 temas, 15 guias e 95 tarefas da fonte local para a instância Squidex provisória, preservando `GuidesContent` como contrato interno e mantendo a UI na fonte local até decisão posterior.

## Princípios de segurança

1. O modo normal é sempre `dry-run`.
2. Não existe comando npm de `apply` exposto nesta fase.
3. Uma futura escrita exige autorização explícita, frase de confirmação e `planHash` exacto.
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
npm run typecheck
```

O preflight determinístico deve indicar:

* `status=PREPARED_NOT_AUTHORIZED`;
* `applyAuthorized=false`;
* `writesToSquidex=0`;
* `roundTripEquivalent=true`;
* `blockers=[]` para os gates que o preflight consegue validar;
* 225 `operationId` únicos.

`blockers=[]` no preflight não autoriza escrita e não elimina os blockers de implementação listados abaixo.

## Blockers antes do primeiro apply real

Por confirmar e implementar antes de qualquer autorização de escrita real:

1. **Concorrência e versão remota.** Cada update deve usar a versão/ETag lida imediatamente antes da escrita e falhar perante alteração concorrente. O inventário inicial, por si só, não é suficiente.
2. **Resultado ambíguo de escrita.** Se o Squidex aceitar uma operação mas o processo falhar antes de actualizar o journal, a retoma deve reconciliar o estado remoto antes de repetir a operação.
3. **Rollback condicionado.** Antes de eliminar ou restaurar um item, confirmar que o estado remoto ainda corresponde à versão produzida pela migração. Divergências posteriores devem interromper o rollback.
4. **Identidade do destino.** O futuro apply deve validar explicitamente app/ambiente e schemas esperados, além do `planHash`, para evitar aplicar o plano num destino diferente do inventariado.
5. **Ensaio real do executor final.** Depois de implementadas as condições anteriores, executar primeiro um ensaio controlado sobre conteúdo sintético antes da baseline de 117 conteúdos.

Enquanto estes pontos não estiverem resolvidos, o estado correcto é `PREPARED_NOT_AUTHORIZED`.

## Inventário live

Antes do futuro apply, recolher em leitura todos os conteúdos de:

* `guide-theme`;
* `guide`;
* `guide-task`.

Reexecutar `assessSquidexImportInventory` com esse inventário. A snapshot versionada do piloto serve apenas para CI determinístico e nunca substitui o inventário live anterior à escrita.

## Autorização futura

A escrita só pode ser iniciada numa conversa em que exista autorização explícita para executar a importação real. A autorização deve limitar-se à instância e plano identificados pelo `planHash` mostrado pelo preflight.

O executor exige simultaneamente:

* `mode=apply`;
* confirmação `APPLY-SQUIDEX-IMPORT`;
* `expectedPlanHash` igual ao hash do plano corrente;
* zero blockers de inventário;
* blockers técnicos acima resolvidos.

## Execução e retoma

O manifesto contém `operationId` determinísticos para as cinco fases:

1. criar temas;
2. criar tarefas;
3. criar guias;
4. aplicar relações entre guias;
5. aplicar `nextRef` das tarefas.

Após cada mutação confirmada, persistir o `operationId` no journal. Em retoma, executar apenas operações pendentes do mesmo `planHash`, depois de reconciliar qualquer operação com resultado remoto ambíguo.

## Rollback

Antes de substituir conteúdo existente, guardar o payload anterior. Para novos conteúdos, guardar o ID criado. O rollback é calculado em ordem inversa:

* conteúdo criado: eliminar apenas o item criado por esta execução;
* conteúdo actualizado: restaurar exactamente o snapshot anterior.

Nunca executar rollback com `planHash` diferente do journal nem sobre um estado remoto que tenha divergido da versão produzida pela migração.

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
