---
title: Joiner, mover, leaver
description: Keep access aligned with the beginning, change, and end of an affiliation.
category: processes
order: 1
level: Foundational
updated: 2026-10-14
tags: [JML, lifecycle, onboarding, offboarding, rehire, contractor]
---
Joiner, mover, leaver (JML) describes three common workforce lifecycle changes. The goal is to translate a business event into verified access changes.

## Joiner: establish appropriate access

A joiner process starts from an approved affiliation, such as an employment record or contractor sponsorship. It correlates or creates the subject, provisions the necessary accounts, assigns baseline access, and enables a secure authenticator enrollment process.

Separate the planned start date from the time an account is created and the time access becomes usable. Preparing an account early should not accidentally enable early access.

Additional sensitive access may require a distinct request and approval.

## Mover: recalculate, then reconcile

A mover can change team, manager, location, job function, or employment type. Adding new permissions without removing old ones creates accumulated access.

Compare the intended access after the change with the observed access. Decide which assignments are role-derived, which are approved exceptions, and which should expire.

A temporary transition period can be legitimate. Record its scope, owner, and end date.

## Leaver: end access and verify it

Offboarding can involve central account disablement, application deprovisioning, privileged access removal, authenticator invalidation, session termination, token handling, and ownership transfer.

Those operations are not necessarily simultaneous. Define ordering and the maximum acceptable delay for each target. Confirm results instead of assuming that a successfully submitted connector request completed the work.

Retaining business records and removing access are separate decisions. Account deletion is not always the first or correct action.

## Handle difficult cases explicitly

| Case | Question to resolve |
| --- | --- |
| Rehire | Which historical records can be reused, and which grants need approval again? |
| Multiple affiliations | Does one ended contract affect an active employment relationship? |
| Immediate termination | What path bypasses normal scheduling? |
| Missing event | Can reconciliation detect the discrepancy? |
| Ownership transfer | Who inherits application, service identity, and approval responsibilities? |

## Make the workflow resilient

Use event identifiers and idempotent operations so retries do not create duplicate accounts. Make failures visible, assign an owner, and keep evidence of both intended and observed state.

For an end-to-end example, see [onboarding an employee](../use-cases/employee-onboarding.md). For the runtime part of offboarding, read [sessions and revocation](sessions-and-revocation.md).
