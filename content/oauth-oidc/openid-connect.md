---
title: OpenID Connect and application sign-in
description: Learn what the identity layer adds to OAuth and why an ID token differs from an access token.
category: oauth-oidc
order: 5
level: Foundational
updated: 2026-10-14
tags: [OIDC, OpenID Connect, ID token, claims, subject, SSO]
---
OpenID Connect (OIDC) adds an identity layer to OAuth 2.0. A relying party requests it using the `openid` scope and receives an ID token containing claims about an authentication event and subject.

## ID token versus access token

An **ID token** is intended for the client to process as part of authentication. An **access token** is intended for a resource server to authorize API access. They have different recipients and validation requirements.

Do not substitute an ID token for an API access token simply because both happen to look like JWTs.

## Map the subject reliably

The issuer and subject identifier together provide the identity context. An email address is not a safe universal substitute for that pairing.

For example, an expenses application might map the validated issuer and subject to its internal account `a-357`. Its own access model then determines which reports that account may approve.

## Validation is part of the integration

A relying party needs to validate the response according to the flow and library it uses. Relevant checks include issuer, audience, signature, expiry, and nonce where applicable. The surrounding OAuth interaction also requires its own protections.

Treat this as a description of responsibilities, not a complete token-validation recipe. Use maintained libraries and the full specifications.

## What sign-in does not answer

Consider an employee who is allowed to authenticate but has changed teams. A successful OIDC login does not establish that every role copied during an earlier login is still appropriate.

Decide how identity claims are mapped, how changes become visible, and where resource-specific permissions are checked. A central login and a local authorization decision can have different lifetimes.

## Operational questions

- How is trusted provider metadata configured?
- What happens during signing-key rotation?
- Which session belongs to the identity provider, and which belongs to the application?
- How will the application handle an ended affiliation or account disablement?

These questions connect sign-in to the wider [IAM architecture](../architecture/components.md).

## Go deeper

[OpenID Connect in depth](oidc-in-depth.md) covers flows, scopes, request parameters, UserInfo, subject types, and logout. [Token claims](token-claims.md) lists every claim you are likely to meet, and [discovery and metadata](discovery-and-metadata.md) explains `/.well-known/openid-configuration`.

## References

- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html) defines ID tokens, claims, and protocol behavior.
- [OpenID Foundation specifications](https://openid.net/developers/specs/) lists the full family, including discovery, registration, and logout.
