import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import skey from './appy.json';

const LoginPage = () => {
  const [URL, setURL] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
    const key =skey.key; // Your desired secret key

    
    const hashedPassword = await bcrypt.hash(password, key);
    console.log(hashedPassword)
      const payload = {
        username: username,
        password: hashedPassword,
      };
  
      const response = await fetch('https://cataloggeneratorv1.azurewebsites.net/api/Authenticator', {
        method: 'POST', // Set the method to 'POST'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log('success');
        setURL(data.powerbi_link);
        console.log(URL)
      } else {
        console.error('Error occurred during login:', response.status);
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button >Login</button>
      </form>
    <div >
    <iframe src={URL} title="Power BI Dashboard"></iframe>

    </div>
    </div>
    
  );
};

export default LoginPage;
