---
title: Shared Signals, CAEP, and RISC
description: Let identity providers and applications notify each other of session revocations, credential changes, and compromise.
category: standards
order: 10
level: Advanced
updated: 2026-10-18
tags: [Shared Signals, SSF, CAEP, RISC, SET, continuous access evaluation, revocation]
---
After a sign-in, an application often has no idea that anything has changed. The identity provider may have disabled the account or detected a stolen session, but the application's session continues. Shared Signals addresses this gap by letting systems send each other security events.

## The pieces

| Component | Role |
| --- | --- |
| Shared Signals Framework (SSF) | How a transmitter and a receiver set up a stream, describe subjects, and deliver events. |
| CAEP — Continuous Access Evaluation Profile | Events about sessions and access conditions. |
| RISC — Risk Incident Sharing and Coordination | Events about account and credential compromise or changes. |
| Security Event Token (SET), RFC 8417 | The signed JWT format that carries each event. |
| Push and poll delivery, RFC 8935 and RFC 8936 | How events are transported over HTTP. |
| Subject identifiers, RFC 9493 | How an event names the user, device, or session concerned. |

SSF 1.0, CAEP 1.0, and RISC 1.0 were approved as OpenID Foundation Final Specifications in September 2025, so implementations can target a stable version. They are maintained by the Shared Signals Working Group.

## Example events

| Profile | Event | Typical reaction by the receiver |
| --- | --- | --- |
| CAEP | Session revoked | Terminate the matching local session. |
| CAEP | Credential change | Re-evaluate sessions; require re-authentication if needed. |
| CAEP | Assurance level change | Step up authentication for sensitive actions. |
| CAEP | Device compliance change | Block or limit access from the device. |
| RISC | Account disabled | Disable or suspend the linked account. |
| RISC | Credential compromise | Reset or disable the affected credential. |
| RISC | Identifier changed | Update the stored identifier mapping. |

## How it changes revocation

Without signals, a receiver learns about changes only when tokens expire or the user signs in again. With signals, the identity provider can transmit a session-revoked event and a cooperating application ends the session within seconds.

The flow can go both ways: an application detecting suspicious behavior can send an event to the identity provider, which may then revoke sessions across all applications.

## Design considerations

- **Mapping subjects.** The receiver must map the event's subject identifier to its own account or session. Agree on identifier formats in advance.
- **Trust.** Validate the SET signature, issuer, and audience as for any JWT; see [JWT and token validation](../oauth-oidc/jwt-and-token-validation.md).
- **Idempotence and ordering.** Events can be delayed or delivered more than once. Design receivers to handle duplicates safely.
- **Actionability.** An event the receiver cannot act on adds no protection. Start with the events that close your biggest revocation gaps.

## Keep learning

This complements [sessions, tokens, and revocation](../processes/sessions-and-revocation.md) and [identity threat detection](../capabilities/identity-threat-detection.md).

## References

- [OpenID Shared Signals Framework 1.0](https://openid.net/specs/openid-sharedsignals-framework-1_0-final.html).
- [OpenID Continuous Access Evaluation Profile 1.0](https://openid.net/specs/openid-caep-1_0-final.html).
- [OpenID RISC Profile 1.0](https://openid.net/specs/openid-risc-1_0-final.html).
- [OpenID Shared Signals Working Group](https://openid.net/wg/sharedsignals/).
- [Security Event Token, RFC 8417](https://www.rfc-editor.org/rfc/rfc8417.html).
- [Push-Based SET Delivery, RFC 8935](https://www.rfc-editor.org/rfc/rfc8935.html) and [Poll-Based SET Delivery, RFC 8936](https://www.rfc-editor.org/rfc/rfc8936.html).
- [Subject Identifiers for Security Event Tokens, RFC 9493](https://www.rfc-editor.org/rfc/rfc9493.html).
