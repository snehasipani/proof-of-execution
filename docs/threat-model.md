
# Proof-of-Execution (PoE) — Threat Model

## 1. Purpose

This document identifies security threats against Proof-of-Execution (PoE) and defines the controls required to protect the verification process.

PoE must not blindly trust claims made by human or AI executors.

## 2. Assets to Protect

- Task definitions and success conditions
- Execution identifiers
- Evidence packages
- Cryptographic keys
- Evidence source identities
- Verification results
- Execution history and audit records

## 3. Threat Actors

### 3.1 Malicious Executor
A human or AI agent that intentionally submits false completion claims.

### 3.2 Compromised Agent
An agent whose execution environment or credentials have been compromised.

### 3.3 Malicious Evidence Submitter
A party attempting to submit fabricated, modified, or unrelated evidence.

### 3.4 Compromised Evidence Source
An external system that provides incorrect or manipulated observations.

## 4. Threat Scenarios

### T1: Fabricated Evidence

An executor submits evidence for an operation that never happened.

Expected defense:
- Collect evidence independently from trusted external sources.
- Validate evidence provenance.
- Do not rely solely on executor-generated claims.

### T2: Evidence Modification

An attacker changes evidence after it has been collected.

Expected defense:
- Calculate SHA-256 digests.
- Verify digests before evaluation.
- Use digital signatures where supported.

### T3: Evidence Replay

An attacker reuses evidence from an earlier successful execution.

Expected defense:
- Generate unique execution IDs.
- Bind evidence to task and execution IDs.
- Validate timestamps and freshness.
- Use nonces where appropriate.

### T4: Cross-Task Evidence Reuse

Evidence belonging to one task is submitted for another task.

Expected defense:
- Bind evidence to the exact task ID.
- Validate execution ID and policy version.
- Reject mismatched evidence.

### T5: Missing Evidence

An executor claims success but does not provide sufficient evidence.

Expected defense:
- Check every mandatory condition.
- Return INCONCLUSIVE when evidence is insufficient.

### T6: Failed Requirement Hidden by Successful Evidence

An executor provides evidence that some conditions passed while hiding a failed mandatory condition.

Expected defense:
- Evaluate every mandatory condition independently.
- Do not allow one successful condition to compensate for another failed condition.

### T7: Compromised Evidence Source

An external provider supplies incorrect or manipulated observations.

Expected defense:
- Identify and document trusted evidence sources.
- Validate source authentication.
- Use independent corroboration for high-impact requirements.
- Document the limitations of each source.

## 5. Security Controls

| Security area | Proposed control |
|---|---|
| Evidence integrity | SHA-256 |
| Evidence authenticity | Ed25519 signatures |
| Task binding | Unique task IDs |
| Execution binding | Unique execution IDs |
| Replay protection | Nonces and freshness checks |
| Policy integrity | Immutable policy versions |
| Provenance | Source identity and timestamps |
| Missing evidence | INCONCLUSIVE outcome |
| Failed requirements | REJECTED outcome |

## 6. Verification Decision Rules

VERIFIED:
All mandatory conditions have sufficient valid evidence.

REJECTED:
A mandatory condition is demonstrably false, or evidence is invalid.

INCONCLUSIVE:
Available evidence cannot establish whether the task succeeded or failed.

## 7. Security Limitations

- A valid signature does not guarantee that an observation is truthful.
- A compromised evidence provider may produce authentic but incorrect evidence.
- SHA-256 detects changes only when the expected digest is protected.
- Timestamps alone do not prevent replay attacks.
- Independent evidence sources can still share common failure modes.

## 8. Initial Security Testing

PoE should eventually be tested against:

1. Fabricated evidence
2. Modified evidence
3. Replayed evidence
4. Evidence from another task
5. Missing evidence
6. Conflicting evidence
7. Invalid signatures
8. Expired evidence

Each attack should have a reproducible test case and an expected verification outcome.
