import { guidesContentSchema, type GuidesContent } from "./schema";

export type SquidexPayloadMapper = (payload: unknown) => unknown;

/**
 * Converte um payload Squidex no contrato interno dos Guides.
 *
 * O mapeamento concreto fica injectado porque o modelo de conteúdo Squidex
 * ainda não está definido. Isto evita fixar nomes de schemas, campos ou
 * wrappers GraphQL sem evidência.
 */
export function mapSquidexPayload(
  payload: unknown,
  mapper: SquidexPayloadMapper,
): GuidesContent {
  return guidesContentSchema.parse(mapper(payload));
}
