
import { describe, expect, expectTypeOf, it } from "vitest";

import type {
  VerificationStatus,
  ExecutionMode,
  TaskDefinition,
  Execution,
  EvidenceRecord,
  RequirementResult,
  VerificationResult
} from "./index.js";

describe("Core data models", () => {

  it("should define valid verification statuses", () => {
    expectTypeOf<VerificationStatus>().toEqualTypeOf<
      "VERIFIED" | "REJECTED" | "INCONCLUSIVE"
    >();
  });

  it("should define valid execution modes", () => {
    expectTypeOf<ExecutionMode>().toEqualTypeOf<
      "HUMAN" | "AI_AGENT"
    >();
  });

  it("should create a valid task definition", () => {
    const task = {
      taskId: "TASK-001",
      title: "Deploy Node.js application",
      description: "Build, test and deploy an application",
      policyVersion: "1.0",
      requirements: [
        {
          id: "REQ-001",
          description: "Application builds successfully",
          mandatory: true
        },
        {
          id: "REQ-002",
          description: "All tests pass",
          mandatory: true
        }
      ]
    } satisfies TaskDefinition;

    expect(task.taskId).toBe("TASK-001");
    expect(task.requirements).toHaveLength(2);
  });

  it("should support HUMAN and AI_AGENT executions", () => {
    const humanExecution = {
      executionId: "EXEC-001",
      taskId: "TASK-001",
      mode: "HUMAN",
      startedAt: "2026-11-25T10:00:00Z"
    } satisfies Execution;

    const aiExecution = {
      executionId: "EXEC-002",
      taskId: "TASK-001",
      mode: "AI_AGENT",
      startedAt: "2026-11-25T10:00:00Z"
    } satisfies Execution;

    expect(humanExecution.mode).toBe("HUMAN");
    expect(aiExecution.mode).toBe("AI_AGENT");
  });

  it("should create a valid evidence record", () => {
    const evidence = {
      evidenceId: "EVD-001",
      taskId: "TASK-001",
      executionId: "EXEC-001",
      requirementId: "REQ-001",
      source: "GitHub Actions",
      evidenceType: "BUILD_RESULT",
      payload: {
        status: "SUCCESS"
      },
      timestamp: "2026-11-25T10:05:00Z",
      digest: "example-sha256-digest"
    } satisfies EvidenceRecord;

    expect(evidence.taskId).toBe("TASK-001");
    expect(evidence.payload.status).toBe("SUCCESS");
  });

  it("should represent requirement evaluation results", () => {
    const requirement = {
      requirementId: "REQ-001",
      status: "SATISFIED",
      reason: "Build completed successfully",
      evidenceIds: ["EVD-001"]
    } satisfies RequirementResult;

    expect(requirement.status).toBe("SATISFIED");
  });

  it("should represent a final verification result", () => {
    const result = {
      taskId: "TASK-001",
      executionId: "EXEC-001",
      status: "VERIFIED",
      requirementResults: [
        {
          requirementId: "REQ-001",
          status: "SATISFIED",
          reason: "Build successful",
          evidenceIds: ["EVD-001"]
        }
      ],
      verifiedAt: "2026-11-25T10:10:00Z",
      reasons: []
    } satisfies VerificationResult;

    expect(result.status).toBe("VERIFIED"); /////
    expect(result.requirementResults).toHaveLength(1);
  });

});
