---
title: IAM glossary
description: A quick reference to the terms and abbreviations used throughout the handbook.
category: fundamentals
order: 99
level: Foundational
updated: 2026-10-18
tags: [glossary, terminology, acronyms, IGA, PAM, CIAM, SSO, MFA]
---
This glossary uses practical working definitions. A specification may define a term more narrowly; use that definition when implementing the specification.

## Identity and lifecycle

| Term | Working definition |
| --- | --- |
| Subject | An entity requesting or receiving access. |
| Digital identity | A representation of a subject within a context. |
| Account | A record representing a subject in a particular system. |
| Attribute | A property associated with an entity, such as department or account status. |
| Authoritative source | The designated source responsible for a particular fact. |
| Provisioning | Creating or updating accounts and access in a target system. |
| Deprovisioning | Removing or disabling accounts or access in a target system. |
| Reconciliation | Comparing intended identity or access state with observed state. |
| JML | Joiner, mover, leaver: lifecycle events for workforce changes. |
| Correlation | Linking an incoming record to an existing subject or account. |
| Orphaned account | An account with no valid, active owner or subject. |
| Birthright access | Access granted automatically to everyone in a population. |
| NHI | Non-human identity: a service, workload, device, pipeline, or agent with its own identity. |
| Workload identity federation | Exchanging a platform-issued identity for short-lived access instead of storing a secret. |

## Access and authentication

| Term | Working definition |
| --- | --- |
| Authentication / AuthN | Establishing confidence in control of an associated authenticator. |
| Authorization / AuthZ | Determining whether a requested operation is permitted. |
| Authenticator | A means controlled by a claimant to authenticate. |
| MFA | Multi-factor authentication: combining distinct factor types. |
| SSO | Single sign-on: reusing an authentication session across applications. |
| Federation | A trust arrangement in which one system accepts identity assertions from another. |
| IdP | Identity provider: a system providing identity assertions to relying parties. |
| RP / SP | Relying party / service provider: a system consuming identity assertions. |
| Entitlement | A unit of access recognized by a system. |
| RBAC | Role-based access control: assigning permissions through roles. |
| ABAC | Attribute-based access control: evaluating attributes against policy. |
| ReBAC | Relationship-based access control: using relationships in access decisions. |
| Identity proofing | Collecting and verifying evidence that a claimed real-world identity belongs to an applicant. |
| IAL / AAL / FAL | Identity, authenticator, and federation assurance levels in NIST SP 800-63. |
| Phishing-resistant authentication | Authentication that a fake site cannot relay, such as WebAuthn bound to the legitimate origin. |
| Passkey | A FIDO public-key credential used for sign-in, device-bound or synchronized. |
| Step-up authentication | Requiring a stronger or fresher authentication for a sensitive action. |
| SoD | Separation of duties: preventing one subject from holding conflicting access. |
| Least privilege | Granting only the access needed for a task, scope, and duration. |
| JIT access | Just-in-time access: privileges activated for a limited time and removed automatically. |
| ZSP | Zero standing privilege: no identity holds high-impact privileges permanently. |
| Break-glass account | A monitored emergency account for use when normal access paths fail. |
| Access certification | A periodic review in which owners confirm or revoke existing access. |
| BOLA / IDOR | Broken object-level authorization: failing to check access to a specific object. |

## Capabilities and protocols

| Term | Working definition |
| --- | --- |
| IGA | Identity governance and administration: lifecycle, access governance, and related administration. |
| PAM | Privileged access management: controlling and monitoring elevated access. |
| CIAM | Customer identity and access management. |
| OAuth | A framework for delegated authorization. |
| OIDC | OpenID Connect: an identity layer built on OAuth 2.0. |
| SAML | An XML-based framework for exchanging assertions, commonly used for federation. |
| SCIM | A standard schema and protocol for cross-domain identity management. |
| JWT | A claims representation format; its presence alone proves neither trust nor authorization. |
| PDP / PEP | Policy decision point / policy enforcement point. |
| PIP / PAP | Policy information point (supplies attributes) / policy administration point (manages policy). |
| ITDR | Identity threat detection and response: detecting and responding to the misuse of identities. |
| PKCE | Proof Key for Code Exchange: binds an authorization request to the token request. |
| Access token | A credential a client presents to a resource server to access a protected API. |
| Refresh token | A credential a client uses to obtain new access tokens without user interaction. |
| ID token | An OIDC token telling the client about an authentication event and its subject. |
| Scope | A string describing requested or granted access in OAuth. |
| JWKS | JSON Web Key Set: an issuer's published public keys used to verify signatures. |
| DPoP | Demonstrating Proof of Possession: binds an OAuth token to a key held by the client. |
| Token exchange | Trading one token for another with a different audience, scope, or actor (RFC 8693). |
| LDAP | Lightweight Directory Access Protocol, for reading and modifying directories. |
| Kerberos | A ticket-based network authentication protocol, central to Active Directory. |
| KDC / TGT | Key Distribution Center / Ticket-Granting Ticket: the Kerberos server and the ticket it issues after sign-in, used to request service tickets. |
| SPN | Service principal name: the identifier of a service in a Kerberos realm. |
| NameID | The subject identifier in a SAML assertion, with a format such as persistent, transient, or email. |
| SLO | SAML Single Logout: propagating logout to every participant in a SAML session. |
| SSF / CAEP / RISC | Shared Signals Framework and its profiles for exchanging session and risk events. |
| SET | Security Event Token: a signed JWT carrying a security event (RFC 8417). |
| AuthZEN | OpenID Foundation standard API between policy enforcement and decision points. |
| SPIFFE / SVID | A standard for workload identifiers, and the short-lived identity document (X.509 or JWT) it issues. |
| mTLS | Mutual TLS: both sides of a TLS connection authenticate with certificates. |
| MCP | Model Context Protocol: a protocol for AI applications to call tools and data sources, with OAuth-based authorization. |
| Zero Trust | An approach that evaluates each access request rather than trusting network location. |

