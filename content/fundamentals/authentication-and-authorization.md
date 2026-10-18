---
title: Authentication and authorization
description: Establishing who is acting and deciding what that subject may do.
category: fundamentals
order: 3
level: Foundational
updated: 2026-10-14
tags: [authentication, authorization, AuthN, AuthZ, access control]
---
Authentication and authorization are connected, but they answer different questions.

**Authentication** establishes confidence that a claimant controls an authenticator associated with an account. **Authorization** decides whether a subject may perform an action on a resource under the applicable policy.

## An everyday request

Maya signs in to an expenses application using a passkey. The application establishes a session associated with her account. She opens expense report `EXP-204` and presses **Approve**.

The successful sign-in does not answer whether she may approve that report. The application must evaluate her relationship to the report, any approval limit, the report's state, and the rule preventing self-approval.

```text
Authentication: Can this claimant authenticate as a-81?
Authorization:  May a-81 approve expense EXP-204 now?
```

## Related steps

| Step | Example question |
| --- | --- |
| Identification | Which account are you claiming to use? |
| Identity proofing | What evidence supports the claimed real-world identity? |
| Authentication | Do you control the required authenticator? |
| Session management | How is the authenticated interaction maintained? |
| Authorization | Is this particular operation permitted? |
| Audit | What decision and action were recorded? |

Not every service needs real-world identity proofing. A pseudonymous forum and an employee payroll system have different requirements.

## Where decisions happen

An identity provider can handle authentication, while an application remains responsible for enforcing access to its own business objects. A gateway can add checks, but it does not automatically know whether Maya owns a particular expense report.

The server must check authorization on protected operations. Hiding a button is useful interface behavior; it does not prevent a direct request to the underlying API.

## Common confusion

An authenticated user can still lack permission. An anonymous user may have permission to read public content. A role inside a token can provide an input to a decision, but it does not replace resource-level checks or remain current indefinitely.

OAuth and OpenID Connect also have different purposes. [OpenID Connect](../oauth-oidc/openid-connect.md) adds an authentication layer to the [OAuth authorization framework](../oauth-oidc/oauth.md).

## Reference

[OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html) explains the identity layer and its relationship to OAuth.
