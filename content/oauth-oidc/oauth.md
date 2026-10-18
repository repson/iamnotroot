---
title: OAuth 2.0 in plain language
description: Understand delegated API access, the main actors, and the role of access tokens.
category: oauth-oidc
order: 1
level: Foundational
updated: 2026-10-14
tags: [OAuth, authorization, access token, PKCE, scopes, API]
---
OAuth 2.0 is an authorization framework. It lets a client obtain limited access to a protected resource. It is not, by itself, a protocol for establishing an end user's identity to a client.

## The actors

| Actor | Responsibility |
| --- | --- |
| Resource owner | Can authorize access to a protected resource. |
| Client | Requests access and uses a token. |
| Authorization server | Processes authorization and issues tokens. |
| Resource server | Hosts the protected API and validates access. |

An organization might operate several of these roles in one service. Their responsibilities remain distinct.

## An illustrative authorization-code interaction

1. A document-printing application redirects a user to the authorization server with a narrowly defined access request.
2. The server handles authentication and authorization according to its policies.
3. The browser returns an authorization code to the registered client callback.
4. The client exchanges the code and the required proof for tokens.
5. The client presents an access token to the document API.

PKCE binds the authorization request to a code verifier presented at the token endpoint. It helps protect against authorization-code interception and injection attacks; it does not replace every other required validation.

## Scopes and enforcement

A scope such as `documents.read` describes requested or granted access according to the API's contract. The resource server still needs to check the token's validity and the actual resource and action.

A token for document reading must not become permission to read every tenant's documents simply because the scope has the same name.

Access tokens can be opaque or structured. Their format is a deployment choice; clients should not assume every access token is a JWT.

## Use current security guidance

Use maintained protocol libraries and the applicable security profile. The OAuth Security BCP advises against the implicit grant and prohibits use of the resource owner password credentials grant. Exact redirect URI handling, PKCE, token protection, and client type all matter.

For application sign-in, continue with [OpenID Connect](openid-connect.md). For software acting without a user, see [workload access](../use-cases/workload-access.md).

## Go deeper

| Topic | Article |
| --- | --- |
| Which grant and which client authentication to use | [Grant types and clients](grants-and-clients.md) |
| What each authorization server endpoint does | [Authorization server endpoints](authorization-server-endpoints.md) |
| How clients and APIs discover each other | [Discovery and metadata](discovery-and-metadata.md) |
| What is inside a token | [Token claims](token-claims.md) and [self-contained vs. opaque tokens](self-contained-and-opaque-tokens.md) |
| How an API should accept tokens | [Protecting an API as a resource server](resource-servers.md) |
| Binding tokens to the client | [DPoP](dpop.md) |
| Protecting and enriching the authorization request | [PAR and JAR](par-and-jar.md), [RAR](rich-authorization-requests.md) |
| Device flow, token exchange, mTLS, OAuth 2.1 | [Advanced OAuth](oauth-extensions.md) |
| What can go wrong | [Threats and mitigations](oauth-security.md) |
| Browser and mobile architectures | [Backend for frontend](../patterns/backend-for-frontend.md), [native and mobile apps](../patterns/native-apps.md) |

## References

- [OAuth 2.0, RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html).
- [PKCE, RFC 7636](https://www.rfc-editor.org/rfc/rfc7636.html).
- [OAuth Security BCP, RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html).
- [Bearer Token Usage, RFC 6750](https://www.rfc-editor.org/rfc/rfc6750.html).
- [OAuth.net](https://oauth.net/2/), a community index of OAuth specifications maintained by specification authors.
