import React, { useState } from 'react';
import { useNavigate } from 'react-router';
// import bcrypt from 'bcryptjs';
import './login.css'
import skey from '../../appy.json';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const key = skey.key; // Your desired secret key

      // const hashedPassword = await bcrypt.hash(password, key);
      // console.log(hashedPassword)
      const payload = {
        username: username,
        password: password,
      };

      const response = await fetch(
        'https://cataloggeneratorv1.azurewebsites.net/api/Authenticator',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.powerbi_link);
        console.log('success');
        navigate('/dashboard', { state: { powerbiLink: data.powerbi_link, username: username } }); // Navigate to the dashboard page
      } else {
        console.error('Error occurred during login:', response.status);
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type='text' value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type='password' value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
