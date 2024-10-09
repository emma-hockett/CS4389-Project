DROP DATABASE IF EXISTS cubebuster;
CREATE DATABASE cubebuster;

CREATE TABLE Movie (
        MovieID serial PRIMARY KEY,
        Title varchar(40) NOT NULL,
        movieYear int NOT NULL,
        Genre varchar(15) NOT NULL,
        Director varchar(20) NOT NULL,
        Price Decimal(3,2) NOT NULL,
        Rating varchar(5) NOT NULL,
        Duration int NOT NULL
);

CREATE TABLE Employee (
        EmployeeID serial PRIMARY KEY,
        empName varchar(20) NOT NULL,
        Address varchar(30) NOT NULL,
        SSN char(9) NOT NULL UNIQUE,
        Email varchar(25) NOT NULL UNIQUE, 
        Phone char(10) NOT NULL,
        empPassword varchar(20) NOT NULL
);


CREATE TABLE Customer (
        cID serial PRIMARY KEY,
        username varchar (20) NOT NULL,
        Address varchar(30),
        CCNum char(16),
        Bday date NOT NULL,
        Email varchar(25) NOT NULL UNIQUE,
        userpswd varchar(20) NOT NULL
);

CREATE TABLE Store (
        StoreID serial PRIMARY KEY,
        BuildingNum int NOT NULL,
        Street varchar(20) NOT NULL,
        City varchar(20) NOT NULL,
        Zipcode int NOT NULL, 
        State varchar(2) NOT NULL
);

CREATE TABLE Request (
        MovieID int NOT NULL,
        UserID int NOT NULL,
        StoreID int NOT NULL,
        Place int NOT NULL,
        reqStatus char(8) NOT NULL,
        DueDate date, 
        Balance numeric(6,2) NOT NULL,
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
        IsAvailable boolean NOT NULL,
        Quantity int NOT NULL,
        PRIMARY KEY (MovieID, StoreID),
        FOREIGN KEY (MovieID) REFERENCES Movie(MovieID),
        FOREIGN KEY (StoreID) REFERENCES Store(StoreID)
);
