---
title: MFA, passkeys, and account recovery
description: Understand factor types, phishing resistance, synced and device-bound passkeys, and the importance of the recovery path.
category: standards
order: 6
level: Intermediate
updated: 2026-10-18
tags: [MFA, passkeys, WebAuthn, FIDO, phishing resistance, recovery, authentication, OTP, push fatigue, number matching]
---
Authentication mechanisms differ in their resistance to phishing, theft, replay, and recovery abuse. A second step does not automatically mean a second factor or protection against every attack.

## Distinct factors

Common factor types are something you know, something you have, and something you are. Two passwords remain the same factor type. A biometric that locally unlocks a cryptographic authenticator can participate in a multi-factor authentication process without being sent to the application.

Evaluate the whole mechanism, including enrollment, device binding, user verification, fallback, and recovery.

## Compare common methods

| Method | Phishing-resistant? | Main weaknesses | Notes |
| --- | --- | --- | --- |
| Password only | No | Reuse, stuffing, phishing. | Single factor. |
| SMS or voice code | No | Phishing, SIM swap, number porting, interception. | NIST SP 800-63B-4 treats the phone network as a **restricted** authenticator: offer an alternative and assess the risk. |
| TOTP app code | No | Real-time phishing relays the code. | Better than SMS; no dependence on the phone network. |
| Push approval | No | MFA fatigue: repeated prompts until one is approved. | Use **number matching** (the user types a number shown on the sign-in screen) and show the location and application. |
| Passkey or security key (WebAuthn) | Yes | Account recovery; device loss. | The credential is bound to the legitimate origin. |
| Smart card or PKI certificate | Yes, with TLS client authentication | Card issuance and lifecycle overhead. | Common in government and regulated environments. |

## Phishing resistance

One-time codes can provide additional protection over a password alone, but a person can still be tricked into entering them at an attacker's site. Phishing-resistant authentication binds the authentication to the legitimate verifier in a way that a fake site cannot simply relay as a reusable secret.

NIST describes two ways to achieve this: **verifier name binding**, where the authenticator only responds for the legitimate site (as WebAuthn does with the origin), and **channel binding** to the authenticated TLS session.

## WebAuthn and passkeys

WebAuthn lets web applications use public-key credentials. The server stores a public key; the corresponding private key is controlled by the authenticator. Credentials are scoped to a relying party, and browser origin checks participate in the security model.

Passkeys use FIDO credentials and can be device-bound or synchronized through a credential provider. Those deployment choices affect availability, recovery, and assurance requirements:

| | Synced passkey | Device-bound passkey or security key |
| --- | --- | --- |
| Where the private key lives | Copied across the user's devices by a credential provider. | One device or security key; not exportable. |
| Recovery after device loss | Usually transparent, through the provider account. | Needs another registered authenticator. |
| Assurance (NIST SP 800-63B-4) | Up to AAL2. Not allowed at AAL3, because the key is exportable. | Can meet AAL3 with a hardware-protected key. |
| Security dependency | The credential provider account and its own recovery. | The physical device. |

An authenticator may be built into a phone or computer, or be a separate security key. The user experience and assurance requirements should guide the choice.

## Recovery is part of authentication

Imagine an application with strong passkey sign-in but a help desk that resets accounts based only on a caller knowing a name and team. The recovery process can undermine the intended protection.

Define how users register additional authenticators, recover after device loss, report compromise, and invalidate old authenticators. Give support staff clear procedures and evidence requirements.

## An example

A company rolls out passkeys to its workforce.

- **Everyone** registers a synced passkey on their phone and laptop. This meets AAL2 and removes passwords from daily sign-in.
- **Administrators** also receive two hardware security keys, one kept in a safe, for AAL3 access to privileged roles. See [privileged access management](../capabilities/privileged-access.md).
- **SMS codes** are disabled for staff and remain only as a monitored fallback for a small group without compatible devices.
- **Recovery** requires a video call with identity verification and manager confirmation. Every new authenticator triggers a notification to the user's existing devices.

## Start with requirements

Identify who is authenticating, what resources are involved, which threats matter, and what accessibility and device constraints exist. Then select an authentication and recovery design that meets those needs. See [identity assurance levels](../fundamentals/identity-assurance.md) to express those requirements as AAL choices.

## References

- [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html) covers authenticators, assurance, phishing resistance, syncable authenticators, and lifecycle requirements.
- [W3C WebAuthn](https://www.w3.org/TR/webauthn-3/) specifies the web API and related validation model.
- [FIDO Alliance: passkeys](https://fidoalliance.org/passkeys/) explains passkey terminology and deployment concepts.
- [CISA: Implementing phishing-resistant MFA](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf) and [number matching](https://www.cisa.gov/sites/default/files/publications/fact-sheet-implement-number-matching-in-mfa-applications-508c.pdf).
