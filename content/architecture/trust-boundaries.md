---
title: Trust boundaries and Zero Trust
description: Treat identity signals as inputs to a resource-specific decision rather than blanket trust.
category: architecture
order: 3
level: Intermediate
updated: 2026-10-14
tags: [Zero Trust, trust boundaries, policy, context, risk]
---
A trust boundary separates components or domains with different assumptions about control and authority. IAM integrations cross boundaries whenever one system accepts identity information, tokens, or lifecycle changes from another.

## What Zero Trust contributes

NIST's Zero Trust architecture rejects implicit trust based solely on network location or ownership. Access is evaluated for a resource using identity and other relevant signals. Authentication and authorization remain distinct functions.

This does not require a person to log in on every API request. It requires an explicit design for decisions, sessions, policy enforcement, and reevaluation.

## A practical boundary inventory

For each integration, write down:

- The producer and consumer of identity information.
- The expected issuer, audience, and allowed assertion or token types.
- How keys and trusted metadata are established and rotated.
- Which attributes the producer is authoritative for.
- How expiry, revocation, and session lifetime are handled.
- What happens if validation or a required dependency fails.

Avoid treating “internal” as a complete authorization rule. A valid service identity may be allowed to read one dataset and prohibited from another.

## Context has limitations

Device posture, network, transaction sensitivity, and behavioral signals can inform policy. Each signal has a source, age, and failure mode.

For example, a device-compliance attribute copied yesterday may be unsuitable for a decision requiring current compliance. Document how stale information affects the result.

## An example decision

A finance user requests a large payment approval. The application checks the user's role, the transaction amount, separation of duties, and the authentication context. It may require a fresh stronger authentication before continuing.

The identity provider supplies authentication evidence; the application still evaluates the payment-specific rules.

## Keep learning

Use [RBAC and ABAC](../patterns/rbac-and-abac.md) to explore policy inputs and [sessions and revocation](../processes/sessions-and-revocation.md) to understand the limits of disablement.

## Reference

[NIST SP 800-207: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final) describes the principles and logical components. The examples in this article are illustrative applications of those ideas.
