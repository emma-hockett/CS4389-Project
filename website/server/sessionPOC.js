//proof of concept for express-session for login
const express = require('express');
const session = require('express-session');
const http = require('http');
const app = express();
const port = 3000;
var cors=require('cors');


app.use((req, res, next) => {
	console.log('setting headers');
	res.setHeader('Access-Control-Allow-Origin','http://localhost:5000');
	next();
});
app.use(cors())

// Body parsing middleware (for form submissions)
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.json()); // For parsing application/json
/*
// Setup session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 } // 30 minutes
}));

// Middleware to check session activity
const checkSession = (req, res, next) => {
    const now = Date.now();
    const sessionTime = req.session.lastActivity;

    if (sessionTime && (now - sessionTime < 30 * 60 * 1000)) {
        req.session.lastActivity = now;
        next();
    } else {
        res.redirect('/login');
    }
};
*/

// Example route: Get data from the server
app.get('/', (req, res) => {
    res.status(200).send({message: "welcome!"})
})


// // Wildcard route to serve React frontend for unknown paths
// app.use('*', (req, res) => {
//   res.sendFile(__dirname + '/client/build/index.html'); // Ensure React is built
// });

// Route to serve the login page
app.get('/login', (req, res) => {
    res.send('<form method="POST"><input type="text" name="username" placeholder="Username" required><input type="password" name="password" placeholder="Password" required><button type="submit">Login</button></form>');
});

// Route to handle login POST request
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'user@user' && password === 'password') {
	res.send("Success");
    } else {
        res.send('Invalid login credentials\n');
    }
});

/*// Protected dashboard route
app.get('/dashboard', checkSession, (req, res) => {
    res.send(`Welcome to your dashboard, ${req.session.username}!`);
});
*/
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
