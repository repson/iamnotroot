---
title: Token claims reference
description: Registered JWT claims, ID token claims, access token claims, standard user claims, and confirmation and delegation claims.
category: oauth-oidc
order: 7
level: Intermediate
updated: 2026-10-18
tags: [claims, JWT, ID token, access token, RFC 9068, cnf, act, standard claims, custom claims]
---
A claim is a statement about a subject, expressed as a name–value pair. Claims appear in ID tokens, JWT access tokens, UserInfo responses, introspection responses, and logout and security event tokens. This page lists the ones you will meet most often and where each is defined.

## Registered JWT claims (RFC 7519)

| Claim | Meaning | Validate |
| --- | --- | --- |
| `iss` | Issuer: who created and signed the token. | Exact match with the expected issuer. |
| `sub` | Subject: who the token is about. Unique within the issuer. | Use with `iss` as the identity key. |
| `aud` | Audience: who the token is intended for. String or array. | Must contain your identifier. |
| `exp` | Expiration time (seconds since epoch). | Reject when in the past, allowing small clock skew. |
| `nbf` | Not before. | Reject if in the future. |
| `iat` | Issued at. | Optionally reject very old tokens. |
| `jti` | Unique token identifier. | Use to detect replay where required. |

## ID token claims (OpenID Connect Core §2)

| Claim | Meaning |
| --- | --- |
| `iss`, `sub`, `aud`, `exp`, `iat` | Required, as above. `aud` contains the client's `client_id`. |
| `auth_time` | When the user actually authenticated. Required if `max_age` was requested. |
| `nonce` | Echo of the request's `nonce`; must match. |
| `acr` | Authentication context class satisfied, such as a level of assurance. |
| `amr` | Authentication methods used, such as `pwd`, `otp`, `hwk`, `mfa` (values registered by RFC 8176). |
| `azp` | Authorized party: the client the token was issued to, relevant when `aud` has several values. |
| `at_hash` | Hash of the access token, binding it to the ID token in some flows. |
| `c_hash` | Hash of the authorization code, used in the hybrid flow. |
| `sid` | Session identifier at the OP, used for logout. |

## JWT access token claims (RFC 9068)

| Claim | Meaning |
| --- | --- |
| `iss`, `exp`, `aud`, `sub`, `client_id`, `iat`, `jti` | Required. `aud` identifies the resource server(s). |
| `client_id` | Required: the client the token was issued to. |
| `scope` | Space-separated granted scopes. |
| `auth_time`, `acr`, `amr` | Authentication information, when relevant to the API. |
| `groups`, `roles`, `entitlements` | Authorization attributes, using the names from the SCIM core schema. |

The header uses `typ: at+jwt`. A client should treat the access token as opaque, even if it can decode it; only the resource server is its audience.

## Standard user claims (OpenID Connect Core §5.1)

| Group | Claims |
| --- | --- |
| Name | `name`, `given_name`, `family_name`, `middle_name`, `nickname`, `preferred_username` |
| Profile | `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, `updated_at` |
| Contact | `email`, `email_verified`, `phone_number`, `phone_number_verified`, `address` |

`preferred_username` and `email` are not stable or unique identifiers. Only trust `email` for account linking when `email_verified` is `true` *and* you trust the issuer to verify email for that domain.

## Confirmation and delegation claims

| Claim | Defined by | Meaning |
| --- | --- | --- |
| `cnf` | RFC 7800 | Proof-of-possession key confirmation. Contains `jkt` for [DPoP](dpop.md) (JWK thumbprint) or `x5t#S256` for mutual TLS (certificate thumbprint). |
| `act` | RFC 8693 | The actor currently acting on behalf of the subject; can be nested to show a delegation chain. |
| `may_act` | RFC 8693 | Who is allowed to act on behalf of the subject. |
| `authorization_details` | RFC 9396 | Fine-grained permissions granted through [RAR](rich-authorization-requests.md). |

```json
{
  "iss": "https://login.example.test",
  "sub": "p-1042",
  "aud": "https://payments.example.test",
  "client_id": "budget-app",
  "scope": "payments.initiate",
  "cnf": { "jkt": "0ZcOCORZNYy-DWpqq30jZyJGHTN0d2HglBV3uiguA4I" },
  "act": { "sub": "https://gateway.example.test" },
  "exp": 1792000600,
  "iat": 1792000000,
  "jti": "a7c1f2"
}
```

## Introspection response claims (RFC 7662)

`active` (required), `scope`, `client_id`, `username`, `token_type`, `exp`, `iat`, `nbf`, `sub`, `aud`, `iss`, `jti`, plus any extensions such as `cnf` or `authorization_details`.

## Custom claims

- **Name them to avoid collisions.** Use a registered name, a collision-resistant URI (`https://example.test/claims/department`), or an agreed private name.
- **Keep tokens small.** Large group lists in tokens hit header-size limits; consider fetching authorization data from the resource server's own store or an API instead.
- **Remember staleness.** A role in a token is a snapshot from issuance time. It does not change when the role is revoked; see [self-contained and opaque tokens](self-contained-and-opaque-tokens.md).
- **Minimize personal data.** JWT payloads are readable by anyone who holds the token.

## Scopes versus claims

A **scope** is what the client asks for and the user consents to (“read my documents”). A **claim** is information in a token or response (“`sub` is p-1042”). Scopes can cause claims to be released, and an access token can contain a `scope` claim, but the concepts are different.

## References

- [JWT, RFC 7519 §4](https://www.rfc-editor.org/rfc/rfc7519.html#section-4).
- [OpenID Connect Core 1.0 — ID Token and Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims).
- [JWT Profile for OAuth 2.0 Access Tokens, RFC 9068](https://www.rfc-editor.org/rfc/rfc9068.html).
- [Proof-of-Possession Key Semantics for JWTs, RFC 7800](https://www.rfc-editor.org/rfc/rfc7800.html).
- [Authentication Method Reference Values, RFC 8176](https://www.rfc-editor.org/rfc/rfc8176.html).
- [IANA JSON Web Token Claims registry](https://www.iana.org/assignments/jwt/jwt.xhtml) — the authoritative list of registered claim names.
