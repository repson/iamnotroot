---
title: Sessions, tokens, and revocation
description: Understand why disabling an account may not immediately end every form of access.
category: processes
order: 3
level: Intermediate
updated: 2026-10-14
tags: [session, revocation, logout, access token, refresh token, offboarding]
---
Access can survive in several places after a login: the identity provider's session, an application's session, access tokens, refresh tokens, and local credentials. They have different owners and invalidation mechanisms.

## Distinguish the artifacts

| Artifact | What to ask |
| --- | --- |
| Identity-provider session | Can the browser obtain a new federated login without authenticating again? |
| Application session | Will the application continue accepting its own session cookie? |
| Access token | How long is it valid, and how does the resource server validate it? |
| Refresh token | Can the client obtain new access tokens, and can that ability be revoked? |
| Local API key or password | Does an independent access path still exist? |

## Account disablement has boundaries

Disabling an account at a central identity provider can stop new authentication. It does not, by itself, guarantee the immediate termination of every application session or previously issued token.

A resource server that validates a signed access token locally may continue accepting it until expiry unless it has an additional way to learn that access should end.

Shorter token lifetimes can reduce exposure, but they do not remove the need for a coherent revocation design.

## Choose mechanisms deliberately

OAuth defines token revocation and token introspection as separate mechanisms. Revocation lets a client request invalidation at an authorization server. Introspection lets an authorized resource server ask about a token's current state.

Their behavior depends on implementation, caching, propagation, and which artifacts are checked. An application may need to terminate its own session independently.

Event-based mechanisms close part of the gap. With [Shared Signals and CAEP](../standards/shared-signals.md), an identity provider can tell a cooperating application that a session was revoked, instead of waiting for tokens to expire. Sender-constrained tokens, such as [DPoP](../oauth-oidc/dpop.md) or mutual TLS, reduce the value of a stolen token in the meantime.

## Test the end of access

An illustrative offboarding exercise should check:

1. A new interactive login.
2. A browser with an existing application session.
3. A previously issued access token.
4. A refresh-token exchange.
5. An alternate local or privileged access path.

Record how long each remains usable and compare that result with the requirement. A connector's “success” response is only one piece of evidence.

## References

- [OAuth Token Revocation, RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html).
- [OAuth Token Introspection, RFC 7662](https://www.rfc-editor.org/rfc/rfc7662.html).
- [OpenID Shared Signals Working Group](https://openid.net/wg/sharedsignals/).
