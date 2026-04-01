#### Title



Blind OS Command Injection in Feedback Function Leading to Remote Command Execution



#### Summary



The feedback functionality is vulnerable to blind OS command injection.

User-controlled input is passed into a backend shell command without proper sanitization, allowing arbitrary command execution.



Although command output is not returned in the HTTP response, successful exploitation can be confirmed via a measurable time delay.



#### Vulnerable Endpoint



* POST /feedback



* Content-Type: application/x-www-form-urlencoded



* Affected parameter:



* email





#### &nbsp;Vulnerability Type



* OS Command Injection



* Blind Command Injection (Time-based)





#### Technical Analysis



The application appears to construct and execute a system-level command using user-supplied input from the feedback form.



Because the email field is embedded into a shell command, it is possible to append additional commands using shell operators.



The output of injected commands is not returned in the HTTP response, indicating a blind injection scenario.



To confirm exploitation, a time-based payload was used to introduce a deliberate delay in the server response.





#### Proof of Concept



A payload was injected into the vulnerable parameter that caused the server to pause execution for 10 seconds.



leading to :



* The HTTP response was delayed by approximately 10 seconds.



* This confirms successful execution of arbitrary OS-level commands.





#### Impact





An attacker could:



* Execute arbitrary OS commands



* Perform reconnaissance on the host



* Read sensitive files



* Establish reverse shells



* Escalate privileges (depending on server configuration)



* This vulnerability could result in full system compromise.



**Severity: Critical**





#### MITIGATION



* Avoid passing user input directly into system commands.



* Use parameterized APIs instead of shell execution.



* Apply strict input validation.



* Implement allow-list validation for email fields.



* Escape or sanitize all user-controlled input before shell usage.
