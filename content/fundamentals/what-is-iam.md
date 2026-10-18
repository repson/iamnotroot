---
title: What is IAM?
description: The purpose, scope, and everyday questions of identity and access management.
category: fundamentals
order: 1
level: Foundational
updated: 2026-10-14
tags: [IAM, identity, access, introduction]
---
Identity and access management (IAM) is the discipline of managing digital identities and their access to resources throughout their lifecycle. It combines people, policies, processes, and technology.

An IAM program helps an organization answer four practical questions:

1. Who or what is asking for access?
2. How confident are we in that identity?
3. What should that identity be allowed to do?
4. How do we change, remove, and explain that access over time?

## A simple example

Maya joins a company as a finance analyst. The organization creates a record for her, provisions accounts, assigns the access she needs, and asks her to register an authenticator. When she signs in, applications verify her identity and check whether she can view or change particular records.

Six months later, Maya moves to another team. Her access must change with her responsibilities. When she leaves, access must end, even if an application still has a local account or an active session.

All of those steps belong to IAM. The login screen is only one part.

## The main building blocks

| Building block | The question it answers |
| --- | --- |
| Identity modeling | What entities, attributes, and relationships exist? |
| Authentication | How does a subject demonstrate control of an authenticator? |
| Authorization | Is this action on this resource allowed? |
| Provisioning | How are accounts and permissions created and changed? |
| Governance | Who owns access, and why is it appropriate? |
| Audit and operations | What happened, and can the service be trusted to keep working? |

## Different populations, different needs

**Workforce IAM** supports employees, contractors, and partners. **Customer IAM (CIAM)** supports people using a product or public service. **Workload identity** addresses software, services, and automated jobs. Their scale, usability expectations, and sources of authority can differ substantially.

These are useful perspectives rather than rigid product boundaries. Start with the population and the problem before selecting tools.

## A first mental model

> An identity is represented, an authentication establishes confidence, an authorization grants a specific action, and a lifecycle keeps access aligned with reality.

IAM also interacts with application security, privacy, HR, IT operations, and risk management. Assigning those boundaries is an organizational design decision.

## Keep learning

Continue with [identities, accounts, and credentials](identities-accounts-credentials.md), then compare [authentication and authorization](authentication-and-authorization.md).

## Reference

[NIST Digital Identity Guidelines, SP 800-63-4](https://pages.nist.gov/800-63-4/sp800-63.html) provides a formal reference for identity proofing, authentication, and federation. Its scope is narrower than a complete enterprise IAM program.
