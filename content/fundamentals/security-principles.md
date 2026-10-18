---
title: Principles for better access
description: Least privilege, explicit decisions, separation of duties, and accountable ownership.
category: fundamentals
order: 4
level: Foundational
updated: 2026-10-14
tags: [least privilege, separation of duties, deny by default, security]
---
Good IAM design begins with principles that remain useful across products and protocols. They guide decisions; they are not a substitute for understanding a specific system.

## Least privilege

Grant the access needed for a defined task, within an appropriate scope and duration. “Administrator” is usually too broad a starting point for a task that only needs to restart one service.

A practical access assignment should have a subject, resource scope, allowed actions, business reason, and review or expiry condition.

## Deny by default

If no applicable rule allows an operation, deny it. Define what happens when a policy cannot be evaluated, an attribute is missing, or a dependency is unavailable.

For a sensitive write operation, an authorization service timeout should not silently become permission to proceed. Availability and emergency procedures need deliberate design.

## Separation of duties

Some combinations of actions should require different people. A person might be allowed to create a supplier or approve its payments, while being prevented from doing both for the same transaction.

Conflicts can be static, based on assigned roles, or dynamic, based on the action and context. Explain which kind your policy enforces.

## Explicit ownership

Every application, entitlement, service identity, and policy needs an accountable owner. Ownership means deciding whether access remains appropriate, not merely receiving automated reminders.

When an owner leaves, ownership must transfer. Otherwise, the governance process itself becomes an orphaned dependency.

## Minimize and protect identity data

Collect and distribute only attributes needed for a stated purpose. A support application might need an employee identifier and team; it probably does not need a home address.

Access logs also contain personal and operational data. Restrict access and define retention according to the organization's requirements.

## Make changes explainable

Record who requested access, who approved it, which policy applied, and what was actually provisioned. An approval without a successful implementation is not a completed access change.

For each important control, identify evidence and a failure response. This turns a principle into an operational practice.

## Reference

[NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) includes access control and identification and authentication control families. Select controls according to your system's context rather than treating every control as universally required.
