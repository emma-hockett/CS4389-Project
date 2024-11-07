# CS4389-Project
CS 4389 : Data and Applicatio Security Project Repository

#Set up

- Start a Docker Daemon. If you do not already have it installed, the program can be found here: https://docs.docker.com/engine/install/

- Run the following command in the project directory:
>Docker compose up --build

##Access points

- The client-side app will be accessible at localhost:5000
- The server will be accessible at localhost:3000
	- This would not be accessible in a real implementation. It is located here for the convenience of the grader. Used functions can be accessed through linux curl commands.
- A viewing method for the database can be seen at localhost:8001
	- username: root
	- password: my
	- The datbase will be the CubeBuster tab in the side bar.
	- this representation was created using the phpMyAdmin official image.

