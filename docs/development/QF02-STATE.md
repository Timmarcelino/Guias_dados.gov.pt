# QF02: estado de continuidade

Data: 30/09/2026.

## Estado actual

Branch canónica de trabalho: `feature/qf02-ux-recovery`.

Checkpoint funcional antes da adopção do modelo distribuído: `254f3d06577a0d3153a51e46e672a6e1d3440c11`.

Checkpoints QF02 preservados:

* `84f66b7` — planeamento QF02;
* `940ca72` — guardrails UX responsivos;
* `2b4b6071c94a38a39d18a6f11ee1ddf68ab5f5e8` — shell institucional;
* `f2ef516bf3e9fbe07bff6f64c07776a20b8f853e` — correcção UTF-8 do footer;
* `254f3d06577a0d3153a51e46e672a6e1d3440c11` — melhoria da entrada dos Guias.

O modelo de continuidade foi formalizado em `docs/development/CONTINUITY.md`.

## Evidência de recuperação

* O checkpoint `254f3d0` foi publicado no GitHub e confirmado por SHA remoto.
* O executor Linux `chicovm1` clonou a branch directamente do GitHub.
* Os cinco checkpoints foram recuperados com ancestralidade válida.
* `git fsck --no-dangling` passou no clone independente.
* O N4050 e a VM recuperaram o commit de continuidade criado directamente no GitHub.
* Existe bundle Git completo verificado, fora do clone de trabalho, com SHA-256 `8BF21E07E457CBF234DE9B741A4E643C66F617D60115D5CEF9028B9E789007D9`.

## Escrita entre executores

N4050 dispõe de sincronização Git autenticada confirmada. O conector GitHub pode criar checkpoints autorizados directamente no remoto.

`chicovm1` dispõe de clone funcional, Git e Node, mas ainda não tem identidade Git nem credencial GitHub própria configuradas. Não reutilizar ou distribuir credenciais administrativas para resolver esta lacuna. Escrita remota directa pela VM: Por confirmar.

Até existir identidade mínima própria na VM, separar responsabilidades:

* qualquer executor autorizado pode analisar, alterar e validar no seu clone;
* um sincronizador autorizado publica o checkpoint depois de verificar branch, base, diff e SHA remoto;
* trabalho concorrente usa branches distintas e PRs.

## Próximo bloco

`B3.2a` — recuperar navegação compacta entre os guias do tema actual nas páginas de guia e tarefa.

Âmbito:

* componente reutilizável baseado na fonte de conteúdo e funções de rotas existentes;
* desktop: navegação lateral ao conteúdo;
* ecrãs estreitos: navegação no fluxo normal sem esconder destinos;
* sem alterar pesquisa, conteúdo editorial, QF01, shell B2, entrada B3.1 ou contrato de URLs.

Gates rápidos previstos: `typecheck`, `diffcheck`, UTF-8 e contrato de 118 rotas. Build e validação visual ficam num bloco separado.