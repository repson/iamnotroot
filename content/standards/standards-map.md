---
title: A map of IAM standards
description: Choose the right family of standards for authentication, authorization, and provisioning.
category: standards
order: 1
level: Foundational
updated: 2026-10-18
tags: [standards, protocols, OAuth, OIDC, SAML, SCIM, WebAuthn, LDAP, JWT]
---
IAM standards solve different problems. Before selecting one, describe the interaction: who is communicating, which trust relationship exists, and what result the recipient needs.

## The quick map

| Need | Relevant standard or family | What to read here |
| --- | --- | --- |
| Delegate access to an API | OAuth 2.0 | [OAuth](../oauth-oidc/oauth.md), [grant types](../oauth-oidc/grants-and-clients.md), [endpoints](../oauth-oidc/authorization-server-endpoints.md) |
| Sign in to an application using an identity provider | OpenID Connect | [OpenID Connect](../oauth-oidc/openid-connect.md), [in depth](../oauth-oidc/oidc-in-depth.md) |
| Discover authorization servers and protected APIs | RFC 8414, OIDC Discovery, RFC 9728 | [Discovery and metadata](../oauth-oidc/discovery-and-metadata.md) |
| Accept tokens in an API and request step-up | RFC 6750, RFC 9470 | [Resource servers](../oauth-oidc/resource-servers.md) |
| Bind tokens to a client key | DPoP, RFC 9449 | [DPoP](../oauth-oidc/dpop.md) |
| Protect or enrich the authorization request | PAR, JAR, RAR | [PAR and JAR](../oauth-oidc/par-and-jar.md), [RAR](../oauth-oidc/rich-authorization-requests.md) |
| Use OAuth from browsers and mobile apps | RFC 10017 (browser-based apps), RFC 8252 | [BFF](../patterns/backend-for-frontend.md), [native apps](../patterns/native-apps.md) |
| Manage browser sessions | HTTP cookies, RFC 6265 | [Cookies and sessions](../patterns/cookies-and-sessions.md) |
| Exchange identity assertions, often for enterprise SSO | SAML 2.0 | [SAML](saml.md) |
| Create and manage users and groups across systems | SCIM 2.0 | [SCIM](scim.md) |
| Authenticate with public-key credentials on the web | WebAuthn / FIDO | [Modern authentication](modern-authentication.md) |
| Represent and validate a set of claims | JWT, JWS, JWK | [JWT and token validation](../oauth-oidc/jwt-and-token-validation.md), [token claims](../oauth-oidc/token-claims.md) |
| Sign in devices, exchange tokens, or bind tokens to a client certificate | Device grant, token exchange, mutual TLS | [Advanced OAuth](../oauth-oidc/oauth-extensions.md) |
| Access a directory or authenticate inside a Windows domain | LDAP, Kerberos | [LDAP and Kerberos](ldap-and-kerberos.md) |
| Notify other systems of revocations and compromise | Shared Signals, CAEP, RISC | [Shared Signals](shared-signals.md) |
| Ask a policy engine for an authorization decision | AuthZEN, XACML | [Policy engines](../patterns/policy-engines.md) |
| Give workloads an identity without stored secrets | SPIFFE, workload federation | [Non-human identities](../identity-modeling/non-human-identities.md) |

## A format is not a complete protocol

A JWT is a token format. It does not tell you, by itself, which issuer is trusted, which keys are accepted, which recipient it is intended for, or whether it is the right kind of token for a request. [JWT and token validation](../oauth-oidc/jwt-and-token-validation.md) lists the checks a recipient applies.

Likewise, “uses JSON” says little about the trust model. A secure integration needs the surrounding protocol, validation rules, and operational controls.

## Avoid one-protocol thinking

A business application can use OIDC for sign-in, SCIM for account management, and an application-specific API for permission assignment. Those choices can coexist.

An enterprise portfolio may support both SAML and OIDC because applications have different capabilities. Evaluate the actual integration and supported profiles rather than assuming one label describes every behavior.

## Read standards in layers

Start with the core specification, then identify security guidance, applicable profiles, errata, and your implementation's documentation. A published standard may contain older options that current security guidance advises against.

The articles in this section explain concepts. They are not complete implementation or conformance checklists.

## References

- [JWT, RFC 7519](https://www.rfc-editor.org/rfc/rfc7519.html).
- [JWT Best Current Practices, RFC 8725](https://www.rfc-editor.org/rfc/rfc8725.html).
- [LDAP technical specification roadmap, RFC 4510](https://www.rfc-editor.org/rfc/rfc4510.html).
