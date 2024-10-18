// src/components/SignIn.jsx

// not gonna lie, don't really know what I'm doing
//import React from 'react';
import React, { useState } from 'react';

// i don't know how to do the database stuff thats not my job

const SignIn = () => {

    // NOTE: Enter the email then click the button. Pressing the button results in effects unknown to man. 

    const [verificationStatus, setVerificationStatus] = useState(''); //live text thing I think

    // Function to be executed when the button is clicked
    const handleVerify = async () => {
        const emailInput = document.getElementById("email"); // Get the email input element
        const email = emailInput.value; // store value
        

        console.log("Send verify button clicked");

        try {
            const response = await fetch('http://localhost:3001/api/send-email', { // here lies the server reference
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }), // Send email in the request body
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.text();
            console.log(data); // log server response
            setVerificationStatus('Verification link sent to your email');
            emailInput.value = ''; // clear input after use

        } catch (error) {
            emailInput.value = ''; // clear input after use even if theres error
            console.error('Error sending email:', error);
        }
    };

    //the test button
    const handleTest = async () => {
        const emailInput = document.getElementById("email"); // Get the email input element
        const email = emailInput.value; // store value
        try {
            const response = await fetch(`http://localhost:3001/api/check-verification?email=${email}`); //backend time
            const result = await response.json();

            if (response.ok) {
                if(result.isVerified)
                {
                    setVerificationStatus('Your email is verified');
                }
                else
                {
                    setVerificationStatus('Your email is not verified');
                }
            } else {
                //verifiedText = "Reached response not ok" //might be useless
            }
            emailInput.value = ''; // clear input after use
        } catch (error) {
            emailInput.value = ''; // clear input after use even if theres error
            console.error('Error checking verification:', error);
        }
    };

    return (  //text on the site
        <div>
            <h1 style={{ marginBottom: '35px' }}>Sign In Page</h1> {/* Adds space below the header */}
            <form>
                
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                {/*
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div> 
                */}
                <div style={{ marginBottom: '10px' }}>
                    <button type="button" onClick={handleVerify}>Send Verify Link</button>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                    <button type="button" onClick={handleTest}>Is this email verified?</button>
                </div>
                
                <div>
                    <p>{verificationStatus}</p> {/* displays text when verified */}
                </div>
                
            </form>
        </div>
    );
};

export default SignIn