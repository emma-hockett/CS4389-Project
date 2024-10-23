USE cubebuster;

DELIMITER //

-- Procedure to sign up a customer to the system
-- Inputs: Customer Name, Address, CC Number, Birth Date, Email, Password, and @Variable to hold status message 
-- Outputs: Status Message: 'Success' or condition that was violated
-- How to call: SET @status = ''; CALL customer_sign_up(user_name, user_address, CCnum, user_bday, user_email, user_password, @status); SELEECT @status;
CREATE PROCEDURE customer_sign_up (
	IN user_name  varchar(20),
    IN user_address varchar(30),
    IN CCNum char(16),
    IN user_bday DATE,
    IN user_email varchar(25),
    IN user_password varchar(20),
    OUT status_message varchar(100))
cust_sign_up: BEGIN
		SET status_message = 'Success';
    
		IF EXISTS (SELECT Email FROM Customer WHERE Email = user_email) THEN
			SET status_message = 'Email already associated with an account';
            LEAVE cust_sign_up;
		ELSEIF user_name NOT REGEXP '^[a-zA-Z]+$' THEN 
			SET status_message = 'Name can only be alphabetic characters';
			LEAVE cust_sign_up;
		ELSEIF CCNum NOT REGEXP '[0-9]$' THEN 
			SET status_message = 'Not valid credit card number';
			LEAVE cust_sign_up;
		ELSEIF user_bday > NOW() THEN 
			SET status_message = 'Birth date cannot be in the future';
			LEAVE cust_sign_up;
		ELSEIF (user_bday <= NOW() - INTERVAL 13 YEAR) THEN 
			SET status_message = 'Must be at least 13 years old';
			LEAVE cust_sign_up;
		ELSEIF user_email NOT REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\..[a-zA-Z]{2,}$' THEN 
			SET status_message = 'Email not in correct format';
			LEAVE cust_sign_up;
		END IF;
    
    INSERT INTO Customer(username, Address, CCNum, Bday, Email, userpswd)
    VALUES (user_name, user_address, CCNum, user_bday, user_email, user_password);

END //

-- Procedure to sign up an employee
-- Inputs: Employee Name, Address, SSN, Email, Phone, Password, and @Variable to hold status message 
-- Outputs: Status Message: 'Success' or condition that was violated
-- How to call: SET @status = ''; CALL employee_sign_up(emp_name, emp_address, SSN, user_email, emp_phone, emp_password, @status); SELEECT @status;
CREATE PROCEDURE employee_sign_up (
	IN emp_name  varchar(20),
    IN emp_address varchar(30),
    IN SSN char(9),
    IN emp_email varchar(25),
    IN emp_phone char(10),
    IN emp_password varchar(20),
    OUT status_message varchar(100))
emp_sign_up: BEGIN
		SET status_message = 'Success';
    
		IF EXISTS (SELECT Email FROM Employee WHERE Email = emp_email) THEN
			SET status_message = 'Email already associated with an account';
            LEAVE emp_sign_up;
		ELSEIF emp_name NOT REGEXP '^[a-zA-Z]+$' THEN 
			SET status_message = 'Name can only be alphabetic characters';
			LEAVE emp_sign_up;
		ELSEIF SSN NOT REGEXP '[0-9]$' THEN 
			SET status_message = 'Not valid Social Security number';
			LEAVE emp_sign_up;
		ELSEIF emp_email NOT REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\..[a-zA-Z]{2,}$' THEN 
			SET status_message = 'Email not in correct format';
			LEAVE emp_sign_up;
		ELSEIF emp_phone NOT REGEXP '^[0-9]$' THEN
			SET status_message = 'Incorrect phone number format';
            LEAVE emp_sign_up;
		END IF;
    
    INSERT INTO Employee(empName, Address, SSN, Email, Phone, empPassword)
    VALUES (emp_name, emp_address, SSN, emp_email, emp_phone, emp_password);

END //



DELIMITER ;