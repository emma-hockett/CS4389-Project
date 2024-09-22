### CS4389-Project
CS 4389 : Data and Application Security Project Repository

## SETTING UP THE DATABASE 
1. Install MySQL
2. Upload create.sql and run it via the lightning bolt on the right of the save button
 ![image](https://github.com/user-attachments/assets/2959d91f-603f-4b0d-b093-42dfbf633144)

4. Make sure you have the csv files
5. Open load.sql on MySQL
6. Copy the path of the csv files and paste them
7. For all entries with **LOAD DATA LOCAL INFILE,** 
8. Copy the path of the csv files and paste the path next to **LOAD DATA LOCAL INFILE**
![image](https://github.com/user-attachments/assets/60512cdf-220d-440a-b3c3-0cca3787dea4)

9. **Disclaimer:** You may have to change your backslashes to forward slashes for MySQL to not throw a fit + make sure your path uses single quotes instead of double quotes
10. Repeat this step for each csv file
