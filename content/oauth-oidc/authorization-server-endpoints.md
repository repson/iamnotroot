---
title: Authorization server endpoints
description: A reference to the authorize, token, introspection, revocation, UserInfo, JWKS, PAR, device, registration, and logout endpoints.
category: oauth-oidc
order: 3
level: Intermediate
updated: 2026-10-18
tags: [authorization endpoint, token endpoint, introspection, revocation, userinfo, JWKS, PAR, device authorization, dynamic registration, end session]
---
An OAuth authorization server, or an OpenID provider, exposes a set of HTTP endpoints. Each is defined by a specific specification and advertised in the server's [metadata](discovery-and-metadata.md). The paths are not standardized; clients discover them.

## The endpoint map

| Endpoint | Metadata name | Called by | Specification |
| --- | --- | --- | --- |
| Authorization | `authorization_endpoint` | User's browser | RFC 6749 §3.1 |
| Token | `token_endpoint` | Client (back channel) | RFC 6749 §3.2 |
| Pushed authorization request | `pushed_authorization_request_endpoint` | Client | RFC 9126 |
| Device authorization | `device_authorization_endpoint` | Device client | RFC 8628 |
| Backchannel authentication | `backchannel_authentication_endpoint` | Client | OpenID CIBA |
| Introspection | `introspection_endpoint` | Resource server | RFC 7662 |
| Revocation | `revocation_endpoint` | Client | RFC 7009 |
| UserInfo | `userinfo_endpoint` | Client, with an access token | OpenID Connect Core §5.3 |
| JWKS | `jwks_uri` | Anyone validating signatures | RFC 8414, OIDC Discovery |
| Dynamic registration | `registration_endpoint` | Client software | RFC 7591 |
| End session (logout) | `end_session_endpoint` | User's browser | OpenID RP-Initiated Logout |
| Metadata | `/.well-known/openid-configuration` or `/.well-known/oauth-authorization-server` | Clients and resource servers | OIDC Discovery, RFC 8414 |

## Authorization endpoint

The front-channel endpoint where the user authenticates and consents. The client redirects the browser here with `response_type`, `client_id`, `redirect_uri`, `scope`, `state`, and PKCE parameters, and later receives a code at its redirect URI.

Errors are returned to the redirect URI as `error` (for example `access_denied`, `invalid_scope`, `login_required`) unless the client or redirect URI itself is invalid; then the server must not redirect.

## Token endpoint

The back-channel endpoint where the client exchanges a grant for tokens. Confidential clients authenticate here.

```http
POST /token HTTP/1.1
Host: login.example.test
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA
&redirect_uri=https%3A%2F%2Fapp.example.test%2Fcallback
&code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
&client_id=print-app
```

```json
{
  "access_token": "eyJhbGciOiJFUzI1NiIsInR5cCI6ImF0K2p3dCJ9…",
  "token_type": "Bearer",
  "expires_in": 600,
  "refresh_token": "8xLOxBtZp8",
  "scope": "openid documents.read",
  "id_token": "eyJhbGciOiJFUzI1NiJ9…"
}
```

Errors use HTTP 400 or 401 with `error` values such as `invalid_request`, `invalid_client`, `invalid_grant`, `unauthorized_client`, `unsupported_grant_type`, and `invalid_scope`. Token responses must include `Cache-Control: no-store`.

## Introspection endpoint

A resource server asks whether a token is active and what it represents. The caller must authenticate.

```http
POST /introspect HTTP/1.1
Authorization: Basic <resource server credentials>
Content-Type: application/x-www-form-urlencoded

token=mF_9.B5f-4.1JqM&token_type_hint=access_token
```

```json
{
  "active": true,
  "client_id": "print-app",
  "sub": "p-1042",
  "scope": "documents.read",
  "aud": "https://api.example.test",
  "iss": "https://login.example.test",
  "exp": 1792000600
}
```

An inactive, expired, or unknown token returns only `{"active": false}`. RFC 9701 defines a signed JWT form of this response for cases where the resource server needs non-repudiation.

## Revocation endpoint

A client tells the server it no longer needs a token, for example at logout. The server responds with HTTP 200 whether or not the token was valid, so that the response does not leak information. Revoking a refresh token typically also invalidates related access tokens, but self-contained access tokens may remain usable until they expire. See [self-contained and opaque tokens](self-contained-and-opaque-tokens.md).

## UserInfo endpoint

An OpenID Connect endpoint that returns claims about the authenticated user. The client calls it with an access token that includes the `openid` scope.

```http
GET /userinfo HTTP/1.1
Authorization: Bearer <access token>
```

```json
{ "sub": "p-1042", "name": "Maya Ortiz", "email": "maya@example.test", "email_verified": true }
```

The `sub` must match the `sub` of the ID token; otherwise the response must not be used. See [OpenID Connect in depth](oidc-in-depth.md).

## JWKS endpoint

Publishes the public keys used to sign tokens, as a JSON Web Key Set. Recipients select keys by `kid` and cache them, refreshing on unknown key identifiers. See [JWT and token validation](jwt-and-token-validation.md).

## Other endpoints

- **PAR:** receives the authorization request directly from the client and returns a `request_uri`. See [PAR and JAR](par-and-jar.md).
- **Device authorization:** issues a `device_code` and `user_code` for the device flow. See [advanced OAuth](oauth-extensions.md).
- **Registration:** accepts client metadata and returns a `client_id`, enabling dynamic client registration. See [discovery and metadata](discovery-and-metadata.md).
- **End session:** logs the user out of the provider and optionally redirects back. See [OpenID Connect in depth](oidc-in-depth.md).

## Operating the endpoints

- Serve every endpoint over TLS and rate limit the token, introspection, and registration endpoints.
- Restrict introspection to authenticated resource servers, and only for tokens intended for them.
- Monitor error rates by `error` code: spikes in `invalid_grant` or `invalid_client` can indicate attacks or misconfiguration.
- Never log full tokens, codes, or client secrets.

## References

- [OAuth 2.0, RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html).
- [Token Introspection, RFC 7662](https://www.rfc-editor.org/rfc/rfc7662.html) and [JWT Response for Introspection, RFC 9701](https://www.rfc-editor.org/rfc/rfc9701.html).
- [Token Revocation, RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html).
- [OpenID Connect Core 1.0 — UserInfo](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo).
- [Authorization Server Metadata, RFC 8414](https://www.rfc-editor.org/rfc/rfc8414.html).
- [IANA OAuth Authorization Server Metadata registry](https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#authorization-server-metadata).
