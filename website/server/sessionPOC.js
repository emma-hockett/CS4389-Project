//proof of concept for express-session for login
const express = require('express');
const session = require('express-session');
const http = require('http');
const mysql = require('mysql2/promise')
const sha256 = require('js-sha256');
const app = express();
const port = 3000;
var cors=require('cors');


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin','*');
	next();
});
app.use(cors())

// Body parsing middleware (for form submissions)
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.json()); // For parsing application/json

// Route to handle login POST request
app.post('/login', async function (req, res) {
	try{
    const connection = mysql.createConnection({
	    host: 'database',
	    user: 'server',
	    password: 'password123456789',
	    database: 'CubeBuster'
    })
		conn = await connection;
    const { username, password } = req.body;
		var hash = sha256.create();
		hash.update(password);
		var newPassword = hash.hex();
	var [[data,oof], stuff] = await conn.query(`CALL verifyLogin("${username}", "${newPassword}");`)
		const valid = data[0]['@Success']
		const employee = data[0]['@Employee']

    if (valid) {
	    console.log('successful login attempt. Sending OTP code');
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




		console.log('session token:',newCookie)
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
			host: 'database',
			user: 'server',
			password: 'password123456789',
			database: 'CubeBuster'
		})
		conn = await connection;
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
    console.log(`Server running on http://localhost:${port}`);
});
