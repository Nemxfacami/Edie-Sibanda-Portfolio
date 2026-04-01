### Title



Two-Factor Authentication Bypass via Improper Session Enforcement



#### Summary



The application allows users to access protected account functionality before completing the second authentication factor. By directly requesting the account using the session cookie issued after primary authentication, 2FA can be bypassed.



#### Description



After I submitted valid username and password credentials, the server issues a session cookie and redirects the user to /login2 for OTP verification. However, this session is already considered authenticated for access control purposes.



When I intercepted the response and manually requesting /my-account?id=carlos using the issued session cookie, it is possible to access the account page without completing 2FA verification.



#### Impact



An attacker with valid credentials can bypass mu-factor authentication entirely, gaining full access to protected user accounts. This defeats the purpose of 2FA and significantly weakens account security.



#### Root Cause



The application fails to enforce 2FA validation server-side before granting access to protected endpoints. Session authentication state is incorrectly marked as complete after password validation.



#### Recommendation



* Ensure session is marked as "pending 2FA" until OTP verification succeeds.



* Enforce 2FA validation server-side for all protected resources



* Bind authentication state strictly to session validation logic
