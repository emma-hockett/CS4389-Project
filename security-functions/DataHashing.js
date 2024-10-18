import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

const App = () => {
  const [password, setPassword] = useState('');
  const [hashedPassword, setHashedPassword] = useState('');
  const [isValid, setIsValid] = useState(null);

  const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashed = await bcrypt.hash(password, salt); // Hash the password
    return hashed;
  };

  const handleHash = async () => {
    const hashed = await hashPassword(password);
    setHashedPassword(hashed);
  };

  const verifyPassword = async (inputPassword) => {
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    setIsValid(match);
  };

  return (
    <div>
      <h1>Password Hashing Example</h1>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleHash}>Hash Password</button>
      <p>Hashed Password: {hashedPassword}</p>

      <input
        type="password"
        placeholder="Verify password"
        onChange={(e) => verifyPassword(e.target.value)}
      />
      {isValid !== null && (
        <p>{isValid ? 'Password is valid!' : 'Invalid password!'}</p>
      )}
    </div>
  );
};

export default App;