---
title: OpenID Connect in depth
description: Flows, scopes, request parameters, the UserInfo endpoint, subject types, and the four logout mechanisms.
category: oauth-oidc
order: 6
level: Intermediate
updated: 2026-10-18
tags: [OIDC, OpenID Connect, flows, scopes, nonce, prompt, UserInfo, logout, back-channel logout, front-channel logout]
---
[OpenID Connect](openid-connect.md) adds authentication to OAuth 2.0. This article covers the details you meet when integrating a real relying party (RP) with an OpenID provider (OP).

## Flows by `response_type`

| `response_type` | Flow | Recommendation |
| --- | --- | --- |
| `code` | Authorization code | Use this, with PKCE, for all client types. |
| `id_token`, `id_token token` | Implicit | Avoid: tokens are delivered in the browser URL fragment. |
| `code id_token`, `code token`, `code id_token token` | Hybrid | Only for specific needs, such as detached signatures in some financial-grade profiles. |

With the code flow, the ID token is returned from the token endpoint over a back channel, which is easier to protect than the front channel.

## Scopes and the claims they request

| Scope | Effect |
| --- | --- |
| `openid` | Required. Makes the request an OpenID Connect request and yields an ID token. |
| `profile` | Requests `name`, `family_name`, `given_name`, `preferred_username`, `picture`, `locale`, `updated_at`, and related claims. |
| `email` | Requests `email` and `email_verified`. |
| `address` | Requests `address`. |
| `phone` | Requests `phone_number` and `phone_number_verified`. |
| `offline_access` | Requests a refresh token usable when the user is not present. |

Scopes request claims; the OP decides what to release, depending on policy and consent. See [token claims](token-claims.md) for the full list.

## Useful request parameters

| Parameter | Purpose |
| --- | --- |
| `nonce` | Binds the ID token to the browser session that started the request; prevents replay. |
| `prompt` | `none` (no UI; fail if interaction is needed), `login` (force re-authentication), `consent`, `select_account`. |
| `max_age` | Maximum seconds since the user last authenticated; the ID token then contains `auth_time`. |
| `acr_values` | Requested authentication context, such as a phishing-resistant method. |
| `login_hint` | Pre-fills the user identifier. |
| `id_token_hint` | A previously issued ID token, for example with `prompt=none` or at logout. |
| `claims` | Requests specific individual claims, optionally as essential, in the ID token or UserInfo. |
| `ui_locales` | Preferred languages for the login pages. |

Always validate the result against the request: if you requested `acr_values` or `max_age`, check `acr` and `auth_time` in the ID token. The OP may not honor the request.

## ID token, UserInfo, or access token?

| Source | Audience | Use for |
| --- | --- | --- |
| ID token | The client | Learning who signed in and how. |
| UserInfo response | The client | Fetching additional, possibly larger or fresher, profile claims. |
| Access token | The resource server | Calling an API. The client should treat it as opaque. |

The UserInfo endpoint is an OAuth-protected resource: call it with the access token. Its `sub` must equal the ID token's `sub`.

## Subject identifier types

- **Public:** the same `sub` for a user across all clients.
- **Pairwise:** a different `sub` for each client (or sector), so clients cannot correlate users across services.

Use the pair (`iss`, `sub`) as the stable key for a user. Never key accounts on `email`, which can change, be reassigned, or be unverified.

## Logout mechanisms

Logging out of an application, the OP, or every application are different operations.

| Mechanism | How it works | Reliability |
| --- | --- | --- |
| RP-Initiated Logout | The RP redirects the browser to `end_session_endpoint` with `id_token_hint` and `post_logout_redirect_uri`. | Ends the OP session; does not notify other RPs on its own. |
| Front-Channel Logout | The OP renders hidden iframes that load each RP's logout URL. | Fragile: several browsers block or partition third-party cookies in iframes. |
| Back-Channel Logout | The OP sends a signed **logout token** directly to each RP's back-channel endpoint. | Most reliable; works without the browser. RPs must map `sid` or `sub` to sessions. |
| Session Management | The RP polls the OP's session state through an iframe. | Fragile for the same third-party-cookie reasons. |

A logout token is a JWT with `iss`, `aud`, `iat`, `exp`, `jti`, an `events` claim containing `http://schemas.openid.net/event/backchannel-logout`, and `sid` and/or `sub`. It must not contain a `nonce`. The specification recommends explicit typing with the header `typ: logout+jwt`, so a logout token cannot be confused with an ID token.

A complete logout design usually combines RP-initiated logout for the user's action, back-channel logout to propagate it, and refresh-token revocation. See [sessions, tokens, and revocation](../processes/sessions-and-revocation.md).

## Silent renewal and third-party cookies

Older SPAs used a hidden iframe with `prompt=none` to obtain new tokens using the OP's session cookie. Safari and Firefox block or partition third-party cookies by default, and Chrome users can opt to block them, so this technique is unreliable. Use refresh tokens with rotation or a [backend for frontend](../patterns/backend-for-frontend.md) instead.

## Certification

The OpenID Foundation runs a certification program for OPs and RPs. Prefer certified implementations, and check which profiles (basic, implicit, hybrid, logout, FAPI) a product is certified for.

## References

- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html).
- [OpenID Connect RP-Initiated Logout 1.0](https://openid.net/specs/openid-connect-rpinitiated-1_0.html).
- [OpenID Connect Front-Channel Logout 1.0](https://openid.net/specs/openid-connect-frontchannel-1_0.html).
- [OpenID Connect Back-Channel Logout 1.0](https://openid.net/specs/openid-connect-backchannel-1_0.html).
- [OpenID Connect Session Management 1.0](https://openid.net/specs/openid-connect-session-1_0.html).
- [OpenID Certification](https://openid.net/certification/).
