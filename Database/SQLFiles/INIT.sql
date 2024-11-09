USE CubeBuster;

CREATE TABLE Movie (
        MovieID char(9) NOT NULL,
        Title varchar(60) NOT NULL,
        movieYear int NOT NULL,
        Genre varchar(15) NOT NULL,
        Director varchar(40) NOT NULL,
        Price Decimal(5,2) NOT NULL,
        PGRating varchar(5) NOT NULL,
        Rating Decimal(2,1),
        Duration int NOT NULL,
        ImageAddress varchar(40),
        PRIMARY KEY(MovieID)
);

CREATE TABLE Employee (
        EmployeeID int NOT NULL AUTO_INCREMENT,
        empName varchar(20) NOT NULL,
        Address varchar(30) NOT NULL,
        SSN char(9) NOT NULL UNIQUE,
        Email varchar(25) NOT NULL UNIQUE, 
        Phone char(10) NOT NULL,
        empPassword varchar(64) NOT NULL,
        PRIMARY KEY(EmployeeID)
);


CREATE TABLE Customer (
        cID int NOT NULL AUTO_INCREMENT,
        username varchar (20) NOT NULL,
        Address varchar(30),
        CCNum char(16),
        Bday date NOT NULL,
        Email varchar(25) NOT NULL UNIQUE,
        userpswd char(64) NOT NULL,
		PRIMARY KEY(cID)
);

CREATE TABLE Store (
        StoreID int NOT NULL AUTO_INCREMENT,
        BuildingNum int NOT NULL,
        Street varchar(20) NOT NULL,
        City varchar(20) NOT NULL,
        Zipcode int NOT NULL, 
        State varchar(2) NOT NULL, 
		PRIMARY KEY(StoreID)
);

CREATE TABLE Request (
        MovieID char(9) NOT NULL,
        UserID int NOT NULL,
        StoreID int NOT NULL,
        Place int NOT NULL,
        reqStatus char(8) NOT NULL,
        DueDate date, 
        Balance float NOT NULL,
        ReqTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (MovieID, UserID, StoreID),
        FOREIGN KEY (MovieID) REFERENCES Movie(MovieID),
        FOREIGN KEY (UserID) REFERENCES Customer(cID),
        FOREIGN KEY (StoreID) REFERENCES Store(StoreID)
);

