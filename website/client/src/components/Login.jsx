
import {useState} from "react"
import axios from "axios"
import "./Login.css"
import { useNavigate } from 'react-router-dom'
import logo from "./Cubebuster-Logo-1996.png"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Login, 2: OTP
    const [error, setError] = useState('');

	function readCookie(name) {
		var nameEQ = name + "=";
		var cookie = document.cookie.split(';');
		for(var i = 0; i < cookie.length; i++){
			var c = cookie[i];
			while (c.charAt(0) == ' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null
	}
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError('');
  
      try {
        // Replace with your actual API endpoint
	const username = email;
	const response = await axios.post('http://localhost:3000/login', { username, password });
	console.log(response)
        if (response.data.success) {
		document.cookie = `cubeBusterSession=${response.data.cookie}`
	  alert('Login successful. Please complete 2FA procedures.');
		setStep(2);
        } else {
          setError('Invalid credentials');
        }
      } catch (err) {
	      if (err.response) {
		      console.log('Error response:', err.response);
	      } else if (error.request) {
		      console.log('Error request:', err.request);
	      }
	      console.log('Error message:', err.message);
	      
	      console.log(err)
	      setError(err)
      }
    };
  
    const handleOtpSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      try {
        // Replace with your actual API endpoint
	      console.log('otp starts')
	      const cookie = readCookie('cubeBusterSession');
        const response = await axios.post('http://localhost:3000/verify', { otp, cookie });
        if (response.data == 'Success') {
          alert('Logged in successfully!');
          // Redirect to dashboard or main app
	  location.href = '/home'
        } else {
          setError('Invalid OTP');
        }
      } catch (err) {
        setError('Verification failed');
        // setError(err);
      }
    };
        return (
        <div className="container">
          <img src={logo}></img>
          <h2>{step === 1 ? '' : 'Enter Authentication Code'}</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {step === 1 ? (
            <form onSubmit={handleLogin}>
              <div>
                <label className="log-label">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="log-label" >Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Login</button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <div>
                <label className="log-label">OTP Code was sent to your email</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Verify OTP</button>
            </form>
          )}
        </div>
      );
    };
  
  
  

  export default Login
