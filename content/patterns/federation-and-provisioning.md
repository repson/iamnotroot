---
title: Federation and provisioning
description: Separate the runtime trust relationship from the administrative account lifecycle.
category: patterns
order: 9
level: Intermediate
updated: 2026-10-14
tags: [federation, provisioning, SSO, JIT, SCIM, integration]
---
Federation lets an application rely on identity information from another system. Provisioning manages account and access state in the application. An integration may need both.

## Federation at runtime

With a federated sign-in, the application validates an assertion or token from a trusted identity provider. The application may establish its own session and map the external identity to a local record.

Federation centralizes some authentication responsibilities. The application still needs a defined authorization model and a trustworthy identifier mapping.

## Provisioning before and after sign-in

Provisioning creates, updates, disables, or removes records independently of a browser login. This enables access preparation before day one and offboarding after the last sign-in.

[SCIM](../standards/scim.md) provides interoperable schemas and an HTTP protocol for these operations. Application-specific APIs and controlled manual tasks can fill gaps.

## Just-in-time account creation

Just-in-time (JIT) creation makes a local account when the subject first signs in. It can reduce initial integration work but does not automatically solve later lifecycle changes.

Ask what happens when a person never returns to the application after leaving the organization. A profile update triggered only by the next login cannot serve as the entire offboarding process.

## Compare the responsibilities

| Mechanism | Typical trigger | Does not automatically solve |
| --- | --- | --- |
| Federated authentication | Sign-in or session renewal | Local account cleanup and business authorization. |
| JIT creation | First accepted sign-in | Reliable updates and deprovisioning without another login. |
| Lifecycle provisioning | Administrative event or reconciliation | Authentication and active session termination. |

## A reusable integration checklist

For each application, define the subject identifier, federation protocol, account creation method, attribute mapping, entitlement ownership, disablement behavior, session behavior, and reconciliation method.

Test identifier changes and rehires as well as first login. Avoid joining an existing privileged account to a federated identity using an unverified email match.

## References

[NIST SP 800-63C-4](https://pages.nist.gov/800-63-4/sp800-63c.html) describes federation and assertions. [SCIM Protocol, RFC 7644](https://www.rfc-editor.org/rfc/rfc7644.html) specifies cross-domain identity-management operations. They address different parts of an integration.
