-- Reminder: Ensure you are connected to the correct database.

-- Here's the psql command:
-- psql -U your_username -d your_database_name -f path_to_init.sql
-- Example:
-- psql -U postgres -d spotify -f C:/Users/sprin/OneDrive/Documents/GitHub/CodeBuster/Database/SQLFiles/init.sql

-- Initialize PostgreSQL with create.sql file
\i 'C:/Users/sprin/OneDrive/Documents/GitHub/CodeBuster/Database/SQLFiles/create.sql';

-- Load data into the initialized tables with load.sql file
\i 'C:/Users/sprin/OneDrive/Documents/GitHub/CodeBuster/Database/SQLFiles/load.sql';
