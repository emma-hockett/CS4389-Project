import express from 'express'
// import path from 'path'
import { fileURLToPath } from 'url'
const app = express();

const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// Middleware to parse incoming JSON requests
app.use(express.json());

// Example route: Get data from the server
app.get('/', (req, res) => {
    res.status(200).send({message: "welcome!"})
})


// // Wildcard route to serve React frontend for unknown paths
// app.use('*', (req, res) => {
//   res.sendFile(__dirname + '/client/build/index.html'); // Ensure React is built
// });

const PORT = process.env.PORT || 3001

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
