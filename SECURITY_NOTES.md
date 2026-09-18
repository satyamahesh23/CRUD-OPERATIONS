# Security Notes — Authentication & Protected Routes

## Where tokens are stored, and why

This project stores the JWT in an httpOnly cookie, not in localStorage or sessionStorage.

- httpOnly: true means JavaScript running in the browser (including malicious injected scripts) cannot read or steal the cookie — only the browser itself can send it automatically on each request.
- If the token were stored in localStorage instead, any successful XSS attack on the site could read it directly. httpOnly cookies close that door.
- sameSite: 'strict' was also set on the cookie, which stops the browser from sending it along with requests from other websites — helps protect against CSRF.

## Password handling

- Passwords are never stored in plain text. bcryptjs hashes the password with a randomly generated salt before saving, so even if the database leaked, raw passwords aren't exposed.
- Login re-hashes the entered password and compares the two hashes (bcrypt.compare) — the stored password is never "un-hashed."
- The password field is explicitly excluded (.select('-password')) whenever user data is sent back to the frontend.

## Common pitfalls avoided (and to watch for)

- Storing JWTs in localStorage — vulnerable to XSS; this project uses httpOnly cookies instead.
- Generic error messages on login — same "Invalid email or password" message whether the email doesn't exist or the password is wrong, so attackers can't guess valid emails.
- Not validating tokens on protected routes — every protected route runs through a `protect` middleware that verifies the JWT before allowing access.
- CORS misconfiguration — explicitly configured with origin + credentials: true so only the intended frontend can send authenticated requests.
- Long-lived tokens — tokens expire after 30 days; a production system would likely use a shorter expiry plus refresh tokens.
- Re-hashing an already-hashed password — the pre('save') hook checks isModified('password') so updating unrelated fields (like name) doesn't break the stored password.

## Summary

| Concern | How it's handled here |
|---|---|
| Where is the token stored? | httpOnly cookie (not localStorage) |
| Can JavaScript read the token? | No — httpOnly blocks this |
| Are passwords stored safely? | Hashed with bcrypt + salt |
| Are protected routes checked? | Yes — protect middleware on every request |
| CSRF considered? | Partially — sameSite: 'strict' |
| Token expiry? | 30 days |