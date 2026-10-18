---
title: Discovery, metadata, and dynamic registration
description: Authorization server metadata, OpenID discovery, Protected Resource Metadata (RFC 9728), and dynamic client registration.
category: oauth-oidc
order: 4
level: Intermediate
updated: 2026-10-18
tags: [discovery, metadata, RFC 8414, RFC 9728, protected resource metadata, well-known, dynamic client registration, RFC 7591]
---
Metadata documents let clients configure themselves from a single URL instead of hardcoding endpoints, keys, and capabilities. Three documents matter: the authorization server's metadata, the protected resource's metadata, and the client's own registration metadata.

## Authorization server metadata

An authorization server publishes a JSON document at a well-known location derived from its issuer identifier. The two specifications build that location differently when the issuer contains a path:

| Specification | Rule | Issuer `https://login.example.test` | Issuer `https://login.example.test/tenant1` |
| --- | --- | --- | --- |
| OpenID Connect Discovery | Append to the issuer. | `https://login.example.test/.well-known/openid-configuration` | `https://login.example.test/tenant1/.well-known/openid-configuration` |
| OAuth AS Metadata, RFC 8414 | Insert between the host and the path. | `https://login.example.test/.well-known/oauth-authorization-server` | `https://login.example.test/.well-known/oauth-authorization-server/tenant1` |

Multi-tenant servers often use issuers with paths, so a client that supports both specifications should try each construction rather than assume one. RFC 8414 §5 describes this compatibility case.

```json
{
  "issuer": "https://login.example.test",
  "authorization_endpoint": "https://login.example.test/authorize",
  "token_endpoint": "https://login.example.test/token",
  "jwks_uri": "https://login.example.test/jwks",
  "userinfo_endpoint": "https://login.example.test/userinfo",
  "pushed_authorization_request_endpoint": "https://login.example.test/par",
  "scopes_supported": ["openid", "profile", "email", "documents.read"],
  "response_types_supported": ["code"],
  "grant_types_supported": ["authorization_code", "refresh_token", "client_credentials"],
  "code_challenge_methods_supported": ["S256"],
  "token_endpoint_auth_methods_supported": ["private_key_jwt", "tls_client_auth"],
  "dpop_signing_alg_values_supported": ["ES256"],
  "id_token_signing_alg_values_supported": ["ES256"]
}
```

**Validate the `issuer`.** The `issuer` value in the document must exactly match the issuer the client used to build the URL. This check, together with the `iss` claim in tokens, prevents an attacker from substituting another server's metadata.

## Protected Resource Metadata (RFC 9728)

Authorization server metadata tells a client how to obtain tokens. Protected Resource Metadata tells a client, starting only from an API URL, **which authorization servers it trusts and how to call it**.

The document is served at `/.well-known/oauth-protected-resource`, inserted between the host and any path of the resource identifier:

```text
Resource:  https://api.example.test/orders
Metadata:  https://api.example.test/.well-known/oauth-protected-resource/orders
```

```json
{
  "resource": "https://api.example.test/orders",
  "authorization_servers": ["https://login.example.test"],
  "scopes_supported": ["orders.read", "orders.write"],
  "bearer_methods_supported": ["header"],
  "dpop_bound_access_tokens_required": true,
  "resource_documentation": "https://developer.example.test/orders"
}
```

Other defined fields include `jwks_uri`, `resource_name`, `resource_policy_uri`, `resource_tos_uri`, `tls_client_certificate_bound_access_tokens`, `authorization_details_types_supported`, `dpop_signing_alg_values_supported`, and `signed_metadata`.

### Discovery from a 401 response

A resource server can point clients to its metadata in the `WWW-Authenticate` header:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://api.example.test/.well-known/oauth-protected-resource/orders"
```

The client fetches the metadata, chooses an authorization server from `authorization_servers`, reads that server's metadata, and starts an authorization flow, usually including the `resource` parameter (RFC 8707) so the token is audience-restricted to this API.

The client must check that the `resource` value in the document matches the URL it used, to avoid being redirected to an attacker's authorization server. This discovery chain is used, for example, by the [Model Context Protocol authorization flow](../use-cases/ai-agent-mcp.md).

## Dynamic client registration (RFC 7591)

Normally an administrator registers each client manually. Dynamic registration lets client software register itself at the `registration_endpoint` by posting its metadata:

```json
{
  "client_name": "Print App",
  "redirect_uris": ["https://app.example.test/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "token_endpoint_auth_method": "private_key_jwt",
  "jwks_uri": "https://app.example.test/jwks.json",
  "scope": "documents.read"
}
```

The server responds with a `client_id` and, if applicable, credentials. RFC 7592 adds management (read, update, delete) of the registration.

Open registration lets anyone create clients. Mitigate with initial access tokens, **software statements** (signed JWTs vouching for the client's metadata), restricted scopes for dynamically registered clients, and clear consent screens that show the client's name and domain.

## Operational guidance

- Cache metadata, but respect HTTP caching headers and refresh periodically to pick up key and endpoint changes.
- Do not let metadata silently downgrade security; for example, reject a document that stops advertising `S256` PKCE if you require it.
- Publish metadata for every API you operate; it improves developer experience and enables automatic, standards-based configuration.

## References

- [OAuth 2.0 Authorization Server Metadata, RFC 8414](https://www.rfc-editor.org/rfc/rfc8414.html).
- [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html).
- [OAuth 2.0 Protected Resource Metadata, RFC 9728](https://www.rfc-editor.org/rfc/rfc9728.html).
- [Resource Indicators for OAuth 2.0, RFC 8707](https://www.rfc-editor.org/rfc/rfc8707.html).
- [Dynamic Client Registration, RFC 7591](https://www.rfc-editor.org/rfc/rfc7591.html) and [Registration Management, RFC 7592](https://www.rfc-editor.org/rfc/rfc7592.html).
- [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html).
- [IANA OAuth registries](https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml), including metadata fields.
