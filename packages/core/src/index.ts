
export type VerificationStatus =
  | "VERIFIED"
  | "REJECTED"
  | "INCONCLUSIVE";

export type ExecutionMode =
  | "HUMAN"
  | "AI_AGENT";

export interface TaskRequirement {
  id: string;
  description: string;
  mandatory: boolean;
}

export interface TaskDefinition {
  taskId: string;
  title: string;
  description: string;
  requirements: TaskRequirement[];
  policyVersion: string;
}

export interface Execution {
  executionId: string;
  taskId: string;
  mode: ExecutionMode;
  startedAt: string;
  completedAt?: string;
}

export interface EvidenceRecord {
  evidenceId: string;
  taskId: string;
  executionId: string;
  requirementId: string;
  source: string;
  evidenceType: string;
  payload: Record<string, unknown>;
  timestamp: string;
  digest: string;
  signature?: string;
}

export interface RequirementResult {
  requirementId: string;
  status: "SATISFIED" | "FAILED" | "UNKNOWN";
  reason: string;
  evidenceIds: string[];
}

export interface VerificationResult {
  taskId: string;
  executionId: string;
  status: VerificationStatus;
  requirementResults: RequirementResult[];
  verifiedAt: string;
  reasons: string[];
}
