---
title: Giving a workload access to an API
description: Apply identity, ownership, and least privilege to software acting without a person.
category: use-cases
order: 2
level: Intermediate
updated: 2026-10-14
tags: [workload identity, service account, machine identity, API, client credentials]
---
A reporting job needs to read aggregated sales data from an internal API every night. No employee is present to sign in. The job still needs a defined identity, scoped authorization, ownership, and a lifecycle.

## Model the workload

Create an identifiable service principal or equivalent workload record. Record the owning team, business purpose, deployment environment, resources, allowed operations, and retirement conditions.

Separate production from development. Avoid making a long-lived workload depend on the personal account of its original developer.

## Establish trust

Where the platform supports it, a workload can exchange a platform-issued identity assertion for short-lived access. Other deployments may use a client certificate or a securely managed secret.

The appropriate mechanism depends on the runtime and authorization server. Do not infer trust from a workload merely running on an internal network.

If using OAuth client credentials, the client acts on its own behalf or according to a prearranged authorization, rather than representing an interactively authenticated end user.

## Scope the authorization

For this example, the API should permit reading the aggregate-sales endpoint for the required dataset. It should reject raw customer-data access, writes, and administration.

Scopes can express coarse permissions. The API may still need to enforce dataset, tenant, and object constraints beyond a scope name.

## Operate the identity

- Prefer short-lived artifacts when supported and practical.
- Rotate or replace long-lived secrets and certificates through a controlled process.
- Avoid logging tokens or secrets.
- Monitor unexpected usage and failed authorization.
- Review ownership and access when the job's purpose changes.
- Revoke access and remove the identity when the job is retired.

## Test the boundary

Verify that the intended job can perform the read and that a development workload, expired artifact, incorrect audience, or broader operation is rejected. Include failure behavior when token issuance is unavailable.

## Reference

[OAuth 2.0, RFC 6749 §4.4](https://www.rfc-editor.org/rfc/rfc6749.html#section-4.4) defines the client credentials grant. Platform workload federation is a separate integration choice and should follow the selected platform's documented trust model.
