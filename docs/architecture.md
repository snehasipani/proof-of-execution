
# Proof-of-Execution (PoE) — System Architecture

## 1. Overview

Proof-of-Execution (PoE) is an independent verification platform that evaluates whether a human or AI agent has successfully completed a task.

Instead of trusting the executor's claim, PoE collects evidence from independent sources and evaluates it against predefined task requirements.

## 2. Problem Statement

An AI agent or human executor may claim that a task is complete even when:

- The application was never deployed.
- Tests failed or were not executed.
- The application is unavailable.
- Evidence was modified or fabricated.
- Evidence belongs to a different execution.

PoE addresses this problem through independent evidence collection and verification.

## 3. Core Components

### 3.1 Task Definition

Defines:
- Unique task ID
- Task description
- Mandatory success conditions
- Verification policy

### 3.2 Executor

Performs the assigned task.

Supported execution modes:
- Human execution
- Autonomous AI agent execution

Both modes use the same verification pipeline.

### 3.3 Evidence Collector

Collects evidence from external systems, such as:
- GitHub
- CI/CD pipelines
- Deployment platforms
- Application health endpoints

### 3.4 Evidence Package

Stores:
- Task ID
- Execution ID
- Evidence type
- Evidence payload
- Timestamp
- Source identity
- Cryptographic digest

### 3.5 Cryptographic Verifier

Checks:
- Evidence integrity
- Digital signature validity, when supported
- Task and execution binding
- Evidence freshness and replay protection

A valid signature proves that a particular key signed the evidence. It does not independently prove that the underlying observation is truthful.

### 3.6 Policy Engine

Evaluates collected and validated evidence against the task's mandatory success conditions.

### 3.7 Verification API

Coordinates task creation, evidence submission, verification, and result retrieval.

### 3.8 Dashboard

Displays:
- Task details
- Execution status
- Collected evidence
- Verification results
- Failure reasons

## 4. Verification Pipeline

1. User creates a task and defines success conditions.
2. PoE generates a unique execution ID.
3. Human or AI agent executes the task.
4. Evidence adapters collect independent observations.
5. Evidence is packaged and submitted.
6. Cryptographic verification checks evidence integrity and binding.
7. Policy engine evaluates mandatory conditions.
8. PoE produces a final verification result.

## 5. Verification Outcomes

### VERIFIED
All mandatory requirements are satisfied by sufficient valid evidence.

### REJECTED
Evidence establishes that a mandatory requirement failed or that a submitted claim is invalid.

### INCONCLUSIVE
Evidence is missing, insufficient, conflicting, or unavailable to establish success or failure.

## 6. Initial Demonstration

Task ID: TASK-001

Task:
Deploy a Node.js application, run its tests, and ensure its health endpoint returns HTTP 200.

Mandatory conditions:
- Application builds successfully.
- Automated tests pass.
- Application is deployed.
- Health endpoint returns HTTP 200.
- Evidence is valid and belongs to the current execution.

## 7. Technology Stack

- Runtime: Node.js
- Language: TypeScript
- API: Node.js API service
- Testing: Vitest
- Database: PostgreSQL (planned)
- Cryptography: SHA-256 and Ed25519
- Frontend: React
- Version control: Git and GitHub

## 8. Initial Project Modules

- apps/api — Verification API
- apps/dashboard — User interface
- packages/core — Shared types and task models
- packages/evidence — Evidence schemas and processing
- packages/verifier — Cryptographic verification
- packages/policy-engine — Requirement evaluation
- packages/adapters — External evidence integrations
- agent/executor — Autonomous task executor

## 9. Security Principles

- Never trust executor claims alone.
- Bind evidence to a specific task and execution.
- Detect evidence modification.
- Prevent evidence replay across executions.
- Preserve evidence provenance.
- Treat missing evidence as insufficient proof.
- Distinguish evidence authenticity from observation truthfulness.

## 10. Future Extensions

- Support additional AI coding agents.
- Add more evidence-source integrations.
- Add execution history and audit logs.
- Evaluate resistance to fabricated and replayed evidence.
- Support cross-agent verification.