## OAuth and OpenID Connect

| Term | Working definition |
| --- | --- |
| Authorization server (AS) | Issues tokens to clients after authenticating users and applying policy. |
| OP | OpenID provider: an authorization server that also issues ID tokens; the OIDC name for an IdP. |
| Resource server (RS) | The API that accepts and validates access tokens. |
| Public / confidential client | A client that cannot / can keep a credential secret. |
| `private_key_jwt` | Client authentication with a JWT signed by the client's private key. |
| Introspection | Asking the authorization server whether a token is active and what it represents (RFC 7662). |
| UserInfo | The OIDC endpoint that returns claims about the signed-in user. |
| Opaque token | A reference token whose meaning is known only to the issuer. |
| Self-contained token | A token carrying its claims by value, usually a signed JWT. |
| Phantom token | Pattern where clients hold opaque tokens and a gateway swaps them for JWTs internally. |
| `state` / `nonce` | Values that bind a response to the request that started it (CSRF and replay protection). |
| `acr` / `amr` | Claims describing the authentication context and methods used. |
| `cnf` | Confirmation claim binding a token to a key or certificate. |
| Sender-constrained token | A token usable only by the client holding a specific key or certificate (DPoP, mTLS). |
| PAR | Pushed Authorization Requests: sending authorization parameters over a back channel (RFC 9126). |
| JAR | JWT-Secured Authorization Request: authorization parameters in a signed request object (RFC 9101). |
| RAR | Rich Authorization Requests: structured permissions in `authorization_details` (RFC 9396). |
| Resource indicator | The `resource` parameter that requests a token for a specific API (RFC 8707). |
| Protected Resource Metadata | A document describing an API's authorization servers and requirements (RFC 9728). |
| Dynamic client registration | Clients registering themselves at the authorization server (RFC 7591). |
| CIMD | Client ID Metadata Document: a `client_id` that is an HTTPS URL serving the client's metadata (IETF draft). |
| CIBA | Client-Initiated Backchannel Authentication: authenticating the user on a separate device. |
| Back-channel logout | The OP notifies RPs of logout by sending them a signed logout token directly. |
| FAPI | OpenID Foundation security profiles for high-risk APIs such as open banking. |

## Application security

| Term | Working definition |
| --- | --- |
| BFF | Backend for frontend: a server-side component that holds tokens on behalf of a browser app. |
| Session cookie | A cookie identifying the user's session with an application. |
| `HttpOnly` / `Secure` / `SameSite` | Cookie attributes that block script access, require HTTPS, and limit cross-site sending. |
| Session fixation | Forcing a known session identifier on a victim; prevented by regenerating the ID at login. |
| CSRF | Cross-site request forgery: another site triggering requests that carry the user's cookies. |
| XSS | Cross-site scripting: attacker-controlled script running in a page's origin. |
| CSP | Content Security Policy: a response header restricting which scripts and resources a page may load. |
| DAC / MAC | Discretionary (owner-controlled) / mandatory (label-based, centrally enforced) access control. |
| ACL | Access control list: permissions stored with each resource. |
| PBAC | Policy-based access control: externalized, centrally managed authorization policies. |
| NGAC | NIST's Next Generation Access Control, a graph-based model. |
| API gateway | An edge component enforcing authentication, rate limits, and coarse policies for APIs. |

## How to use this glossary

Read [What is IAM?](what-is-iam.md) for the overall map and [identity assurance levels](identity-assurance.md) for the assurance vocabulary. For a specific protocol, use the articles under [standards and protocols](../standards/standards-map.md), which link to normative definitions.
