#### Title



SQL Injection via Product Category Filter (UNION-Based Data Extraction)



#### Summary



The application is vulnerable to SQL injection in the product category filter parameter. By manipulating the category parameter, it is possible to perform a UNION-based SQL injection and retrieve sensitive data from other tables, including usernames and passwords from the users table. This allows full compromise of the administrator account.



#### Description



While testing the /filter?category= parameter, I identified that user input is directly embedded into a SQL query without proper sanitization.



By injecting a single quote and using ORDER BY, I determined that the underlying query returns two columns.



Example:



Gifts' ORDER BY 1--

Gifts' ORDER BY 2--

Gifts' ORDER BY 3--





* ORDER BY 3 failed, confirming the query has two columns.





I then confirmed UNION injection was possible using:



Gifts' UNION SELECT NULL,NULL--



After testing which column was reflected in the response, I identified that only one column displayed text output.



---------------



Using this knowledge, I extracted usernames:



Gifts' UNION SELECT username,NULL FROM users--



Then extracted passwords:



Gifts' UNION SELECT password,NULL FROM users--





This revealed the credentials of all users, including the administrator account. I used the retrieved administrator password to log in successfully.



#### Impact



An attacker can retrieve all usernames and passwords stored in the database.



This leads to:



* Full account compromise



* Administrator access



* Potential privilege escalation



* Complete loss of data confidentiality



* Since credentials are exposed directly, the security impact is critical.



#### 

#### Root Cause



The application directly concatenates user-controlled input into SQL queries without parameterization or sanitization.



There is no use of prepared statements, and no input validation is enforced on the category parameter, allowing arbitrary SQL execution.



#### MITIGATION



* Use parameterized queries / prepared statements.



* Avoid dynamic string concatenation in SQL queries.



* Implement input validation and proper escaping.



* Apply least privilege principles to database accounts.



* Consider deploying a Web Application Firewall (WAF) as an additional defensive layer.
