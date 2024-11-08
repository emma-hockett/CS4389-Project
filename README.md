# CS4389-Project
CS 4389 : Data and Application Security Project Repository

## SETTING UP THE DATABASE 
**Disclaimer:** You may have to change your backslashes to forward slashes for MySQL to not throw a fit + make sure your path uses single quotes instead of double quotes  
- You can install MySQL from here: https://dev.mysql.com/downloads/mysql/
-  Run with all default settings, make sure to uncheck the start database on computer startup, don't create new users, set the root password to "password"
- You can add the directory to your mysql installation bin folder to your PATH variable to be able to run these commands
- If you don't already have the database process running, start it by going to the project directory with the SQL files, and enter the commands into the cmd prompt  
   >mysql -u root -p --local-infile=1  
   >SET GLOBAL local_infile = 1;
   
- Once in, you will have to use SOURCE to load the sql files, I have created an INIT file which will load them all for you, but you have to change the directories in the file yourself.  
    Type this into the cmd line:
    >SOURCE ./Your Directory Here/INIT.SQL;  
    The DB is now ready for local editing!


### Additional Details 
- If you'd like to see tables in MySQL, make a new sql file and type the following, replacing 'Tablename' with the desired table name:  
    >USE cubebuster;  
    >SELECT * FROM Tablename;
- You can stop the database by typing this into cmd line  
    >quit

## RUNNING THE WEBSITE
Download Node from this <a href="https://nodejs.org/en"> website </a> and add it to your system's PATH environment variable.

1. Open one terminal and perform the sequence of commands:
```
cd website
cd server
npm install
npm start
```

2.  Open a second terminal and perform the sequence of commands:
```
cd website
cd client
npm install
npm run build
npm run dev
```

3. Copy and paste the local host link given in your browser to view the website.
