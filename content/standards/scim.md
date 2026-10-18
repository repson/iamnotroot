---
title: SCIM and automated provisioning
description: Use a shared schema and HTTP protocol to manage users and groups across systems.
category: standards
order: 5
level: Intermediate
updated: 2026-10-18
tags: [SCIM, provisioning, users, groups, reconciliation, API, PATCH, filtering, ETag]
---
System for Cross-domain Identity Management (SCIM) 2.0 defines schemas and an HTTP-based protocol for managing identity resources across systems. It commonly connects a provisioning service to an application's user and group API.

## Schema and protocol

RFC 7643 defines resource schemas, including users and groups. RFC 7644 defines operations and protocol behavior. A deployment's supported features and extensions need to be discovered or documented.

An illustrative user representation is:

```json
{
  "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
  "externalId": "p-1042",
  "userName": "maya@example.test",
  "active": true
}
```

This example is intentionally small. The service provider assigns the resource `id`; `externalId` can carry the provisioning client's identifier. Do not assume they are interchangeable.

## Endpoints and operations

| Endpoint | Purpose |
| --- | --- |
| `/Users`, `/Groups` | Resource collections. Each resource lives at `/Users/{id}` or `/Groups/{id}`. |
| `/ServiceProviderConfig` | Which optional features the server supports: PATCH, bulk, filtering, sorting, ETags, and authentication schemes. |
| `/Schemas`, `/ResourceTypes` | The schemas and extensions the server understands, such as the enterprise user extension. |
| `/Bulk` | Several operations in one request, when supported. |

| Method | Operation |
| --- | --- |
| `POST` | Create a resource; the response includes the server-assigned `id`. |
| `GET` | Read a resource, or query a collection with `filter`, `startIndex`, and `count`. |
| `PUT` | Replace a resource completely. Attributes you omit may be cleared. |
| `PATCH` | Modify selected attributes with `add`, `replace`, and `remove` operations. |
| `DELETE` | Remove a resource. |

Use a filter to look up an existing account before creating one:

```http
GET /scim/v2/Users?filter=externalId%20eq%20%22p-1042%22
```

Deactivate an account with a targeted `PATCH` rather than a full `PUT`, so attributes the client does not manage are left alone:

```http
PATCH /scim/v2/Users/2819c223-7f76-453a-919d-413861904646
Content-Type: application/scim+json
If-Match: W/"3694e05e9dff591"

{
  "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
  "Operations": [{ "op": "replace", "path": "active", "value": false }]
}
```

When the server supports ETags, sending `If-Match` with the version you last read prevents overwriting a concurrent change.

## A lifecycle integration

A connector can create a user before their start date, update mapped attributes, manage supported group memberships, and change account state when the affiliation ends.

SCIM's `active` attribute represents administrative status. The target application's exact disablement behavior still needs to be confirmed, including local sessions and alternate login methods.

## Make the connector reliable

Define correlation rules, required attributes, supported operations, pagination, rate limits, retries, and error handling. Not every implementation supports all optional protocol features.

Use reconciliation to compare intended state with the target. If a request times out after creation succeeds, a blind retry may create an unintended duplicate unless correlation and retry behavior are designed correctly. Querying by `externalId` before retrying a create is a simple safeguard; a `409 Conflict` with `scimType` `uniqueness` signals that the user already exists.

## Secure the SCIM endpoint

A SCIM endpoint can create administrators and disable every account, so treat its credential as privileged:

- RFC 7644 leaves authentication to the deployment. Prefer OAuth access tokens with a narrow scope, or mutual TLS, over a long-lived static bearer token.
- Restrict which attributes the client may change. A provisioning client should not be able to set roles or groups it does not own.
- Serve it only over TLS, rate limit it, and log every change with the client identity.
- Rotate the credential when a connector is decommissioned or its owner changes.

## Questions for an application owner

- Does changing `active` prevent all required forms of access?
- Which permissions are managed by groups, and which need another API?
- Are deleted users recoverable, and what happens to their business records?
- How are manually changed accounts detected?

## References

- [SCIM Core Schema, RFC 7643](https://www.rfc-editor.org/rfc/rfc7643.html).
- [SCIM Protocol, RFC 7644](https://www.rfc-editor.org/rfc/rfc7644.html).
