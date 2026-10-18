---
title: An IAM capability map
description: A vendor-neutral checklist of what an IAM program needs to be able to do.
category: capabilities
order: 1
level: Foundational
updated: 2026-10-14
tags: [capabilities, IGA, PAM, CIAM, operating model, roadmap]
---
A capability describes something an organization can do. It is not the name of a product. Use a capability map to identify responsibilities, gaps, and priorities before drawing a shopping list.

## The map

| Capability | Example outcome |
| --- | --- |
| Identity data management | Subjects, accounts, and authoritative attributes can be reliably linked. |
| Lifecycle orchestration | Business events produce verified access changes. |
| Provisioning and reconciliation | Intended and observed account states stay aligned. |
| Authentication and recovery | Subjects can securely enroll, authenticate, and recover access. |
| Federation and SSO | Applications consume trusted authentication results. |
| Authorization | Protected actions are evaluated and enforced using explicit policy. |
| Access governance | Access has ownership, justification, review, and removal processes. |
| Privileged access management | Elevated access is controlled, attributable, and time-bounded where appropriate. |
| Workload identity management | Software identities have owners, scoped permissions, and manageable lifecycles. |
| Audit and detection | Identity events can support investigation and operational response. |
| Service operations | Availability, recovery, change management, and support are defined. |

This is the handbook's organizing model. It is not a certification framework or a claim that every program needs the same platform stack.

## Apply population-specific requirements

Workforce programs often depend on HR or sponsor records. Customer programs need registration and account recovery at product scale. Workloads need automated issuance and rotation rather than a human enrollment ceremony.

Use shared capabilities where useful, while keeping identifiers, policies, and data boundaries appropriate to each context.

## Assess a capability

For each row, identify an owner, the populations covered, current processes, supporting systems, evidence of effectiveness, and known failure cases.

An illustrative scale is **absent**, **manual**, **repeatable**, and **measured**. This is a planning aid, not a formal maturity score. A well-controlled manual process can be sufficient for a low-volume target.

## Start with outcomes

For an early program, three concrete goals might be:

- Every workforce identity has a traceable source and lifecycle owner.
- Offboarding removes the required access within an agreed period, with verification.
- Important applications use appropriate authentication and enforce their own business permissions.

Translate gaps into a roadmap using risk, dependencies, and operational capacity. Buying a tool does not automatically establish the capability it advertises.
