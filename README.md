# CS4389-Project

CS 4389 : Data and Applicatio Security Project Repository

## Set up

- Replace the .msmtprc file located in /website/server/ with your own .msmtprc file. This contains an API key that cannot be published to GitHub.

- Start a Docker Daemon. If you do not already have it installed, the program can be found here: https://docs.docker.com/engine/install/

- Run the following command in the project directory:
>Docker compose up --build

### Access points

- The client-side app will be accessible at localhost:5000
- The server will be accessible at localhost:3000
- A viewing method for the database can be seen at localhost:8001
	- username: root
	- password: password
	- The database will be the CubeBuster tab in the side bar.
	- this representation was created using the phpMyAdmin official image.
	- This service would not be avilable in a real-world application of the site. It serves to simplify debugging and ease of the grader.
- In addition, this table can be used to edit table data.
	- Please change the email address for existing entries here. 2FA will send to the address dictated by that table entry.

### Important Info

- There are only 2 users in the customer database.
	- The user johnSmith has the email khlkeeton@gmail.com. His password is 'password'.
	- The user janeDoe has the email kylekeeton04@gmail.com. Her password is 'better password'.
	- New users can be added in the phpMyAdmin site (located at localhost:8001).
	- NOTE: 2FA means a new user has to be added to test the program.
	- NOTE: The database uses sha256 hashing to store passwords. Therefore, any password must be encrypted with this style.

- There is only 1 employee in the datbase
	- The user, johnDoe has the email address kylekeeton2004@gmail.com. His password is password.
	- New users can be added in the phpMyAdmin site (located at localhost:8001).
	- NOTE: 2FA means a new user has to be added to test the program.
	- NOTE: The database uses sha256 hashing to store passwords. Therefore, any password must be encrypted with this style.
