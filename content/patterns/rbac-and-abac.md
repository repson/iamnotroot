---
title: RBAC, ABAC, and relationships
description: Compare three ways to express access policy and understand how they can work together.
category: patterns
order: 1
level: Foundational
updated: 2026-10-14
tags: [RBAC, ABAC, ReBAC, roles, policy, authorization]
---
Authorization models organize the rules used to decide access. Role-based, attribute-based, and relationship-based approaches are useful lenses. Real systems often combine them.

## Role-based access control

RBAC associates permissions with roles and assigns subjects to roles. It works well when job functions have stable, understandable permission bundles.

For example, `ExpenseReviewer` may allow reading submitted expenses. Keep the business meaning, owner, and assignment criteria of the role explicit.

Creating one role for every combination of country, project, amount, and department can become difficult to manage. A role should simplify administration, not obscure the underlying rules.

## Attribute-based access control

ABAC evaluates properties of subjects, resources, actions, and potentially the environment. A policy might allow access when the employee's region matches the report's region and the action is `read`.

Attribute quality and freshness become part of the security design. An untrusted user-editable profile field should not silently become the source of an administrative entitlement.

## Relationship-based access control

A relationship model can express that a user owns a document, belongs to a project, or manages a team. Access can depend on a path through these relationships.

For example, project members may read project documents while project owners may invite new members. Revoking a relationship must affect all decisions derived from it within a defined period.

## Compare the approaches

| Approach | Useful starting point | Main design concern |
| --- | --- | --- |
| RBAC | Stable job functions | Role proliferation and unclear assignment rules. |
| ABAC | Context-sensitive decisions | Attribute authority, freshness, and policy explainability. |
| Relationships | Collaboration and ownership | Relationship integrity and propagation of changes. |

## A combined example

Allow an expense approval when the subject has an approver role, the amount is within the subject's limit, the subject manages the submitter's team, and the subject did not create the expense.

This combines role, attribute, relationship, and transaction constraints. Test positive and negative cases against actual business requirements.

## Keep learning

[Access control models compared](access-control-models.md) places these approaches alongside DAC, MAC, ACLs, capabilities, PBAC, and NGAC, with trade-offs and implementations. [Policy engines](policy-engines.md) shows how to externalize the decisions.

## References

- [NIST RBAC project](https://csrc.nist.gov/projects/role-based-access-control) describes role-based models.
- [NIST SP 800-162](https://csrc.nist.gov/pubs/sp/800/162/upd2/final) defines ABAC.
- [Zanzibar: Google's Consistent, Global Authorization System](https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/) describes a production system using relationships; it is one design, not a universal ReBAC standard.
