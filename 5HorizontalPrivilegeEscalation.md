#### Title



Horizontal Privilege Escalation via GUID-Based User ID



#### Summary



While exploring the user account pages, I found that the application allows users to access other users’ account data by manipulating a user ID parameter.



Even though user IDs are GUIDs and look random, the server does not verify whether the currently authenticated session belongs to the requested ID. This means it’s possible to view another user’s account without authorization.



#### Vulnerable Endpoint



GET /my-account?id=<user-guid>





#### Vulnerability Type



* Broken Access Control



* Horizontal Privilege Escalation



* IDOR (Insecure Direct Object Reference)





#### Technical Analysis



I logged in using my own account:



username: wiener

password: peter



Once on the home page, I scrolled through the blogs. Each post showed the author’s username and a date, e.g.:



Carlos | 27 January 2026



----------------



Clicking the link to view the blog showed a URL like:



/blogs?userId=95d293ba-8546-4660-ab2e-9a17df2016aa



------------



That long string is Carlos’s GUID.



I realized the server is trusting the id parameter on the /my-account page. I intercepted my own account request:



/my-account?id=f4a3fe38-03d7-40b3-a498-27277eb5801c



--------------



Then replaced my GUID with Carlos’s:



/my-account?id=95d293ba-8546-4660-ab2e-9a17df2016aa



The server returned Carlos’s account page, including his API key.



This proves that the application does not enforce ownership verification for account IDs.





#### Proof of Concept





* Log in as a normal user.



* Access your account page: /my-account?id=<your-guid>.



* Find another user’s GUID from any publicly available page (e.g., blog post link).



* Replace your GUID with the other user’s GUID in the URL.



* The server returns the other user’s account page and API key.





#### Impact



* Unauthorized access to other users’ personal information.



* Exposure of sensitive data such as API keys.



* High risk if chained with other application vulnerabilities.



**Severity: High**



#### Root Cause



The application trusts the user-supplied id parameter without verifying that the session belongs to the requested ID. Ownership checks are missing server-side.

#### 

#### Recommendations



* Implement strict server-side access control.



* Derive the user account to display from the session, not a user-supplied parameter.



* Validate ownership before returning sensitive data.



* Avoid exposing raw GUIDs in URLs where possible.
