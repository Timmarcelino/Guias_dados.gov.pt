import type { SquidexImportSchema } from "./squidex-import-readiness";

export type SquidexImportMutationRecord =
  | {
      kind: "created";
      operationId: string;
      schema: SquidexImportSchema;
      key: string;
      id: string;
    }
  | {
      kind: "updated";
      operationId: string;
      schema: SquidexImportSchema;
      key: string;
      id: string;
      before: unknown;
    };

export interface SquidexRollbackJournal {
  planHash: string;
  mutations: SquidexImportMutationRecord[];
}

export type SquidexRollbackAction =
  | {
      action: "delete-created";
      operationId: string;
      schema: SquidexImportSchema;
      key: string;
      id: string;
    }
  | {
      action: "restore-updated";
      operationId: string;
      schema: SquidexImportSchema;
      key: string;
      id: string;
      data: unknown;
    };

export function createSquidexRollbackJournal(
  planHash: string,
): SquidexRollbackJournal {
  if (!planHash) throw new Error("Rollback journal exige planHash");
  return { planHash, mutations: [] };
}

export function recordSquidexMutation(
  journal: SquidexRollbackJournal,
  mutation: SquidexImportMutationRecord,
): SquidexRollbackJournal {
  if (journal.mutations.some((item) => item.operationId === mutation.operationId)) {
    throw new Error(`Mutação já registada: ${mutation.operationId}`);
  }
  return {
    planHash: journal.planHash,
    mutations: [...journal.mutations, mutation],
  };
}

export function buildSquidexRollbackActions(
  journal: SquidexRollbackJournal,
  expectedPlanHash: string,
): SquidexRollbackAction[] {
  if (journal.planHash !== expectedPlanHash) {
    throw new Error("Rollback journal incompatível com o plano seleccionado");
  }

  return [...journal.mutations].reverse().map((mutation) => {
    if (mutation.kind === "created") {
      return {
        action: "delete-created" as const,
        operationId: mutation.operationId,
        schema: mutation.schema,
        key: mutation.key,
        id: mutation.id,
      };
    }
    return {
      action: "restore-updated" as const,
      operationId: mutation.operationId,
      schema: mutation.schema,
      key: mutation.key,
      id: mutation.id,
      data: mutation.before,
    };
  });
}
