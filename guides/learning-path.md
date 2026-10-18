---
title: A path through the essentials
description: Start with the language of identity, then connect the model, architecture, and lifecycle.
updated: 2026-10-18
---
You do not need to read every standard before understanding IAM. Follow this short route, then explore the areas that match your work. Each step builds on the last.

## 01 — Learn the vocabulary

Begin with [What is IAM?](../content/fundamentals/what-is-iam.md). Then distinguish [identities, accounts, and credentials](../content/fundamentals/identities-accounts-credentials.md) and compare [authentication and authorization](../content/fundamentals/authentication-and-authorization.md). Finish with the [principles for better access](../content/fundamentals/security-principles.md) that recur in every later step.

**You should be able to explain:** why a successful sign-in is only part of managing access.

## 02 — Describe the identity

Read [a basic identity model](../content/identity-modeling/identity-model.md) and [sources, attributes, and correlation](../content/identity-modeling/sources-and-attributes.md).

**Try it:** sketch a person with two accounts, one affiliation, and a time-limited access assignment. Mark which system owns each fact.

## 03 — Connect the components

Explore [the components of an IAM architecture](../content/architecture/components.md) and [a workforce reference architecture](../content/architecture/workforce-reference.md). Then read [trust boundaries and Zero Trust](../content/architecture/trust-boundaries.md) to see where each connection needs validation.

**Try it:** draw a runtime sign-in flow separately from an administrative account-creation flow.

## 04 — Follow the lifecycle

Read [joiner, mover, leaver](../content/processes/joiner-mover-leaver.md) and [access requests and reviews](../content/processes/access-requests-and-reviews.md), then [sessions, tokens, and revocation](../content/processes/sessions-and-revocation.md).

**You should be able to explain:** why an account-disablement event does not necessarily end all active access immediately.

## 05 — Choose the right integration

Use [a map of IAM standards](../content/standards/standards-map.md) and [federation and provisioning](../content/patterns/federation-and-provisioning.md). Read [OAuth 2.0 in plain language](../content/oauth-oidc/oauth.md), [OpenID Connect](../content/oauth-oidc/openid-connect.md), [SAML](../content/standards/saml.md), and [SCIM](../content/standards/scim.md) for the protocols behind those choices, and [MFA, passkeys, and account recovery](../content/standards/modern-authentication.md) for the sign-in itself.

**Try it:** identify which mechanism handles application sign-in and which mechanism handles account removal.

## 06 — Apply the ideas

Walk through [onboarding an employee](../content/use-cases/employee-onboarding.md) and [giving a workload access to an API](../content/use-cases/workload-access.md). Compare how ownership, authentication, and revocation differ.

**Next:** use the [capability map](../content/capabilities/capability-map.md) to connect these technical building blocks to an operating IAM program.

## 07 — Govern and limit privilege

Read [identity governance](../content/capabilities/identity-governance.md), [roles, groups, and entitlements](../content/identity-modeling/roles-groups-entitlements.md), [RBAC, ABAC, and relationships](../content/patterns/rbac-and-abac.md), and [privileged access management](../content/capabilities/privileged-access.md). Then see how [just-in-time access](../content/patterns/just-in-time-access.md) reduces standing privilege.

**Try it:** pick one administrative role and describe how it would be requested, activated, logged, and removed.

## 08 — Secure the runtime

Study [JWT and token validation](../content/oauth-oidc/jwt-and-token-validation.md), [self-contained and opaque tokens](../content/oauth-oidc/self-contained-and-opaque-tokens.md), [protecting an API as a resource server](../content/oauth-oidc/resource-servers.md), and [authorization in APIs](../content/patterns/api-authorization.md). Continue with [policy engines](../content/patterns/policy-engines.md) when rules outgrow application code.

**You should be able to explain:** why a valid token for the right user can still be the wrong token for a request.

## 09 — Prepare for things going wrong

Read [emergency access](../content/processes/emergency-access.md), [identity threat detection](../content/capabilities/identity-threat-detection.md), and [responding to identity incidents](../content/processes/identity-incident-response.md). Walk through [offboarding a leaver urgently](../content/use-cases/urgent-offboarding.md).

**Try it:** list every place a compromised account could still have access after its password is reset.

## Go deeper

Choose the branch that matches your work:

- **Customer identity:** [customer IAM](../content/architecture/customer-iam.md) and [identity assurance levels](../content/fundamentals/identity-assurance.md).
- **Workloads and automation:** [non-human identities](../content/identity-modeling/non-human-identities.md) and [deploying from CI/CD without stored secrets](../content/use-cases/ci-cd-workload-federation.md).
- **OAuth and OpenID Connect:** [grant types and clients](../content/oauth-oidc/grants-and-clients.md), [authorization server endpoints](../content/oauth-oidc/authorization-server-endpoints.md), [discovery and metadata](../content/oauth-oidc/discovery-and-metadata.md), [OpenID Connect in depth](../content/oauth-oidc/oidc-in-depth.md), [token claims](../content/oauth-oidc/token-claims.md), [DPoP](../content/oauth-oidc/dpop.md), [PAR and JAR](../content/oauth-oidc/par-and-jar.md), [RAR](../content/oauth-oidc/rich-authorization-requests.md), [advanced OAuth](../content/oauth-oidc/oauth-extensions.md), and [threats and mitigations](../content/oauth-oidc/oauth-security.md). Then apply them in [authorizing a payment with PAR, RAR, and DPoP](../content/use-cases/payment-authorization.md).
- **Web and mobile applications:** [backend for frontend](../content/patterns/backend-for-frontend.md), [native and mobile apps](../content/patterns/native-apps.md), and [cookies and sessions](../content/patterns/cookies-and-sessions.md).
- **Authorization design:** [access control models compared](../content/patterns/access-control-models.md) and [API gateway policies](../content/patterns/api-gateway-policies.md).
- **Other protocols:** [Shared Signals](../content/standards/shared-signals.md) and [LDAP and Kerberos](../content/standards/ldap-and-kerberos.md).
- **AI agents:** [connecting an AI agent to a protected API](../content/use-cases/ai-agent-mcp.md).
- **Running the program:** [measuring an IAM program](../content/capabilities/iam-metrics.md), [partner access](../content/use-cases/b2b-partner-access.md), and [the product landscape](../content/capabilities/product-landscape.md).

## Keep a working glossary

Return to the [IAM glossary](../content/fundamentals/glossary.md) whenever an abbreviation gets in the way. Understanding the relationship between terms matters more than memorizing them.
