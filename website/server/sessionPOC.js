//proof of concept for express-session for login
import express from 'express'
import session from 'express-session'
import http from 'http'
import mysql from 'mysql2/promise'
import sha256 from 'js-sha256'
import emailjs from 'emailjs-com'
import cors from 'cors'
import dotenv from "dotenv"
import nodemailer from "nodemailer"
dotenv.config();
import rateLimit from 'express-rate-limit'


const app = express();
const port = 3001;



const transporter = nodemailer.createTransport({
	service: 'Gmail', // or another email service provider
	auth: {
	  user: 'cube3148@gmail.com', // replace with your email
	  pass: 'ayq6dY*?'  // replace with your email password
	}
  });

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use(apiLimiter);
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin','*');
	next();
});
app.use(cors())

// Body parsing middleware (for form submissions)
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.json()); // For parsing application/json



// // Example route: Get data from the server
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



async function sendEmail(to, subject, text) {
	const mailOptions = {
	  from: 'cube3148@gmail.com',    // sender address
	  to,                              // list of receivers
	  subject,                         // Subject line
	  text                             // plain text body
	};
  
	try {
	  let info = await transporter.sendMail(mailOptions);
	  console.log('Email sent:', info.response);
	} catch (error) {
	  console.error('Error sending email:', error);
	}
  }

// Route to handle login POST request
app.post('/login', async function (req, res) {
	try{
    const connection = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    password: '',
	    database: 'cubebuster'
    })
	
	var conn = await connection;
    const { username, password } = req.body;
		var hash = sha256.create();
		hash.update(password);
		var newPassword = hash.hex();
		console.log("Hashed Password: " + newPassword);
	var [[[valid, employee], extra], fields] = await conn.query(`CALL verifyLogin("${username}", "${newPassword}");`)

    if (valid) {
		console.log('Successful login attempt. Sending OTP code');
	    var currentDate = new Date()
	    const arr = new Uint32Array(64)
	    const otp = Math.random().toString(36).substring(2,6)
	    const newCookie = crypto.getRandomValues(arr).toString(36).substring(0,30)
	    if (employee) {
		    var [[[id], extra], fields] = await conn.query(`CALL get_user("${username}");`)
		    console.log(id.cID)
		    await conn.query(`INSERT INTO SessionTokens (TokenID, lastAccess, employeeID, employeeAccess, complete2FA, IncorrectAttempts, otp) VALUES ("${newCookie}", NOW(), ${id.cID}, true, false, 0, '${otp}')`)
	    } else {
		    var [[[id], extra], fields] = await conn.query(`CALL get_user("${username}");`)
		    console.log(id.cID)
		    await conn.query(`INSERT INTO SessionTokens (TokenID, lastAccess, userID, employeeAccess, complete2FA, IncorrectAttempts, otp) VALUES ("${newCookie}", NOW(), ${id.cID}, false, false, 0, '${otp}')`)
	    }
	
		sendEmail(username, 'Your Cubebuster 2FA Code', `Your temporary OTP code is ${otp} `);
		
		console.log('session token:', newCookie)
	    console.log('otp=',otp)
	res.send({success: true, cookie: newCookie});
    } else {
	    console.log('unsuccessful login attempt.');
        res.send('Invalid login credentials\n');
    }
	} catch (e) {
		console.log('error');
		res.end(e.message || e.toString());
	}
});

app.post('/verify', async function (req, res) {
	try{
		const connection = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'cubebuster'
		})
		var conn = await connection;
		var [data,others] = await conn.query(`SELECT otp, incorrectAttempts FROM SessionTokens WHERE TokenID='${req.body.cookie}'`)
		console.log(data[0])
		if (data[0].incorrectAttempts > 3){
			res.send('Invalid login credentials')
		}
		if (req.body.otp == data[0].otp) {
			await conn.query(`UPDATE SessionTokens SET complete2FA=true, lastAccess=NOW() WHERE TokenID='${req.body.cookie}'`)
			res.send('Success');
		} else {
			await conn.query(`UPDATE SessionTokens SET incorrectAttempts=${data[0].incorrectAttempts+1}, lastAccess=NOW() WHERE TokenID='${req.body.cookie}'`)
			res.send('Invalid login credentials')
			
		}
	} catch (e) {
		console.log(e);
		res.end(e.message || e.toString());
	}
});


// Start the server
app.listen(port, () => {
    console.log(`Server running.`);
});
