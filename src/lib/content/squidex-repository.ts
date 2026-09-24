import type { GuidesContent } from "./schema";
import { validateReferences } from "./repository";
import {
  mapSquidexPayload,
  type SquidexPayloadMapper,
} from "./squidex-mapper";

export interface SquidexTransport {
  fetchContent(): Promise<unknown>;
}

export interface AsyncContentRepository {
  load(): Promise<GuidesContent>;
}

/**
 * Repositório remoto preparado para Squidex, ainda não ligado à aplicação.
 *
 * O transporte e o mapper são injectados para não assumir endpoint GraphQL,
 * nomes de schemas ou estrutura de campos antes de o modelo CMS ser definido.
 */
export class SquidexRepository implements AsyncContentRepository {
  constructor(
    private readonly transport: SquidexTransport,
    private readonly mapper: SquidexPayloadMapper,
  ) {}

  async load(): Promise<GuidesContent> {
    const payload = await this.transport.fetchContent();
    const content = mapSquidexPayload(payload, this.mapper);
    validateReferences(content);
    return content;
  }
}
