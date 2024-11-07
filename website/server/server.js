import express from 'express'
import fs from 'fs'
import path from 'path'
// import mysql from 'mysql2'
// import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

// Enable CORS for all routes


const app = express();
app.use(cors());

// dotenv.config();

const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// const logFilePath = path.join(__dirname, 'server.log');

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use('/api', apiLimiter);

app.use(cors({
  origin: 'https://localhost:5173',  // Replace with your React app's URL
}));
// Middleware to parse incoming JSON requests
app.use(express.json());


// Example route: Get data from the server
app.get('/', () => {
    console.log("Home page accessed.")
});

app.get('/searchmovies', () => {
  console.log("Movies page accessed.")
});

app.get('/rentals', () => {
  console.log("Personal movie rentals page accessed.")
});

app.get('/login', () => {
  console.log("Login page accessed.")
});

app.get('/profile', () => {
  console.log("Profile page accessed.")
});


// Configure MySQL connection

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err.message);
//   } else {
//     console.log('Connected to MySQL database.');
//   }
// });

// // API route example to get data
// app.get('/api/data', (req, res) => {
//   db.query('SELECT * FROM your_table_name', (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(results);
//   });
// });


app.post('/submit', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Use stored procedure to insert data securely
    const result = await dbClient.query(
      'CALL insert_user($1, $2, $3)', // Assume `insert_user` is a stored procedure
      [username, email, password]
    );
    res.status(200).json({ success: true, message: 'User inserted successfully!' });
  } catch (err) {
    console.error('Error executing stored procedure', err);
    res.status(500).json({ success: false, message: 'Error inserting user' });
  }
});



const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running.`);
});
// app.listen(PORT);