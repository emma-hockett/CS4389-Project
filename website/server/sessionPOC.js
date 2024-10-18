//proof of concept for express-session for login
const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

// Body parsing middleware (for form submissions)
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.json()); // For parsing application/json

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

// Route to serve the login page
app.get('/login', (req, res) => {
    res.send('<form method="POST"><input type="text" name="username" placeholder="Username" required><input type="password" name="password" placeholder="Password" required><button type="submit">Login</button></form>');
});

// Route to handle login POST request
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'user' && password === 'password') {
        req.session.username = username;
        req.session.lastActivity = Date.now();
        res.redirect('/dashboard');
    } else {
        res.send('Invalid login credentials');
    }
});

// Protected dashboard route
app.get('/dashboard', checkSession, (req, res) => {
    res.send(`Welcome to your dashboard, ${req.session.username}!`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});