
import {useState} from "react"
import axios from "axios"
import "./Login.css"

const Login = () => {
	var fails = 0;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Login, 2: OTP
    const [error, setError] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError('');
  
      try {
        // Replace with your actual API endpoint
	const username = email;
	const response = await axios.post('http://localhost:3000/login', { username, password });
	console.log(response)
        if (response.data=='Success') {
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
        const response = await axios.post('http://localhost:3000/otp', { email, otp });
        if (response.data.success) {
          alert('Logged in successfully!');
          // Redirect to dashboard or main app
        } else {
          setError('Invalid OTP');
		if (fails >= 3){
			alert('Too many invalid attempts. Redirecting to login page');
			setStep(1);
		} else {
			fail+=1;
		}
        }
      } catch (err) {
        setError('Verification failed');
        // setError(err);
      }
    };
  
    return (
      <div>
        <h2>{step === 1 ? 'Login' : 'Verify OTP'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {step === 1 ? (
          <form onSubmit={handleLogin}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
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
              <label>OTP:</label>
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
