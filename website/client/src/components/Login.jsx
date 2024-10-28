
import {useState} from "react"
import axios from "axios"
import "./Login.css"

const Login = () => {
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
        const response = await axios.post('/api/auth/login', { email, password });
        if (response.data.success) {
          setStep(2); // Move to OTP step
        } else {
          setError('Invalid credentials');
        }
      } catch (err) {
        setError(err);
        // setError('Login failed!');
      }
    };
  
    const handleOtpSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      try {
        // Replace with your actual API endpoint
        const response = await axios.post('/api/auth/verify-otp', { email, otp });
        if (response.data.success) {
          alert('Logged in successfully!');
          // Redirect to dashboard or main app
        } else {
          setError('Invalid OTP');
        }
      } catch (err) {
        // setError('Verification failed');
        setError(err);
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