---
title: Cookies, session tokens, and web sessions
description: Design web sessions with secure cookies, server-side or stateless session tokens, timeouts, and protection against fixation and CSRF.
category: patterns
order: 8
level: Intermediate
updated: 2026-10-18
tags: [cookies, sessions, session token, HttpOnly, SameSite, CSRF, session fixation, localStorage, third-party cookies]
---
After a user signs in, a web application needs to remember them on every request. That is the job of the **session**, usually carried by a cookie. Session design determines how long access lasts, how it ends, and how exposed it is to theft.

## Kinds of session state

| Kind | What the cookie holds | Advantages | Drawbacks |
| --- | --- | --- | --- |
| Server-side session | A random session identifier; data lives in a server store. | Immediate revocation; small cookie; data hidden from the client. | Requires a shared store across instances. |
| Stateless (client-side) session | Signed and usually encrypted session data, for example a JWT or encrypted blob. | No server store; scales easily. | Hard to revoke before expiry; larger cookies; key management. |

Server-side sessions are the safer default. Stateless sessions need short lifetimes and a revocation strategy, as with [self-contained tokens](../oauth-oidc/self-contained-and-opaque-tokens.md).

## Cookie attributes

| Attribute | Recommendation | Why |
| --- | --- | --- |
| `Secure` | Always. | Sent only over HTTPS. |
| `HttpOnly` | Always for session cookies. | Not readable by JavaScript, limiting XSS theft. |
| `SameSite` | `Lax` or `Strict`; `None` only when cross-site use is required (and then `Secure` is mandatory). | Limits cross-site sending and CSRF. |
| `Domain` | Omit. | Host-only cookies are not sent to sibling subdomains. |
| `Path` | `/` | Paths are not a security boundary. |
| `Max-Age` / `Expires` | Omit for a browser-session cookie; set for “remember me”. | Controls persistence on the device. |
| `__Host-` prefix | Use for session cookies. | Browser enforces `Secure`, `Path=/`, and no `Domain`. |

```http
Set-Cookie: __Host-session=Xk3f9…; Secure; HttpOnly; SameSite=Lax; Path=/
```

## Session lifecycle

- **Generate** identifiers with a cryptographically secure random generator and at least 64 bits of entropy.
- **Regenerate** the session identifier at login and at privilege changes to prevent session fixation.
- **Idle timeout:** end sessions after inactivity, shorter for sensitive applications.
- **Absolute timeout:** end sessions after a maximum lifetime regardless of activity.
- **Re-authenticate** for sensitive actions, such as changing email or payment details.
- **Logout** invalidates the session server-side, clears the cookie, and, where relevant, ends the identity provider session.
- **Show active sessions** to users and let them revoke them.

## CSRF

Browsers attach cookies automatically, so another site can trigger requests with the user's session. Defenses:

1. `SameSite=Lax` or `Strict` on session cookies.
2. Anti-CSRF tokens (synchronizer or double-submit) for state-changing requests.
3. For JSON APIs, require a custom header that forces a CORS preflight.
4. Never change state with `GET`.

## Where should a browser keep tokens?

| Storage | XSS can read it? | CSRF risk? | Notes |
| --- | --- | --- | --- |
| `HttpOnly` cookie | No | Yes, mitigate | Best for session identifiers; used by the [BFF pattern](backend-for-frontend.md). |
| JavaScript memory | Yes, while the page runs | No | Lost on reload; good for short-lived access tokens. |
| `sessionStorage` / `localStorage` | Yes, persistently | No | Avoid for tokens; any XSS can exfiltrate them. |

## Sessions in a federated world

A user signed in through SSO has at least two sessions: one at the identity provider and one at each application. Their lifetimes are independent. Ending the application session does not end the identity provider session, and vice versa, unless logout is propagated. See [OpenID Connect in depth](../oauth-oidc/oidc-in-depth.md) and [sessions, tokens, and revocation](../processes/sessions-and-revocation.md).

Safari and Firefox block or partition third-party cookies by default. Chrome still allows them, although users can block them in its settings. A design cannot assume either behavior, so patterns that rely on cookies inside cross-site iframes, such as silent token renewal and front-channel logout, are unreliable. Prefer same-site architectures and back-channel mechanisms.

## Session cookies versus access tokens

| | Session cookie | Access token |
| --- | --- | --- |
| Audience | The application that set it. | A resource server (API). |
| Sent by | The browser, automatically. | The client, explicitly. |
| Typical lifetime | Minutes to days, with idle timeout. | Minutes. |
| Threats | CSRF, theft via malware. | Leakage, replay, XSS when held by JavaScript. |

## References

- [HTTP State Management Mechanism, RFC 6265](https://www.rfc-editor.org/rfc/rfc6265.html) and its [revision in progress (RFC 6265bis)](https://datatracker.ietf.org/doc/draft-ietf-httpbis-rfc6265bis/).
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).
- [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).
- [MDN: Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie) and [MDN: Using HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies).
- [NIST SP 800-63B-4, session management](https://pages.nist.gov/800-63-4/sp800-63b.html).