CREATE TABLE WorksAt (
        StoreID int NOT NULL,
        EmployeeID int NOT NULL,
        PRIMARY KEY (StoreID, EmployeeID),
        FOREIGN KEY (StoreID) REFERENCES Store(StoreID),
        FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE InStock (
        MovieID char(9) NOT NULL,
        StoreID int NOT NULL,
        IsAvailable bool NOT NULL,
        Quantity int NOT NULL,
        PRIMARY KEY (MovieID, StoreID),
        FOREIGN KEY (MovieID) REFERENCES Movie(MovieID),
        FOREIGN KEY (StoreID) REFERENCES Store(StoreID)
);


CREATE TABLE SessionTokens (
	TokenID char(30) NOT NULL,
	lastAccess datetime,
	userID int,
	employeeID int,
	employeeAccess boolean,
	PRIMARY KEY (TokenID),
	FOREIGN KEY (userID) REFERENCES Customer(cID),
	FOREIGN KEY (employeeID) REFERENCES Customer(cID)
);

INSERT INTO Customer (username, Address, CCNum, Bday, Email, userpswd)
VALUES
('johnSmith', '1240 Arroyo Vista', '1234567890987654','1995-10-13', 'khlkeeton@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'),
('janeDoe', '1600 Pennsylvania Ave', '9876543210123456', '1953-4-13', 'kylekeeton04@gmail.com', '76c974bbd9a8e3a8b838feec55c7b08b41a1c80e9495f18f66dbb24eb42ff753');

INSERT INTO Employee (empName, Address, SSN, Email, empPassword,phone)
VALUES
('johnDoe', '1240 Arroyo Vista', '123456789','kylekeeton2004@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8','1234567890');

INSERT INTO Movie (MovieID, Title, movieYear, Genre, Director, Price, PGRating, Rating, Duration, ImageAddress)
VALUES
('tt0111161', 'The Shawshank Redemption', 1994, 'drama', 'Frank Darabont', 14.99, 'R', 9.3, 142, 'https://tinyurl.com/2p9jtrpp'),
('tt0068646', 'The Godfather', 1972, 'crime', 'Francis Ford Coppola', 16.99, 'R', 9.2, 175, 'https://tinyurl.com/3yypb7c4'),
('tt0468569', 'The Dark Knight', 2008, 'action', 'Christopher Nolan', 13.99, 'PG-13', 9.0, 152, 'https://tinyurl.com/2ea8bb6h'),
('tt0137523', 'Fight Club', 1999, 'drama', 'David Fincher', 12.99, 'R', 8.8, 139, 'https://tinyurl.com/yt7u37wf'),
('tt0109830', 'Forrest Gump', 1994, 'comedy', 'Robert Zemeckis', 11.99, 'PG-13', 8.8, 142, 'https://tinyurl.com/5n6vffzy'),
('tt0120737', 'The Lord of the Rings: The Fellowship of the Ring', 2001, 'fantasy', 'Peter Jackson', 15.99, 'PG-13', 8.8, 178, 'https://tinyurl.com/5ha7s4fu'),
('tt0080684', 'Star Wars: Episode V - The Empire Strikes Back', 1980, 'sci-fi', 'Irvin Kershner', 14.49, 'PG', 8.7, 124, 'https://tinyurl.com/3cbw72dj'),
('tt1853728', 'Django Unchained', 2012, 'western', 'Quentin Tarantino', 13.49, 'R', 8.4, 165, 'https://tinyurl.com/mvwym52h'),
('tt0167260', 'The Lord of the Rings: The Return of the King', 2003, 'fantasy', 'Peter Jackson', 15.49, 'PG-13', 9.0, 201, 'https://tinyurl.com/mwczhtra'),
('tt7286456', 'Joker', 2019, 'crime', 'Todd Phillips', 17.99, 'R', 8.4, 122, 'https://tinyurl.com/54rv6ade'),
('tt1375666', 'Inception', 2010, 'sci-fi', 'Christopher Nolan', 14.99, 'PG-13', 8.8, 148, 'https://tinyurl.com/yc37m33j'),
('tt0133093', 'The Matrix', 1999, 'sci-fi', 'Lana Wachowski, Lilly Wachowski', 12.49, 'R', 8.7, 136, 'https://tinyurl.com/5fcytauw'),
('tt0816692', 'Interstellar', 2014, 'sci-fi', 'Christopher Nolan', 15.99, 'PG-13', 8.6, 169, 'https://tinyurl.com/233573db'),
('tt3783958', 'La La Land', 2016, 'comedy', 'Damian Chazelle', 10.99, 'PG-13', 8.0, 128, 'https://tinyurl.com/a3b7kj5v'),
('tt0114369', 'Se7en', 1995, 'crime', 'David Fincher', 13.99, 'R', 8.6, 127, 'https://tinyurl.com/ybn6zwxb'),
('tt0110413', 'Léon: The Professional', 1994, 'romance', 'Luc Besson', 9.99, 'R', 8.5, 110, 'https://tinyurl.com/yk4yh76y'),
('tt0120586', 'American History X', 1998, 'action', 'Tony Kaye', 11.99, 'R', 8.5, 119, 'https://tinyurl.com/yj4r4xhd'),
('tt0088763', 'Back to the Future', 1985, 'adventure', 'Robert Zemeckis', 10.49, 'PG', 8.5, 116, 'https://tinyurl.com/3kt3a4vp');

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

CREATE PROCEDURE veirfyLogin(
	IN u_email varchar(20), u_pwd char(64),
	OUT status_message boolean, employee boolean)
verifyLogin:BEGIN
IF EXISTS (SELECT userpswd, Email FROM Customer WHERE Email = u_email and userpswd = u_pwd) THEN
	SET status_message = True;
        SET employee = False;
ELSE
	IF EXISTS (SELECT Email, empPassword FROM Employee WHERE Email = u_email and empPassword = u_pwd) THEN
		SET status_message = True;
	       	SET employee=True;
	ELSE
		SET status_message = False;
		SET employee=False;
	End IF;
END IF;
END //

DELIMITER ;


DELIMITER $$
CREATE VIEW vw_available_movies AS
SELECT
    m.MovieID,
	m.Title,
    m.Genre,
    i.Quantity,
    s.StoreID,
    CONCAT(s.BuildingNum, ' ', s.Street, ', ', s.City, ', ', s.State, ' ', s.Zipcode) AS FullAddress,
    m.Price,
    m.Rating,
    m.Duration
FROM
    Store s
JOIN
    InStock i ON s.StoreID = i.StoreID
JOIN
    Movie m ON i.MovieID = m.MovieID
WHERE
    i.IsAvailable = 1 AND i.Quantity > 0
$$

DELIMITER ;

-- Purpose: Displays rental or purchase history for customers
DROP VIEW IF EXISTS vw_customer_rental_history;

DELIMITER $$
CREATE VIEW vw_customer_rental_history AS
SELECT
    c.cID AS CustomerID,
    c.username,
    m.MovieID,
    m.Title,
    r.reqStatus,
    r.StoreID,
    r.Place,
    r.DueDate,
    r.Balance,
    r.ReqTime
FROM
    Customer c
JOIN
    Request r ON c.cID = r.UserID
JOIN
    Movie m ON r.MovieID = m.MovieID
$$
DELIMITER ;

-- -- Purpose: Identifies overdue rentals for follow-up
DROP VIEW IF EXISTS vw_overdue_rentals;

DELIMITER $$
CREATE VIEW vw_overdue_rentals AS
SELECT
    r.MovieID,
    m.Title,
    r.UserID AS CustomerID,
    c.username,
    r.StoreID,
    r.DueDate,
    DATEDIFF(CURRENT_DATE, r.DueDate) AS DaysOverdue,
    r.Balance
FROM
    Request r
JOIN
    Movie m ON r.MovieID = m.MovieID
JOIN
    Customer c ON r.UserID = c.cID
WHERE
    r.reqStatus = 'Borrowed' AND r.DueDate < CURRENT_DATE;
$$
DELIMITER ;

-- -- Purpose: Shows the most requested movies
DROP VIEW IF EXISTS vw_popular_movies;

DELIMITER $$
CREATE VIEW vw_popular_movies AS
SELECT
    m.MovieID,
    m.Title,
    m.Genre,
    COUNT(r.MovieID) AS RequestCount
FROM
    Movie m
JOIN
    Request r ON m.MovieID = r.MovieID
GROUP BY
    m.MovieID, m.Title, m.Genre
ORDER BY
    RequestCount DESC;
$$
DELIMITER ;

-- -- Purpose: Displays contact information for customers
DROP VIEW IF EXISTS vw_customer_contacts;

DELIMITER $$
CREATE VIEW vw_customer_contacts AS
SELECT
    c.cID AS CustomerID,
    c.username,
    c.Email,
    c.Address
FROM
    Customer c;
$$
DELIMITER ;

-- -- Purpose: Provides employee contact information
DROP VIEW IF EXISTS vw_employee_contacts;

DELIMITER $$
CREATE VIEW vw_employee_contacts AS
SELECT
    e.EmployeeID,
    e.empName,
    e.Email,
    e.Phone
FROM
    Employee e;
$$
DELIMITER ;
