USE cubebuster;

DELIMITER //

-- Procedure to get the information about a movie
-- Input: Movie ID
-- Ouput: Title, Release Year, Genre, Director, Price, PGRating, Rating, Duration, and Image Address
CREATE PROCEDURE get_movie (
	IN movie_id char(9))
movie_info:BEGIN
	
    SELECT Title, movieYear, Genre, Director, Price, PGRating, Rating, Duration, ImageAddress
    FROM Movie
    WHERE MovieID = movie_id;

END //


-- Procedure to insert a request
-- Inputs: Movie ID, Customer ID, Store ID, @Variable to hold message
-- Ouputs: Message: 'Success' or the condition that was not met
CREATE PROCEDURE insert_request (
	IN movie_id char(9), 
    IN customer_id INT, 
    IN store_id INT, 
    OUT status_message char(100))
request_insert: BEGIN 
    DECLARE request_status char(8);
    DECLARE place_line INT;
    DECLARE balance FLOAT;
    
    SET status_message = 'Success';
    
    IF NOT EXISTS (SELECT * FROM Customer WHERE cID = customer_id) THEN 
		SET status_message = 'Customer not logged in or incorrect customer ID';
        LEAVE request_insert;
	ELSEIF NOT EXISTS (SELECT * FROM Movie WHERE MovieID = movie_id) THEN 
		SET status_message = 'Incorrect movie ID';
        LEAVE request_insert;
	ELSEIF NOT EXISTS (SELECT * FROM InStock WHERE MovieID = movie_id AND StoreID = store_id) THEN 
		SET status_message = 'Movie not offered at this location';
        LEAVE request_insert;
    END IF;
    
    
    IF NOT EXISTS (SELECT Place FROM Request WHERE MovieID = movie_id AND StoreID = store_id) THEN 
		SET place_line = 1;
        SET request_status = 'Ready';
	ELSE 
		SET place_line = (SELECT MAX(Place) FROM Request WHERE MovieID = movie_id AND StoreID = store_id) + 1;
        SET request_status = 'Waiting';
	END IF;
    
    -- Saying the movie Costs Original Price / 5 to rent (can be changed)
    SET balance = (SELECT TRUNCATE((SELECT Price FROM Movie WHERE MovieID = movie_id) / 5, 2));
    
    INSERT INTO Request(MovieID, UserID, StoreID, Place, reqStatus, Balance)
    VALUES (movie_id, customer_id, store_id, place_line, request_status, balance);


END //


-- Procedure to delete a request for a movie
-- Inputs: Movie ID, Customer ID, Store ID, @Variable for the status message
-- Outputs: Message: 'Success' or condition not met
CREATE PROCEDURE delete_request (
	IN movie_id char(9),
    IN customer_id INT,
    IN store_id INT,
    OUT status_message char(100))
delete_req:BEGIN
	DECLARE place_line INT;
    DECLARE balance FLOAT DEFAULT 0.0;
    DECLARE done INT DEFAULT 0;
    DECLARE other_customer_id INT;
    DECLARE other_place INT;

    DECLARE request_cursor CURSOR FOR 
		SELECT UserID FROM Request
        WHERE MovieID = movie_id
        AND UserID != customer_id
        AND StoreID = store_id
        AND Place > (SELECT Place FROM Request WHERE MovieId = movie_id AND UserID = customer_id AND StoreID = store_id);
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    SET status_message = 'Success';
    
    IF NOT EXISTS (SELECT * FROM Requests WHERE MovieId = movie_id AND UserID = customer_id AND StoreID = store_id) THEN 
		SET status_message = 'Request does not exist';
        LEAVE delete_req;
	END IF;
    
    OPEN request_cursor;
	request_loop: LOOP 
		FETCH request_cursor INTO other_customer_id;
		IF done THEN
			LEAVE request_loop;
		END IF;
        
        -- Updating all of the other requests for the same movie 
        SET other_place = (SELECT Place From Request WHERE MovieId = movie_id AND UserID = other_customer_id AND StoreID = store_id) - 1;
	
        UPDATE Request
        SET Place = other_place
        WHERE MovieId = movie_id AND UserID = other_customer_id AND StoreID = store_id;
    
	END LOOP request_loop;
    CLOSE request_cursor;
    
    DELETE FROM Request 
    WHERE MovieId = movie_id AND UserID = customer_id AND StoreID = store_id;

END //

-- Procedure to return rented movies of a user
-- Input: user_id 
-- Ouput: Title, MovieID, Place, reqStatus, DueDate, ReqTime, balance (fees)
CREATE PROCEDURE get_rentals (
	IN custID int)
rent_info:BEGIN
	
    SELECT  M.Title, R.MovieID, R.Place, R.reqStatus, R.DueDate, R.ReqTime, R.Balance
    FROM Request R
    JOIN Movie M ON R.MovieID = M.MovieID
    WHERE cID = custID;
END //

-- Procedure to return profile of the user
-- Inputs: userID
-- Outputs: username, address, birthday, email
CREATE PROCEDURE get_user (
	IN custID int)
user_info:BEGIN
	
    SELECT username, address, Bday, Email
    FROM Costomer
    WHERE cID = custID;

END //

-- Procedure to verify user-input email against stored email 
-- Inputs: email (user-input)
-- Outputs: Message: 'Success' or the condition that was not met
CREATE PROCEDURE verifyEmail (
	IN u_email varchar(20),
	OUT status_message char(100))
email_check:BEGIN
    IF EXISTS (SELECT Email FROM Customer WHERE Email = u_email) THEN
        SET status_message = 'Success.';
    ELSE
        SET status_message = 'Email not found.';
    END IF;
END //

-- Procedure to verify user-input password against stored password
-- Input: user input password
-- output: message on whether password matches. 
CREATE PROCEDURE verifyPassword(
	IN u_password varchar(20),
	OUT status_message char(100))
password_check:BEGIN
    IF EXISTS (SELECT userpswd FROM Customer WHERE userpswd = u_password) THEN
        SET status_message = 'Success!';
    ELSE
        SET status_message = 'Incorrect Password. Try again.';
    END IF;
END //

DELIMITER ;
