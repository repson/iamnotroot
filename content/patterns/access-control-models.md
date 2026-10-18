---
title: Access control models compared
description: DAC, MAC, ACLs, capabilities, RBAC, ABAC, ReBAC, PBAC, and NGAC — characteristics, advantages, drawbacks, use cases, and implementations.
category: patterns
order: 2
level: Intermediate
updated: 2026-10-18
tags: [access control models, DAC, MAC, ACL, capabilities, RBAC, ABAC, ReBAC, PBAC, NGAC, Zanzibar, authorization]
---
An access control model is a way of expressing and deciding who may do what to which resource. Models differ in where the rules live, who can change them, and what questions they answer easily. Most real systems combine several.

## The models at a glance

| Model | Decision based on | Who sets the rules |
| --- | --- | --- |
| DAC — discretionary | The resource owner's grants. | The owner. |
| MAC — mandatory | Security labels on subjects and objects. | A central authority; users cannot override. |
| ACL — access control list | A list attached to each resource. | Owners or administrators. |
| Capabilities | Unforgeable tokens held by the subject. | Whoever issues the capability. |
| RBAC — role-based | The subject's roles. | Administrators, via role assignment. |
| ABAC — attribute-based | Attributes of subject, resource, action, and environment. | Policy authors. |
| ReBAC — relationship-based | Relationships in a graph (owner, member, parent). | Application data plus a schema. |
| PBAC — policy-based | Externalized policies, often combining the above. | Policy authors, as code. |
| NGAC — next generation | Graph of users, attributes, objects, and policy classes. | Administrators, through the graph. |

## Discretionary access control (DAC)

The owner of a resource decides who else can access it. File-system permissions and document sharing (“share with Maya, can edit”) are DAC.

- **Advantages:** intuitive, flexible, no central bottleneck.
- **Drawbacks:** access sprawls, owners make inconsistent decisions, hard to enforce organization-wide rules.
- **Use cases:** collaboration tools, personal files, small teams.

## Mandatory access control (MAC)

A central policy assigns labels such as *Confidential* or *Secret* to data and clearances to subjects. Rules such as Bell–LaPadula's “no read up, no write down” protect confidentiality; Biba protects integrity. Users cannot share beyond what the labels allow.

- **Advantages:** strong, non-bypassable guarantees.
- **Drawbacks:** rigid, administrative overhead, poor fit for dynamic collaboration.
- **Use cases:** military and government classification, operating-system hardening (SELinux, AppArmor), multi-level secure systems.

## ACLs and capabilities

These are two ways to store the same access matrix. An **ACL** is stored with the object (“who can access this file?”). A **capability** is held by the subject (“what can this token access?”).

- ACLs make “who can access X?” easy and “what can Maya access?” hard.
- Capabilities make delegation easy and revocation hard. OAuth access tokens behave like capabilities: whoever holds one can use it, which is why [sender-constrained tokens](../oauth-oidc/dpop.md) and short lifetimes matter.

## Role-based access control (RBAC)

Permissions are assigned to roles, and roles to subjects. The ANSI INCITS 359 standard defines four components: **Core RBAC** (user–role and permission–role assignment, and sessions; the only mandatory component), **Hierarchical RBAC** (roles inherit from others), **Static Separation of Duty** (conflicting roles cannot be assigned together), and **Dynamic Separation of Duty** (conflicting roles cannot be active in the same session). The earlier NIST model it grew from described four cumulative levels instead: flat, hierarchical, constrained, and symmetric.

- **Advantages:** easy to understand, review, and audit; maps to job functions; widely supported.
- **Drawbacks:** role explosion when access depends on context such as region, amount, or ownership; coarse-grained.
- **Use cases:** enterprise applications, workforce access, administrative consoles.

See [RBAC, ABAC, and relationships](rbac-and-abac.md) and [roles, groups, and entitlements](../identity-modeling/roles-groups-entitlements.md).

## Attribute-based access control (ABAC)

Policies evaluate attributes: “allow `read` if `user.department == resource.department` and `time` is within business hours”.

- **Advantages:** fine-grained, context-aware, fewer roles, expresses rules directly.
- **Drawbacks:** depends on attribute quality and freshness; answering “who can access X?” requires evaluating policies over all users; harder to explain.
- **Use cases:** regulated data, data classification, context-dependent access, multi-tenant rules.

## Relationship-based access control (ReBAC)

Access follows from relationships: Maya can edit a document because she is an editor of the folder that contains it. Google's Zanzibar paper popularized a scalable design based on relationship tuples (`document:readme#editor@user:maya`) and a schema that defines how relations compose.

- **Advantages:** natural for sharing, hierarchies, and ownership; answers both “can Maya edit X?” and “who can edit X?”; scales to very large datasets.
- **Drawbacks:** requires synchronizing relationship data into the authorization system; consistency and latency need care; modeling takes practice.
- **Use cases:** collaboration and document sharing, SaaS with organizations and teams, nested resources.

## Policy-based access control (PBAC)

PBAC is less a distinct model than an architecture: authorization is externalized into policies managed as code and evaluated by a decision engine. The policies may use roles, attributes, and relationships. See [policy engines and policy as code](policy-engines.md).

## Next Generation Access Control (NGAC)

NGAC, developed at NIST, represents users, objects, attributes, and policy classes as a graph with assignments and prohibitions. It aims to express RBAC, ABAC, and MAC policies in one framework, with efficient review queries.

## Choosing and combining

| Question | Favors |
| --- | --- |
| Is access mostly determined by job function? | RBAC |
| Does it depend on data properties or context? | ABAC |
| Does it depend on ownership, sharing, or hierarchy? | ReBAC |
| Must users be unable to override it? | MAC |
| Do auditors need “who has access to X?” quickly? | RBAC, ReBAC |

A common combination is RBAC for coarse application access, ReBAC for resource sharing, and ABAC conditions for context such as amount limits or device posture.

## Implementations

The following are examples, not endorsements; check the official documentation for current capabilities.

| Model | Examples |
| --- | --- |
| RBAC | Built into most identity providers, directories, cloud IAM, and frameworks such as [Spring Security](https://docs.spring.io/spring-security/reference/servlet/authorization/index.html). |
| ABAC / PBAC | [Open Policy Agent](https://www.openpolicyagent.org/docs/latest/), [Cedar](https://docs.cedarpolicy.com/) and [Amazon Verified Permissions](https://docs.aws.amazon.com/verifiedpermissions/), [Cerbos](https://docs.cerbos.dev/), XACML engines. |
| ReBAC | [OpenFGA](https://openfga.dev/docs), [SpiceDB](https://authzed.com/docs), [Ory Keto](https://www.ory.com/docs/keto). |
| MAC | [SELinux](https://github.com/SELinuxProject/selinux-notebook), AppArmor. |
| Multiple models | [Casbin](https://casbin.apache.org/docs/overview/) supports ACL, RBAC, and ABAC models through configuration. |

## References

- [NIST RBAC project](https://csrc.nist.gov/projects/role-based-access-control).
- [NIST SP 800-162: Guide to ABAC](https://csrc.nist.gov/pubs/sp/800/162/upd2/final).
- [NIST SP 800-192: Verification and Test Methods for Access Control Policies/Models](https://csrc.nist.gov/pubs/sp/800/192/final).
- [Zanzibar: Google's Consistent, Global Authorization System](https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/).
- [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html).
