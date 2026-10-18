---
title: Sources, attributes, and correlation
description: Decide which system owns a fact and how records are reliably connected.
category: identity-modeling
order: 2
level: Foundational
updated: 2026-10-14
tags: [source of truth, authoritative source, correlation, attributes, data quality]
---
A single “source of truth” is often too simple a description of identity data. HR may own employment status, a contractor registry may own sponsorship, and an application may own a local permission.

Authority is best assigned per attribute and population.

## Build an attribute contract

For each important attribute, record its meaning, owner, format, allowed values, update trigger, and sensitivity. Include how to handle missing or stale data.

| Attribute | Example authority | Example rule |
| --- | --- | --- |
| Employment status | HR | A terminated employment record triggers a lifecycle event. |
| Contractor end date | Sponsor registry | Missing end dates require remediation. |
| Display name | Profile service | Changes do not create a new subject. |
| Application entitlement | Application owner | Observed assignments are reconciled with approved state. |

These choices are examples, not universal ownership rules.

## Correlate deliberately

Correlation links an incoming record to an existing subject or account. Prefer a trusted immutable identifier carried across systems. If that is unavailable, define matching rules and a review path for ambiguous cases.

Do not automatically merge two records because they share a display name or an email address. Rehires, reused mailboxes, and external users can create dangerous false matches.

## Account for propagation delay

A fact changes in one system before every downstream system observes it. Document the delay you can tolerate and how failures become visible.

For example, a contractor's end date may be corrected after an offboarding job starts. Decide how later events supersede earlier events and whether restoring access needs a new approval.

Useful metadata includes `source`, `sourceRecordId`, `observedAt`, and a source version or event identifier.

## Reconcile the result

Events tell you that something happened. Reconciliation tells you whether the intended state currently exists. Use both when lost messages or manual changes could leave access behind.

Exceptions need an owner and a resolution process. A daily report that nobody acts on is not an effective reconciliation control.

## Reference

[SCIM Core Schema, RFC 7643](https://www.rfc-editor.org/rfc/rfc7643.html) defines interoperable user and group attributes, including a service-provider-issued `id` and a client-issued `externalId`. A SCIM schema does not decide which internal system should own your business facts.
