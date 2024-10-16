USE cubebuster;

-- Purpose: Shows available movies at each store
DROP VIEW IF EXISTS vw_available_movies;

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
