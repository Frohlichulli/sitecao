# Security Specification - Cáo Meu Amigo

## 1. Data Invariants
- A gallery image must have a string URL.
- A gallery image must have a title.
- `createdAt` must be a server timestamp.
- Only authenticated users (admins) can modify the gallery.

## 2. The "Dirty Dozen" Payloads (Red Team Test Cases)

| ID | Collection | Action | Payload | Expected | Reason |
|----|------------|--------|---------|----------|--------|
| DD1 | gallery | create | `{ url: "not-a-url", title: "Test" }` | Deny | Missing `createdAt` |
| DD2 | gallery | create | `{ url: "link", title: "Test", createdAt: "2023-01-01" }` | Deny | `createdAt` must be server timestamp |
| DD3 | gallery | create | `{ url: "link", title: "Test", createdAt: request.time, extra: "hacker" }` | Deny | Extra field (Ghost field) |
| DD4 | gallery | create | `{ url: "link", title: "Test", createdAt: request.time }` (Unauth) | Deny | Only admins can write |
| DD5 | gallery | update | `{ title: "New" }` (Owner of nothing) | Deny | Should only be allowed by admin |
| DD6 | gallery | delete | (Any ID) (Unauth) | Deny | Only admins can delete |
| DD7 | gallery | create | `{ url: "link", title: "A".repeat(200), createdAt: request.time }` | Deny | Title too long |
| DD8 | gallery | update | `{ url: "new-url" }` | Deny | `url` should be immutable for updates or needs specific admin check |
| DD9 | gallery | list | (Unauth) | Allow | Public gallery |
| DD10 | admins | write | `{ role: "admin" }` (Self-assign) | Deny | Admins list is system-only |
| DD11 | gallery | create | `{ url: 123, title: "Test", createdAt: request.time }` | Deny | `url` must be string |
| DD12 | gallery | write | `{ id: "../../etc/passwd" }` | Deny | Malicious ID |

## 3. Test Runner
A `firestore.rules.test.ts` will be created to verify these invariants.
