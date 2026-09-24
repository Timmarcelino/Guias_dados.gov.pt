# Provisionamento do Squidex provisório

Estado: decisão técnica para a v1.

## Decisão

Utilizar Squidex Cloud Starter no piloto.

Motivo: para a escala actual dos Guides, o risco principal é divergência do modelo de conteúdo face ao futuro Squidex oficial, não o alojamento. O Cloud reduz operação sem alterar o motor CMS de destino.

## Justificação

1. O piloto terá aproximadamente 95 fichas, 15 guias e 7 temas, muito abaixo dos limites funcionais esperados para um CMS desta classe.
2. Não existe necessidade actual de gerir Docker, MongoDB, TLS, upgrades, monitorização ou persistência local.
3. O Squidex suporta backup de uma App e restore noutra instalação, incluindo migração entre Cloud e self hosted.
4. `GuidesContent` mantém-se como contrato interno e o mapper continua a isolar a aplicação do formato do CMS.
5. A futura integração no dados.gov.pt deverá exigir adaptação de schema e configuração, não reconstrução da UI.

## Configuração mínima do piloto

App provisória dedicada aos Guides.

Schemas:

* `guide-theme`
* `guide`
* `guide-task`
* componentes `guide-step` e `guide-resource`

Conteúdo inicial:

* 1 tema sintético
* 1 guia sintético
* 2 tarefas sintéticas
* locale `pt-PT`

Apenas depois de o ciclo completo funcionar deverá ser considerada a carga do conteúdo real.

## Integração técnica prevista

A aplicação não deve consumir directamente a estrutura GraphQL do Squidex.

Fluxo:

Squidex GraphQL -> transporte -> normalização -> mapper -> `GuidesContent` -> aplicação

O endpoint, App e credenciais devem ser fornecidos por configuração de ambiente. Nenhum segredo deve ser versionado no repositório.

## Critérios de sucesso do piloto

1. O transporte obtém o tema, guia e duas tarefas.
2. O mapper produz um `GuidesContent` válido.
3. Relações e ordenação permanecem equivalentes à fixture técnica.
4. A aplicação consegue gerar as rotas a partir do resultado normalizado.
5. O JSON local continua disponível como fallback durante a v1.
6. É produzido um backup da App piloto e a sua integridade é confirmada antes de qualquer expansão.

## Estratégia de saída

Se o destino continuar a ser Squidex:

1. congelar alterações editoriais durante a migração;
2. criar backup da App provisória;
3. validar compatibilidade do schema com a instância de destino;
4. quando o schema oficial divergir, adaptar o mapper ou efectuar transformação controlada;
5. restaurar ou importar o conteúdo na instância de destino;
6. trocar apenas configuração de endpoint e credenciais quando os contratos forem equivalentes;
7. executar validação de integridade de IDs, slugs, relações e ordenação.

Se o destino deixar de ser Squidex, `GuidesContent` permanece o contrato interno e deve ser criada uma nova implementação de repositório sem alterar os componentes da UI.

## Riscos

### R1. Divergência do schema oficial

Probabilidade: média.

Impacto: médio.

Mitigação: manter `GuidesContent` e mapper como fronteira de integração; não acoplar componentes React a campos Squidex.

### R2. Credenciais ou configuração versionadas indevidamente

Probabilidade: baixa.

Impacto: alto.

Mitigação: apenas variáveis de ambiente e secrets do ambiente de execução.

### R3. Dependência do serviço Cloud

Probabilidade: baixa.

Impacto: baixo no piloto.

Mitigação: backups regulares e JSON local preservado enquanto a v1 não estiver consolidada.

### R4. Limites do plano

Probabilidade: baixa para o piloto.

Impacto: baixo.

Mitigação: acompanhar chamadas API, tráfego, armazenamento e número de contribuidores antes da expansão.

### R5. Requisitos futuros de alojamento ou governação

Estado: Por confirmar.

Mitigação: a decisão Cloud é apenas para o piloto. A arquitectura deve continuar migrável para self hosted ou para a instância oficial do dados.gov.pt.

## Fora de âmbito deste checkpoint

* criação efectiva de conta, App ou schemas no Squidex;
* criação de credenciais;
* carga das 95 fichas reais;
* integração oficial com dados.gov.pt;
* definição de governação editorial definitiva;
* alteração do runtime actual dos Guides.
