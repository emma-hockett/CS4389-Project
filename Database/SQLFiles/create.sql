DROP DATABASE IF EXISTS cubebuster;
CREATE DATABASE cubebuster;
USE cubebuster;

CREATE TABLE Movie (
        MovieID int NOT NULL AUTO_INCREMENT,
        Title varchar(40) NOT NULL,
        movieYear int NOT NULL,
        Genre varchar(15) NOT NULL,
        Director varchar(20) NOT NULL,
        Price Decimal(3,2) NOT NULL,
        Rating varchar(5) NOT NULL,
        Duration int NOT NULL,
        PRIMARY KEY(MovieID)
);

CREATE TABLE Employee (
        EmployeeID int NOT NULL AUTO_INCREMENT,
        empName varchar(20) NOT NULL,
        Address varchar(30) NOT NULL,
        SSN char(9) NOT NULL UNIQUE,
        Email varchar(25) NOT NULL UNIQUE, 
        Phone char(10) NOT NULL,
        empPassword varchar(20) NOT NULL,
        PRIMARY KEY(EmployeeID)
);


CREATE TABLE Customer (
        cID int NOT NULL AUTO_INCREMENT,
        username varchar (20) NOT NULL,
        Address varchar(30),
        CCNum char(16),
        Bday date NOT NULL,
        Email varchar(25) NOT NULL UNIQUE,
        userpswd varchar(20) NOT NULL,
		PRIMARY KEY(cID)
);

CREATE TABLE Store (
        StoreID int NOT NULL AUTO_INCREMENT,
        BuildingNum int NOT NULL,
        Street varchar(20) NOT NULL,
        City varchar(20) NOT NULL,
        Zipcode int NOT NULL, 
        State varchar(20) NOT NULL, 
		PRIMARY KEY(StoreID)
);

CREATE TABLE Request (
        MovieID int NOT NULL,
        UserID int NOT NULL,
        StoreID int NOT NULL,
        Place int NOT NULL,
        reqStatus char(8) NOT NULL,
        DueDate date, 
        Balance float NOT NULL,
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
        MovieID int NOT NULL,
        StoreID int NOT NULL,
        IsAvailable bool NOT NULL,
        Quantity int NOT NULL,
        PRIMARY KEY (MovieID, StoreID),
        FOREIGN KEY (MovieID) REFERENCES Movie(MovieID),
        FOREIGN KEY (StoreID) REFERENCES Store(StoreID)
);