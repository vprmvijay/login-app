//import bcrypt from 'bcryptjs';
import skey from '../appy.json';

const handleLogin = async (username, password) => {
  try {
    const key = skey.key; // Your desired secret key

    //const hashedPassword = await bcrypt.hash(password, key);
    //console.log(hashedPassword);

    const payload = {
      username: username,
      password: password,
    };

    const response = await fetch(
      'https://cataloggeneratorv1.azurewebsites.net/api/Authenticator',
      {
        method: 'POST', // Set the method to 'POST'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log('success');
      return data.powerbi_link;
    } else {
      console.error('Error occurred during login:', response.status);
    }
  } catch (error) {
    console.error('Error occurred during login:', error);
  }
};

export default handleLogin;
