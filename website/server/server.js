import express from 'express'
// import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'; // Import dotenv
dotenv.config(); // needed for the USER and PASS of sender email
import nodemailer from 'nodemailer';  //npm list nodemailer to check if its there, npm install nodemailer to install
import cors from 'cors' // it seems this will allow for emails to send
import crypto from 'crypto'


const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// Middleware to parse incoming JSON requests
app.use(express.json());

// Example route: Get data from the server
app.get('/', (req, res) => {
    res.status(200).send({message: "welcome!"})
})

//////////////////////////////////////////////////
// attempting some verification email nonsense ///
//////////////////////////////////////////////////

// Note: it does not keep info between server "runs" because it doesn't use a database. to test, first enter email check if verified, then send, then check again. if you can't send emails through the email I set up lmk.

app.use(express.json()); // Parse JSON bodies

// Create a transporter object using your email service
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, //needs to be replaced by some email put into place.
        pass: process.env.EMAIL_PASS,
    },
});

// this is a small function to store the verification tokens, in the future we need to put this into the database
let verificationTokens = {};
let verifiedEmails = {}; // tracking emails that are verified. also needs to be replaced by database



app.post('/api/send-email', (req, res) => {
  const { email } = req.body; // handles incoming requests to send emails

  const verificationToken = crypto.randomBytes(32).toString('hex'); // our token
  verificationTokens[verificationToken] = email; //storing the token
  // generating the link
  const verificationLink = `http://localhost:3001/api/verify-email?token=${verificationToken}`;


  const mailOptions = {
      from: process.env.EMAIL_USER, // Sender, should match the transporter info ?
      to: email, // recipient that is same as the email given from the bar in the sign-in page
      subject: 'Verification Link', 
      text: `Please verify your email by clicking the following link: ${verificationLink}`,
      html: `<p>Please verify your email by clicking the following link:</p>
             <a href="${verificationLink}">Verify Email</a>`, 
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.error('Error sending email:', error); // Log detailed error
        return res.status(500).send('Failed to send email. Error: ' + error.message); // Send error message back to client
    } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).send('Email sent successfully');
    }
  });
});

// email verify link was opened
app.get('/api/verify-email', (req, res) => {
  const { token } = req.query;

  // check token
  if (verificationTokens[token]) {
      const email = verificationTokens[token]; // email associated with token
      verifiedEmails[email] = true; //mark email as verified

      // remove token after verification
      delete verificationTokens[token];

      console.log(`Email verified: ${email}`);
      return res.send(`Email verification successful for: ${email}`);
  } else {
      return res.status(400).send('Invalid or expired token');
  }
});


// for the check verification button
app.get('/api/check-verification', (req, res) => {
  const { email } = req.query; //find the fella

  if (verifiedEmails[email]) { //go through that little array we made
      return res.json({ isVerified: true });
  } else {
      return res.json({ isVerified: false });
  }
});


//////////////////////////////////////////////////
// end of email verifcation code /////////////////
//////////////////////////////////////////////////


// // Wildcard route to serve React frontend for unknown paths
// app.use('*', (req, res) => {
//   res.sendFile(__dirname + '/client/build/index.html'); // Ensure React is built
// });

const PORT = process.env.PORT || 3001

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
