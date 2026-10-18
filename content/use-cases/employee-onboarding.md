---
title: Onboarding an employee
description: Walk a new employee from an approved people record to verified application access.
category: use-cases
order: 1
level: Foundational
updated: 2026-10-14
tags: [employee, onboarding, joiner, example, workflow]
---
Maya joins as a finance analyst on Monday. She needs email, collaboration tools, and read access to regional finance reports. Payment approval is outside her initial responsibilities.

This example connects [identity modeling](../identity-modeling/identity-model.md), [JML](../processes/joiner-mover-leaver.md), and [federation and provisioning](../patterns/federation-and-provisioning.md).

## Define the intended result

Before designing the workflow, describe success:

- Maya has a stable workforce identifier and the correct active affiliation.
- Her required accounts are usable at the agreed start time.
- She can securely enroll and recover her authenticators.
- She can read the intended reports and cannot approve payments.
- The organization can explain the source of every initial assignment.

## Step through the workflow

1. HR creates an approved employment record containing the start date, identifier, team, and manager.
2. The lifecycle service correlates the record, checking for an existing subject or ambiguous match.
3. Policy calculates baseline access. The finance-report owner confirms any non-baseline requirement.
4. Provisioning creates the accounts and applies the approved assignments.
5. An enrollment process establishes the required authenticator without exposing a reusable secret in an ordinary email.
6. The applications accept federated sign-in and enforce their own resource permissions.
7. Reconciliation confirms the accounts and entitlements actually exist as intended.

These steps may be partly automated. The important property is the observable outcome of each step.

## Anticipate failure

A missing manager may prevent an approval. A reused email address may create a false account match. A connector may create an account but fail to assign the required group.

Give each failure a visible state, an owner, and a retry or resolution path. Retrying should not create a second identity or duplicate account.

## Validate with business actions

Test that Maya can sign in and open an appropriate regional report. Also test that she cannot read another region's restricted report or approve a payment by calling the API directly.

Finally, simulate a team change and a termination. An onboarding design is incomplete if the accounts it creates cannot later be changed and removed reliably.
