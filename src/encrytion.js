import crypto from "crypto";
const secret = "testtesttesttesttesttesttesttest";

const encrypt = (password) => {
    return crypto.AES.encrypt(password, secret).toString();
};

const decrypt = (encryption) => {
   let bytes = crypto.AES.decrypt(encryption, secret);
   let originalText = bytes.toString(crypto.enc.Utf8);

   return originalText;
};

export {encrypt, decrypt};


import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import {encrypt} from './encrytion';

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
    let hashedPassword = encrypt(password);
    console.log(hashedPassword)
    try {
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
